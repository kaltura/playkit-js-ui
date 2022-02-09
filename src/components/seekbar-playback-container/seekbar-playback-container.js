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
  dataLoaded: state.engine.dataLoaded
});

const COMPONENT_NAME = 'SeekBarPlaybackContainer';

/**
 * SeekBarPlaybackContainer component
 *
 * @class SeekBarPlaybackContainer
 * @example <SeekBarPlaybackContainer />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
class SeekBarPlaybackContainer extends Component {
  /**
   * after component mounted, listen to time update event and if dragging not active,
   * update the current time in the store
   *
   * @returns {void}
   * @memberof SeekBarPlaybackContainer
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
   * @returns {React$Element} - component element
   * @memberof SeekBarPlaybackContainer
   */
  render(): React$Element<any> {
    return (
      <SeekBar
        playerElement={this.props.playerContainer}
        showFramePreview={this.props.showFramePreview}
        showTimeBubble={this.props.showTimeBubble}
        changeCurrentTime={time => (this.props.player.currentTime = time)}
        playerPoster={this.props.poster}
        updateSeekbarDraggingStatus={data => this.props.updateSeekbarDraggingStatus(data)}
        updateSeekbarHoverActive={data => this.props.updateSeekbarHoverActive(data)}
        updateSeekbarClientRect={data => this.props.updateSeekbarClientRect(data)}
        updateCurrentTime={data => this.props.updateCurrentTime(data)}
        updateVirtualTime={data => this.props.updateVirtualTime(data)}
        currentTime={this.props.currentTime}
        virtualTime={this.props.virtualTime}
        duration={this.props.duration}
        isDraggingActive={this.props.isDraggingActive}
        isMobile={this.props.isMobile}
        notifyChange={payload => this.props.notifyChange(payload)}
        dataLoaded={this.props.dataLoaded}
      />
    );
  }
}

SeekBarPlaybackContainer.displayName = COMPONENT_NAME;
export {SeekBarPlaybackContainer};
