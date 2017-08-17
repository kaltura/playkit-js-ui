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
  currentTime: state.engine.adProgress.currentTime,
  duration: state.engine.adProgress.duration,
  isDraggingActive: state.seekbar.draggingActive,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
/**
 * SeekBarAdsContainer component
 *
 * @class SeekBarAdsContainer
 * @extends {BaseComponent}
 */
class SeekBarAdsContainer extends BaseComponent {

  /**
   * Creates an instance of SeekBarAdsContainer.
   * @param {Object} obj - obj
   * @memberof SeekBarAdsContainer
   */
  constructor(obj: Object) {
    super({name: 'SeekBarAdsContainer', player: obj.player});
  }

  /**
   * render compoent
   *
   * @param {*} props - component props
   * @returns {Element} - component element
   * @memberof SeekBarAdsContainer
   */
  render(props: any): Element {
    return (
      <SeekBarControl
        playerElement={this.player.getView().parentElement}
        changeCurrentTime={time => {}} // eslint-disable-line no-unused-vars
        updateSeekbarDraggingStatus={data => {}} // eslint-disable-line no-unused-vars
        updateCurrentTime={data => {}} // eslint-disable-line no-unused-vars

        adBreak={props.adBreak}
        currentTime={props.currentTime}
        duration={props.duration}
        isDraggingActive={props.isDraggingActive}
        isMobile={props.isMobile}
      />
    )
  }

}
export default SeekBarAdsContainer;
