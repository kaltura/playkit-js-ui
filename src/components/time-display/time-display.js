//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import BaseComponent from '../base';
import { toHHMMSS } from '../../utils/time-format';

function mapStateToProps(state) {
  return {
    currentTime: state.seekbar.currentTime,
    duration: state.engine.duration
  };
}

@connect(mapStateToProps)
class TimeDisplayControl extends BaseComponent {
  constructor(obj: IControlParams) {
    super({name: 'TimeDisplay', player: obj.player, config: obj.config});
  }

  render() {
    return (
      <div className='time-display'>
        <span className='time-current'>{ toHHMMSS(this.props.currentTime) }</span>
        <span className='time-separator'> / </span>
        <span className='time-duration'>{ toHHMMSS(this.props.duration) }</span>
      </div>
    )
  }
}

export default TimeDisplayControl;
