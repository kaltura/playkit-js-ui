//@flow
import { h, Component } from 'preact';
import { toHHMMSS } from '../../utils/time-format';

class TimeDisplay extends Component {

  getTimeDisplay(): string {
    var result = this.props.format ? this.props.format : 'current / total',
        current = toHHMMSS(this.props.currentTime),
        total = toHHMMSS(this.props.duration),
        left = toHHMMSS(this.props.duration - this.props.currentTime);

    result = result.replace(/current/g, current);
    result = result.replace(/total/g, total);
    result = result.replace(/left/g, left);

    return result;
  }

  render() {
    return (
      <div className='time-display'>
        <span>{this.getTimeDisplay()}</span>
      </div>
    )
  }
}

export default TimeDisplay;
