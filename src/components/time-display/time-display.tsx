import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {toHHMMSS} from '../../utils';

const COMPONENT_NAME = 'TimeDisplay';

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
class TimeDisplay extends Component<any, any> {
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
      <div className={style.timeDisplay}>
        <span>{this.getTimeDisplay(currentTime, duration, format)}</span>
      </div>
    );
  }
}

TimeDisplay.displayName = COMPONENT_NAME;
export {TimeDisplay};
