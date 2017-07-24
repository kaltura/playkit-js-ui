//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/seekbar';
import BaseComponent from '../base';
import { toHHMMSS } from '../../utils/time-format';
import SeekBarControl from '../seekbar';

const mapStateToProps = state => ({
  currentTime: state.engine.adProgress.currentTime,
  duration: state.engine.adProgress.duration,
  isDraggingActive: state.seekbar.draggingActive,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
class SeekBarAdsContainer extends BaseComponent {

  constructor(obj: Object) {
    super({name: 'SeekBarAdsContainer', player: obj.player});
  }

  render(props: any) {
    return (
      <SeekBarControl
        changeCurrentTime={time => {}}
        updateSeekbarDraggingStatus={data => {}}
        updateCurrentTime={data => {}}

        currentTime={this.props.currentTime}
        duration={this.props.duration}
        isDraggingActive={this.props.isDraggingActive}
        isMobile={this.props.isMobile}
      />
    )
  }

}
export default SeekBarAdsContainer;
