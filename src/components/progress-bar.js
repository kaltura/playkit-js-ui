//@flow
import {h, Fragment, Component} from 'preact';
import style from '../styles/style.scss';
import {connect} from 'react-redux';
import {withPlayer} from './player';

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
 * @class ProgressBar
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
class ProgressBar extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof ProgressBar
   */
  render(props: any): React$Element<any> {
    const bufferedWidth = `${Math.round(props.getBufferedPercent())}%`;
    const progressWidth = `${props.player.isLive() && props.player.isOnLiveEdge() ? 100 : (props.currentTime / props.duration) * 100}%`;
    return (
      <Fragment>
        <div className={style.buffered} style={{width: bufferedWidth}} />
        {props.dataLoaded ? <div className={style.progress} style={{width: progressWidth}} /> : undefined}
      </Fragment>
    );
  }
}

ProgressBar.displayName = 'ProgressBar';
export {ProgressBar};
