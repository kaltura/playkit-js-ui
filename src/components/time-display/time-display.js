//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import BaseComponent from '../base';
import { toHHMMSS } from '../../utils/time-format';

const mapStateToProps = state => ({
  currentTime: state.engine.currentTime,
  duration: state.engine.duration
});

@connect(mapStateToProps)
class TimeDisplay extends BaseComponent {
  constructor(obj: Object) {
    super({name: 'TimeDisplay', player: obj.player, config: obj.config});
  }

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
