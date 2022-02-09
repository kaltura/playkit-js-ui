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
  isDraggingActive: state.seekbar.draggingActive,
  isMobile: state.shell.isMobile,
  poster: state.engine.poster,
  isDvr: state.engine.isDvr,
  dataLoaded: state.engine.dataLoaded
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
    const {eventManager, player, isDraggingActive, updateCurrentTime} = this.props;
    eventManager.listen(player, player.Event.TIME_UPDATE, () => {
      if (!isDraggingActive) {
        updateCurrentTime(Math.max(player.normalizedCurrentTime, 0));
      }
    });
    eventManager.listen(player, player.Event.LOADED_DATA, () => {
      updateCurrentTime(Math.max(player.normalizedCurrentTime, 0));
    });
  }

  /**
   *
   * @returns {number} - the currentTime of the video to show
   * @memberof SeekBarLivePlaybackContainer
   */
  get currentTime(): number {
    return Math.min(this.props.currentTime, this.duration);
  }

  /**
   *
   * @returns {number} - the duration of the video to show
   * @memberof SeekBarLivePlaybackContainer
   */
  get duration(): number {
    return this.props.player.normalizedDuration;
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SeekBarLivePlaybackContainer
   */
  render(props: any) {
    if (!props.isDvr || !props.dataLoaded) {
      return undefined;
    }
    return (
      <SeekBar
        playerElement={this.props.playerContainer}
        showFramePreview={this.props.showFramePreview}
        showTimeBubble={this.props.showTimeBubble}
        changeCurrentTime={time => {
          // avoiding exiting live edge by mistake in case currentTime is just a bit smaller than duration
          if (!(this.props.player.isOnLiveEdge() && time === this.duration)) {
            this.props.player.normalizedCurrentTime = time;
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
        duration={this.duration}
        isDraggingActive={this.props.isDraggingActive}
        isMobile={this.props.isMobile}
        notifyChange={payload => this.props.notifyChange(payload)}
        forceFullProgress={this.props.player.isOnLiveEdge()}
      />
    );
  }
}

SeekBarLivePlaybackContainer.displayName = COMPONENT_NAME;
export {SeekBarLivePlaybackContainer};
