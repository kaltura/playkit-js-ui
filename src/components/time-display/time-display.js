//@flow
import { h, Component } from 'preact';
import { toHHMMSS } from '../../utils/time-format';

/**
 * TimeDisplay component
 *
 * @class TimeDisplay
 * @extends {Component}
 */
class TimeDisplay extends Component {

  /**
   * get formatted time display based on defined format
   *
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
   * @param {*} props - component props
   * @returns {Element} - component
   * @memberof TimeDisplay
   */
  render(props: any): Element {
    return (
      <div className='time-display'>
        <span>{this.getTimeDisplay(props.currentTime, props.duration, props.format)}</span>
      </div>
    )
  }
}

export default TimeDisplay;
