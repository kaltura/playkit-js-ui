//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {connect} from 'react-redux';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';
import {bindActions} from '../../utils/bind-actions';
import {actions} from 'reducers/playlist';
import {withEventManager} from 'event/with-event-manager';

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
  isPlaybackEnded: state.engine.isPlaybackEnded,
  countdownCanceled: state.playlist.countdownCanceled
});

const COMPONENT_NAME = 'PlaylistCountdown';

@connect(
  mapStateToProps,
  bindActions(actions)
)
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
/**
 * PlaylistCountdown component
 *
 * @class PlaylistCountdown
 * @example <PlaylistCountdown type="next"/>
 * @extends {Component}
 */
class PlaylistCountdown extends Component {
  focusElement: HTMLElement;
  nextShown: any;

  /**
   * constructor
   * @param {*} props props
   * @param {*} context context
   * @return {void}
   */
  constructor(props: Object) {
    super(props);
    this.setState({focusable: false});
  }

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
    this.props.updatePlaylistCountdownCanceled(true);
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
  componentWillUpdate(nextProps: Object) {
    const timeToShow = this._getTimeToShow();
    if (nextProps.currentTime >= timeToShow) {
      this.setState({timeToShow: true});
    } else {
      this.setState({timeToShow: false});
      this.props.updatePlaylistCountdownCanceled(false);
    }
  }

  /**
   * checks if the component is hidden
   * @returns {boolean} - is component hidden
   */
  get isHidden(): boolean {
    return !this.state.timeToShow || this.props.player.playlist.countdown.duration >= this.props.duration;
  }

  /**
   * checks if the component is canceled
   * @returns {boolean} - is component canceled
   */
  get isCanceled(): boolean {
    return this.props.countdownCanceled;
  }

  /**
   * checks if the component is shown
   * @returns {boolean} - is component shown
   */
  get isShown(): boolean {
    return !this.isHidden && !this.isCanceled;
  }
  /**
   * component did update handler
   *
   * @param {Object} prevProps - previous component props
   * @param {Object} prevState - previous component state
   * @returns {void}
   */
  componentDidUpdate(prevProps: Object, prevState: Object): void {
    if (this._shouldRender(prevProps)) {
      const timeToShow = this._getTimeToShow();
      const countdown = this.props.player.playlist.countdown;
      if (
        !prevProps.isSeeking &&
        !this.props.countdownCanceled &&
        (this.props.isPlaybackEnded || (this.props.currentTime >= timeToShow + countdown.duration && this.props.currentTime < this.props.duration))
      ) {
        this.props.player.playlist.playNext();
      }
    }

    if (!prevState.shown && this.state.shown) {
      if (this.focusElement) {
        this.props.eventManager.listenOnce(this.focusElement, 'animationend', () => {
          if (this.isShown) {
            this.focusElement.focus();
            this.setState({focusable: true});
          }
        });
      }
    } else if (prevState.shown && !this.state.shown) {
      this.setState({focusable: false});
    }

    if (this.isShown !== this.state.shown) this.setState({shown: this.isShown});
  }

  /**
   * should component update handler
   *
   * @param {Object} nextProps - the props that will replace the current props
   * @returns {boolean} shouldComponentUpdate
   */
  shouldComponentUpdate(nextProps: Object): boolean {
    return this.props.duration > 0 && !nextProps.isSeeking && !this.props.isPlaybackEnded;
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
    this.isShown && (this.nextShown = props.playlist.next);
    if (!(props.playlist.next && props.playlist.next.sources && this.nextShown)) {
      return undefined;
    }

    const countdown = this.props.player.playlist.countdown;
    const timeToShow = this._getTimeToShow();
    const progressTime = props.currentTime - timeToShow;
    const progressDuration = Math.min(countdown.duration, props.duration - timeToShow);
    const progressWidth = `${progressTime > 0 ? (progressTime / progressDuration) * 104 : 0}%`;
    const className = [style.playlistCountdown];

    if (this.isHidden) {
      className.push(style.hidden);
    } else if (this.isCanceled) {
      className.push(style.canceled);
    } else {
      className.push(style.slideIn);
    }

    return (
      <div
        role="button"
        aria-labelledby="playlistCountdownTextId"
        ref={el => (this.focusElement = el)}
        tabIndex={this.state.focusable ? 0 : -1}
        className={className.join(' ')}
        onKeyDown={e => {
          switch (e.keyCode) {
            case KeyMap.ENTER:
              this.onClick();
              break;
            case KeyMap.ESC:
              this.cancelNext(e);
              break;
          }
        }}
        onClick={() => this.onClick()}>
        <div className={style.playlistCountdownPoster} style={`background-image: url(${this.nextShown.sources.poster});`} />
        <div className={style.playlistCountdownContentPlaceholder}>
          <div className={style.playlistCountdownContentBackground}>
            <div className={style.playlistCountdownContent}>
              <Localizer>
                <div id="playlistCountdownTextId" className={style.playlistCountdownText}>
                  <div className={style.playlistCountdownTextTitle}>
                    <Text id="playlist.up_next" />
                  </div>
                  <div className={style.playlistCountdownTextName}>{`${
                    this.nextShown.sources.metadata ? this.nextShown.sources.metadata.name : ''
                  }`}</div>
                </div>
              </Localizer>
              <div className={[style.controlButtonContainer, style.playlistCountdownCancel].join(' ')}>
                <Localizer>
                  <button
                    tabIndex={this.state.focusable ? 0 : -1}
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
