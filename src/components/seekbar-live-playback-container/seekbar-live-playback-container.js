//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
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
  duration: state.engine.duration,
  isDraggingActive: state.seekbar.draggingActive,
  isMobile: state.shell.isMobile,
  poster: state.engine.poster,
  isDvr: state.engine.isDvr
});

const COMPONENT_NAME = 'SeekBarLivePlaybackContainer';

@connect(
  mapStateToProps,
  bindActions(actions)
)
@withPlayer
@withEventManager
@withEventDispatcher(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
/**
 * SeekBarLivePlaybackContainer component
 *
 * @class SeekBarLivePlaybackContainer
 * @example <SeekBarLivePlaybackContainer />
 * @extends {Component}
 */
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
        this.props.updateCurrentTime(this.props.player.currentTime);
      }
    });
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
        showTimeBubble={this.props.showTimeBubble}
        changeCurrentTime={time => {
          if (!this.props.player.isOnLiveEdge() || time < this.duration) {
            this.props.player.currentTime = time;
          }
        }}
        playerPoster={this.props.poster}
        updateSeekbarDraggingStatus={data => this.props.updateSeekbarDraggingStatus(data)}
        updateSeekbarHoverActive={data => this.props.updateSeekbarHoverActive(data)}
        updateCurrentTime={data => this.props.updateCurrentTime(data)}
        isDvr={this.props.isDvr}
        currentTime={this.props.currentTime}
        duration={this.duration}
        isDraggingActive={this.props.isDraggingActive}
        isMobile={this.props.isMobile}
        notifyChange={payload => this.props.notifyChange(payload)}
      />
    );
  }

  /**
   *
   * @returns {number} - the duration of the video to show
   * @memberof SeekBarLivePlaybackContainer
   */
  get duration(): number {
    return this.props.player.isOnLiveEdge() ? this.props.currentTime : Math.max(this.props.duration, this.props.currentTime);
  }
}

SeekBarLivePlaybackContainer.displayName = COMPONENT_NAME;
export {SeekBarLivePlaybackContainer};
