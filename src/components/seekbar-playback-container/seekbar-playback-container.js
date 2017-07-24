//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/seekbar';
import BaseComponent from '../base';
import { toHHMMSS } from '../../utils/time-format';
import SeekBarControl from '../seekbar';

const mapStateToProps = state => ({
  currentTime: state.engine.currentTime,
  duration: state.engine.duration,
  isDraggingActive: state.seekbar.draggingActive,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
class SeekBarPlaybackContainer extends BaseComponent {

  constructor(obj: Object) {
    super({name: 'SeekBarPlaybackContainer', player: obj.player});
  }

  render(props: any) {
    return (
      <SeekBarControl
        showFramePreview={this.props.showFramePreview}
        showTimeBubble={this.props.showTimeBubble}
        changeCurrentTime={time => this.player.currentTime = time}
        updateSeekbarDraggingStatus={data => this.props.updateSeekbarDraggingStatus(data)}
        updateCurrentTime={data => this.props.updateCurrentTime(data)}

        currentTime={this.props.currentTime}
        duration={this.props.duration}
        isDraggingActive={this.props.isDraggingActive}
        isMobile={this.props.isMobile}
      />
    )
  }

}
export default SeekBarPlaybackContainer;
