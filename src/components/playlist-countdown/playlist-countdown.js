//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {connect} from 'preact-redux';

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
  isEnded: state.engine.isEnded
});

@connect(mapStateToProps)
/**
 * PlaylistCountdown component
 *
 * @class PlaylistCountdown
 * @example <PlaylistCountdown player={this.player} type="next"/>
 * @extends {BaseComponent}
 */
class PlaylistCountdown extends BaseComponent {
  /**
   * Creates an instance of PlaylistCountdown.
   * @param {Object} obj obj
   * @memberof PlaylistCountdown
   */
  constructor(obj: Object) {
    super({name: 'PlaylistCountdown', player: obj.player});
  }

  /**
   * playlist countdown click handler
   *
   * @returns {void}
   * @memberof PlaylistCountdown
   */
  onClick(): void {
    this.player.playlist.playNext();
  }

  /**
   * playlist countdown click handler
   *
   * @param {MouseEvent} e - click event
   * @returns {void}
   * @memberof PlaylistCountdown
   */
  cancelNext(e: any): void {
    this.logger.debug('Cancel auto play next item');
    e.stopPropagation();
    this.setState({canceled: true});
  }

  /**
   * @returns {number} - time to show the countdown
   * @private
   */
  _getTimeToShow() {
    const countdown = this.player.playlist.countdown;
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
    const countdown = this.player.playlist.countdown;
    if (
      !this.state.canceled &&
      (this.props.isEnded ||
        this.props.currentTime >= timeToShow + countdown.duration ||
        (this.props.duration && this.props.currentTime >= this.props.duration))
    ) {
      this.player.playlist.playNext();
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlaylistCountdown
   */
  render(props: any): React$Element<any> | void {
    const countdown = this.player.playlist.countdown;
    const timeToShow = this._getTimeToShow();
    const progressTime = props.currentTime - timeToShow;
    const progressDuration = Math.min(countdown.duration, props.duration - timeToShow);
    const progressWidth = `${progressTime > 0 ? (progressTime / progressDuration) * 100 : 0}%`;

    return (
      <div
        className={this.state.timeToShow && !this.state.canceled ? [style.playlistCountdown] : [style.playlistCountdown, style.hidden].join(' ')}
        onClick={() => this.onClick()}>
        <div className={style.playlistCountdownPoster} style={`background-image: url(${props.playlist.next.sources.poster});`} />
        <div className={style.playlistCountdownContent}>
          <Localizer>
            <div className={style.playlistCountdownText}>
              <div className={style.playlistCountdownTextTitle}>
                <Text id="playlist.next" />
              </div>
              <div className={style.playlistCountdownTextName}>{`${props.playlist.next.sources.metadata.name}`}</div>
            </div>
          </Localizer>
          <div className={[style.controlButtonContainer, style.playlistCountdownCancel].join(' ')}>
            <Localizer>
              <button
                tabIndex="0"
                aria-label={<Text id="playlist.cancel" />}
                className={[style.controlButton, style.playlistCountdownCancelButton].join(' ')}
                onClick={e => this.cancelNext(e)}
                onKeyDown={e => {
                  if (e.keyCode === KeyMap.ENTER) {
                    this.cancelNext();
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
    );
  }
}

export {PlaylistCountdown};
