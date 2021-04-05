//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/seekbar';
import {SeekBar} from '../seekbar';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {withLogger} from 'components/logger';
import {withEventDispatcher} from 'components/event-dispatcher';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  currentTime: state.seekbar.currentTime,
  virtualTime: state.seekbar.virtualTime,
  duration: state.engine.duration,
  isDraggingActive: state.seekbar.draggingActive,
  isMobile: state.shell.isMobile,
  poster: state.engine.poster,
  isDvr: state.engine.isDvr
});

const COMPONENT_NAME = 'SeekBarLivePlaybackContainer';

/**
 * SeekBarLivePlaybackContainer component
 *
 * @class SeekBarLivePlaybackContainer
 * @example <SeekBarLivePlaybackContainer />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withEventManager
@withEventDispatcher(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
class SeekBarLivePlaybackContainer extends Component {
  /**
   * after component mounted, listen to time update event and if dragging not active,
   * update the current time in the store
   *
   * @returns {void}
   * @memberof SeekBarLivePlaybackContainer
   */
  componentDidMount() {
    this.props.eventManager.listen(this.props.player, this.props.player.Event.TIME_UPDATE, () => {
      if (!this.props.isDraggingActive) {
        this.props.updateCurrentTime(this.props.player.liveTime);
      }
    });
  }

  /**
   *
   * @returns {number} - the currentTime of the video to show
   * @memberof SeekBarLivePlaybackContainer
   */
  get currentTime(): number {
    return Math.min(this.props.currentTime, this.props.duration);
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SeekBarLivePlaybackContainer
   */
  render(props: any) {
    if (!props.isDvr) {
      return undefined;
    }
    return (
      <SeekBar
        playerElement={this.props.playerContainer}
        showFramePreview={this.props.showFramePreview}
        showTimeBubble={this.props.showTimeBubble}
        changeCurrentTime={time => {
          // avoiding exiting live edge by mistake in case currentTime is just a bit smaller than duration
          if (!(this.props.player.isOnLiveEdge() && time === this.props.duration)) {
            this.props.player.liveTime = time;
          }
        }}
        playerPoster={this.props.poster}
        updateSeekbarDraggingStatus={data => this.props.updateSeekbarDraggingStatus(data)}
        updateSeekbarHoverActive={data => this.props.updateSeekbarHoverActive(data)}
        updateSeekbarClientRect={data => this.props.updateSeekbarClientRect(data)}
        updateCurrentTime={data => this.props.updateCurrentTime(data)}
        updateVirtualTime={data => this.props.updateVirtualTime(data)}
        isDvr={this.props.isDvr}
        currentTime={this.currentTime}
        virtualTime={this.props.virtualTime}
        duration={this.props.duration}
        isDraggingActive={this.props.isDraggingActive}
        isMobile={this.props.isMobile}
        notifyChange={payload => this.props.notifyChange(payload)}
      />
    );
  }
}

SeekBarLivePlaybackContainer.displayName = COMPONENT_NAME;
export {SeekBarLivePlaybackContainer};
