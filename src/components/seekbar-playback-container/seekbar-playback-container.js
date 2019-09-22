//@flow
import {h} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/seekbar';
import BaseComponent from '../base';
import {SeekBar} from '../seekbar';
import {withPlayer} from '../player';

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
  poster: state.engine.poster
});

const COMPONENT_NAME = 'SeekBarPlaybackContainer';

@connect(
  mapStateToProps,
  bindActions(actions)
)
@withPlayer
/**
 * SeekBarPlaybackContainer component
 *
 * @class SeekBarPlaybackContainer
 * @example <SeekBarPlaybackContainer />
 * @extends {BaseComponent}
 */
class SeekBarPlaybackContainer extends BaseComponent {
  /**
   * Creates an instance of SeekBarPlaybackContainer.
   * @memberof SeekBarPlaybackContainer
   */
  constructor() {
    super({name: COMPONENT_NAME});
  }

  /**
   * after component mounted, listen to time update event and if dragging not active,
   * update the current time in the store
   *
   * @returns {void}
   * @memberof SeekBarPlaybackContainer
   */
  componentDidMount() {
    this.eventManager.listen(this.props.player, this.props.player.Event.TIME_UPDATE, () => {
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
        updateCurrentTime={data => this.props.updateCurrentTime(data)}
        currentTime={this.props.currentTime}
        duration={this.props.duration}
        isDraggingActive={this.props.isDraggingActive}
        isMobile={this.props.isMobile}
        notifyChange={payload => this.notifyChange(payload)}
      />
    );
  }
}

SeekBarPlaybackContainer.displayName = COMPONENT_NAME;
export {SeekBarPlaybackContainer};
