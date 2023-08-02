//@flow
import {h, Fragment, Component} from 'preact';
import style from '../../styles/style.scss';
import {connect} from 'react-redux';
import {withPlayer} from '../player';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  dataLoaded: state.engine.dataLoaded,
  currentTime: state.seekbar.currentTime,
  duration: state.engine.duration,
  isMobile: state.shell.isMobile,
  adBreak: state.engine.adBreak
});

/**
 * ProgressBar component
 *
 * @class ProgressIndicator
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
class ProgressIndicator extends Component {
  /**
   * get current buffered percent from the player
   *
   * @returns {number} - current buffered percent
   * @memberof ProgressIndicator
   */
  getBufferedPercent(): number {
    const {player} = this.props;
    if (this.props.duration > 0 && player.buffered.length > 0) {
      const buffered = player.isLive() ? player.buffered.end(0) - player.getStartTimeOfDvrWindow() : player.buffered.end(0);
      const bufferedPercent = (buffered / this.props.duration) * 100;
      return bufferedPercent < 100 ? bufferedPercent : 100;
    }
    return 0;
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof ProgressIndicator
   */
  render(props: any): React$Element<any> {
    const bufferedWidth = `${Math.round(this.getBufferedPercent())}%`;
    const progressWidth = `${props.player.isLive() && props.player.isOnLiveEdge() ? 100 : (props.currentTime / props.duration) * 100}%`;
    return (
      <Fragment>
        <div className={style.buffered} style={{width: bufferedWidth}} />
        {props.dataLoaded ? <div className={style.progress} style={{width: progressWidth}} /> : undefined}
      </Fragment>
    );
  }
}

ProgressIndicator.displayName = 'ProgressIndicator';
export {ProgressIndicator};
