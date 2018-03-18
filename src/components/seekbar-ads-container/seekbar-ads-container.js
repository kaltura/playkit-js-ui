//@flow
import {h} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/seekbar';
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
   * @example <SeekBarAdsContainer player={this.player} />
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
   * @returns {React$Element} - component element
   * @memberof SeekBarAdsContainer
   */
  render(props: any): React$Element<any> {
    return (
      <SeekBarControl
        player={this.props.player}
        playerElement={this.props.playerContainer}
        changeCurrentTime={time => {  // eslint-disable-line no-unused-vars
        }}
        updateSeekbarDraggingStatus={data => { // eslint-disable-line no-unused-vars
        }}
        updateCurrentTime={data => { // eslint-disable-line no-unused-vars
        }}
        updateSeekbarHoverActive={data => this.props.updateSeekbarHoverActive(data)}
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
