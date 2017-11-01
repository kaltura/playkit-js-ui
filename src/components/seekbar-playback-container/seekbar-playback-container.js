//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/seekbar';
import BaseComponent from '../base';
import SeekBarControl from '../seekbar';

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

@connect(mapStateToProps, bindActions(actions))
/**
 * SeekBarPlaybackContainer component
 *
 * @class SeekBarPlaybackContainer
 * @example <SeekBarPlaybackContainer player={this.player} />
 * @extends {BaseComponent}
 */
class SeekBarPlaybackContainer extends BaseComponent {

  /**
   * Creates an instance of SeekBarPlaybackContainer.
   * @param {Object} obj obj
   * @memberof SeekBarPlaybackContainer
   */
  constructor(obj: Object) {
    super({name: 'SeekBarPlaybackContainer', player: obj.player, config: obj.config});
  }

  /**
   * after component mounted, listen to time update event and if dragging not active,
   * update the current time in the store
   *
   * @returns {void}
   * @memberof SeekBarPlaybackContainer
   */
  componentDidMount() {
    this.player.addEventListener(this.player.Event.TIME_UPDATE, () => {
      if (!this.props.isDraggingActive) {
        this.props.updateCurrentTime(this.player.currentTime);
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
      <SeekBarControl
        playerElement={document.getElementById(this.props.playerTargetId)}
        showFramePreview={this.props.showFramePreview}
        showTimeBubble={this.props.showTimeBubble}
        changeCurrentTime={time => this.player.currentTime = time}
        playerPoster={this.props.poster}
        updateSeekbarDraggingStatus={data => this.props.updateSeekbarDraggingStatus(data)}
        updateCurrentTime={data => this.props.updateCurrentTime(data)}

        currentTime={this.props.currentTime}
        duration={this.props.duration}
        isDraggingActive={this.props.isDraggingActive}
        isMobile={this.props.isMobile}
        thumbsSprite={this.config.thumbsSprite}
        thumbsSlices={this.config.thumbsSlices}
        thumbsWidth={this.config.thumbsWidth}
      />
    )
  }

}
export default SeekBarPlaybackContainer;
