//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {connect} from 'preact-redux';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playlist: state.engine.playlist,
  currentTime: state.engine.currentTime,
  duration: state.engine.duration,
  lastSeekPoint: state.engine.lastSeekPoint,
  isSeeking: state.engine.isSeeking,
  isPlaybackEnded: state.engine.isPlaybackEnded
});

const COMPONENT_NAME = 'PlaylistCountdown';

@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
/**
 * PlaylistCountdown component
 *
 * @class PlaylistCountdown
 * @example <PlaylistCountdown type="next"/>
 * @extends {Component}
 */
class PlaylistCountdown extends Component {
  /**
   * should render component
   * @param {*} props - component props
   * @returns {boolean} - component element
   */
  _shouldRender(props: any): boolean {
    return (
      props.playlist &&
      props.playlist.next &&
      props.playlist.next.sources &&
      props.player.playlist.countdown.showing &&
      (props.player.playlist.options.autoContinue || props.player.playlist.options.loop)
    );
  }

  /**
   * playlist countdown click handler
   *
   * @returns {void}
   * @memberof PlaylistCountdown
   */
  onClick(): void {
    this.props.player.playlist.playNext();
  }

  /**
   * playlist countdown click handler
   *
   * @param {MouseEvent} e - click event
   * @returns {void}
   * @memberof PlaylistCountdown
   */
  cancelNext(e: any): void {
    this.props.logger.debug('Cancel auto play next item');
    e.stopPropagation();
    this.setState({canceled: true});
  }

  /**
   * @returns {number} - time to show the countdown
   * @private
   */
  _getTimeToShow() {
    const countdown = this.props.player.playlist.countdown;
    let timeToShow = this.props.duration - countdown.duration;
    if (countdown.timeToShow >= 0 && countdown.timeToShow <= this.props.duration) {
      timeToShow = Math.max(countdown.timeToShow, this.props.lastSeekPoint);
    }
    return Math.max(0, Math.min(timeToShow, this.props.duration));
  }

  /**
   * component will update handler

   * @param {Object} nextProps - the props that will replace the current props
   * @returns {void}
   */
  componentDidMount() {
    this.setState({canceled: false});
  }

  /**
   * component will update handler

   * @param {Object} nextProps - the props that will replace the current props
   * @returns {void}
   */
  componentWillUpdate(nextProps: Object) {
    const timeToShow = this._getTimeToShow();
    if (nextProps.currentTime > timeToShow) {
      this.setState({timeToShow: true});
    } else {
      this.setState({timeToShow: false, canceled: false});
    }
  }

  /**
   * component did update handler

   * @returns {void}
   */
  componentDidUpdate() {
    const timeToShow = this._getTimeToShow();
    const countdown = this.props.player.playlist.countdown;
    if (
      !this.state.canceled &&
      (this.props.isPlaybackEnded || (this.props.currentTime >= timeToShow + countdown.duration && this.props.currentTime < this.props.duration))
    ) {
      this.props.player.playlist.playNext();
    }
  }

  /**
   * should component update handler
   *
   * @param {Object} nextProps - the props that will replace the current props
   * @returns {boolean} shouldComponentUpdate
   */
  shouldComponentUpdate(nextProps: Object): boolean {
    return !nextProps.isSeeking;
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlaylistCountdown
   */
  render(props: any): React$Element<any> | void {
    if (!this._shouldRender(props)) {
      return undefined;
    }
    const next = props.playlist.next;
    if (!(next && next.sources)) {
      return undefined;
    }
    const countdown = this.props.player.playlist.countdown;
    const timeToShow = this._getTimeToShow();
    const progressTime = props.currentTime - timeToShow;
    const progressDuration = Math.min(countdown.duration, props.duration - timeToShow);
    const progressWidth = `${progressTime > 0 ? (progressTime / progressDuration) * 104 : 0}%`;
    const className = [style.playlistCountdown];
    if (!this.state.timeToShow || countdown.duration >= props.duration) {
      className.push(style.hidden);
    } else if (this.state.canceled) {
      className.push(style.canceled);
    }

    return (
      <div
        tabIndex={this.state.timeToShow ? 0 : -1}
        className={className.join(' ')}
        onKeyDown={e => {
          if (e.keyCode === KeyMap.ENTER) {
            this.onClick();
          }
        }}
        onClick={() => this.onClick()}>
        <div className={style.playlistCountdownPoster} style={`background-image: url(${next.sources.poster});`} />
        <div className={style.playlistCountdownContentPlaceholder}>
          <div className={style.playlistCountdownContentBackground}>
            <div className={style.playlistCountdownContent}>
              <Localizer>
                <div className={style.playlistCountdownText}>
                  <div className={style.playlistCountdownTextTitle}>
                    <Text id="playlist.up_next" />
                  </div>
                  <div className={style.playlistCountdownTextName}>{`${next.sources.metadata ? next.sources.metadata.name : ''}`}</div>
                </div>
              </Localizer>
              <div className={[style.controlButtonContainer, style.playlistCountdownCancel].join(' ')}>
                <Localizer>
                  <button
                    tabIndex={this.state.timeToShow ? 0 : -1}
                    aria-label={<Text id="playlist.cancel" />}
                    className={[style.controlButton, style.playlistCountdownCancelButton].join(' ')}
                    onClick={e => this.cancelNext(e)}
                    onKeyDown={e => {
                      if (e.keyCode === KeyMap.ENTER) {
                        this.cancelNext(e);
                      }
                    }}>
                    <Icon type={IconType.Close} />
                  </button>
                </Localizer>
              </div>
              <div className={style.playlistCountdownIndicatorBar}>
                <div className={style.playlistCountdownIndicatorProgress} style={{width: progressWidth}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PlaylistCountdown.displayName = COMPONENT_NAME;
export {PlaylistCountdown};
