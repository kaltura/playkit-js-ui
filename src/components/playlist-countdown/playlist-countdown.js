//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';
import {bindActions} from '../../utils/bind-actions';
import {actions} from 'reducers/playlist';
import {PlaylistCountdownPopup} from 'components/playlist-countdown/playlist-countdown-popup';

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
@withLogger(COMPONENT_NAME)
/**
 * PlaylistCountdown component
 *
 * @class PlaylistCountdown
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
   * component did update handler
   *
   * @param {Object} prevProps - previous component props
   * @returns {void}
   */
  componentDidUpdate(prevProps: Object): void {
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

    const countdown = this.props.player.playlist.countdown;
    const timeToShow = this._getTimeToShow();
    const progressTime = props.currentTime - timeToShow;
    const progressDuration = Math.min(countdown.duration, props.duration - timeToShow);
    const progressWidth = `${progressTime > 0 ? (progressTime / progressDuration) * 104 : 0}%`;
    const isHidden = !this.state.timeToShow || countdown.duration >= props.duration;
    const isCanceled = this.props.countdownCanceled;

    return isHidden || isCanceled ? (
      undefined
    ) : (
      <PlaylistCountdownPopup
        progressWidth={progressWidth}
        next={props.playlist.next}
        onClick={() => {
          this.onClick();
        }}
        cancelNext={e => {
          this.cancelNext(e);
        }}
      />
    );
  }
}

PlaylistCountdown.displayName = COMPONENT_NAME;
export {PlaylistCountdown};
