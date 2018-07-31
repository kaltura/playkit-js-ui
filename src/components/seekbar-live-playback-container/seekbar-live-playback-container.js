//@flow
import {h} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/seekbar';
import BaseComponent from '../base';
import {SeekBarControl} from '../seekbar';

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

@connect(mapStateToProps, bindActions(actions))
  /**
   * SeekBarLivePlaybackContainer component
   *
   * @class SeekBarLivePlaybackContainer
   * @example <SeekBarLivePlaybackContainer player={this.player} />
   * @extends {BaseComponent}
   */
class SeekBarLivePlaybackContainer extends BaseComponent {

  /**
   * Creates an instance of SeekBarLivePlaybackContainer.
   * @param {Object} obj obj
   * @memberof SeekBarLivePlaybackContainer
   */
  constructor(obj: Object) {
    super({name: 'SeekBarLivePlaybackContainer', player: obj.player});
  }

  /**
   * after component mounted, listen to time update event and if dragging not active,
   * update the current time in the store
   *
   * @returns {void}
   * @memberof SeekBarLivePlaybackContainer
   */
  componentDidMount() {
    this.eventManager.listen(this.player, this.player.Event.TIME_UPDATE, () => {
      if (!this.props.isDraggingActive) {
        this.props.updateCurrentTime(this.player.currentTime);
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
      <SeekBarControl
        player={this.props.player}
        playerElement={this.props.playerContainer}
        showTimeBubble={this.props.showTimeBubble}
        changeCurrentTime={time => this.player.currentTime = time}
        playerPoster={this.props.poster}
        updateSeekbarDraggingStatus={data => this.props.updateSeekbarDraggingStatus(data)}
        updateSeekbarHoverActive={data => this.props.updateSeekbarHoverActive(data)}
        updateCurrentTime={data => this.props.updateCurrentTime(data)}
        isDvr={this.props.isDvr}
        currentTime={this.props.currentTime}
        duration={this.props.duration}
        isDraggingActive={this.props.isDraggingActive}
        isMobile={this.props.isMobile}
        notifyChange={payload => this.notifyChange(payload)}
      />
    );
  }

}

export {SeekBarLivePlaybackContainer};
