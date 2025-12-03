import style from '../../styles/style.scss';
import {h, Component, VNode,  createRef, RefObject} from 'preact';
import {toHHMMSS} from '../../utils';
import {connect} from 'react-redux';

const COMPONENT_NAME = 'TimeDisplay';

const mapStateToProps = state => ({
  timeStyleState: state.shell.timeStyleState
});

/**
 * TimeDisplay component
 *
 * @class TimeDisplay
 * @example <TimeDisplay
 *  currentTime={this.props.player.currentTime}
 *  duration={this.props.player.duration}
 *  format='currentTime / duration'
 * />
 * @extends {Component}
 */
@connect(mapStateToProps)
class TimeDisplay extends Component<any, any> {
  private timeDisplayRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

  componentDidUpdate(prevProps: any) {
    if (prevProps.timeStyleState !== this.props.timeStyleState) {
      if (this.props.timeStyleState){
          this.timeDisplayRef.current?.classList.add(`${style.paddingStyle}`);
      } else {
        this.timeDisplayRef.current?.classList.remove(`${style.paddingStyle}`);
      }
    }
}
  /**
   * get formatted time display based on defined format
   *
   * @method getTimeDisplay
   * @param {number} currentTime current time
   * @param {number} duration duration
   * @param {string} [format] string that can use one or more of: 'current' / 'total' / 'left' and will be replaced with the relevant value
   * @returns {string} formatted time display
   * @memberof TimeDisplay
   */
  getTimeDisplay(currentTime: number, duration: number, format?: string): string {
    let result = format ? format : 'current / total',
      current = toHHMMSS(currentTime),
      total = toHHMMSS(duration),
      left = toHHMMSS(duration - currentTime);

    result = result.replace(/current/g, current);
    result = result.replace(/total/g, total);
    result = result.replace(/left/g, left);

    return result;
  }

  /**
   * render component
   *
   * @method render
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof TimeDisplay
   */
  render({currentTime, duration, format = 'current / total'}: any): VNode<any> {
    return (
      <div ref={this.timeDisplayRef} className={style.timeDisplay}>
        <span>{this.getTimeDisplay(currentTime, duration, format)}</span>
      </div>
    );
  }
}

TimeDisplay.displayName = COMPONENT_NAME;
export {TimeDisplay};
