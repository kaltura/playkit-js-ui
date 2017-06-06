//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import store from '../../store';
import { toHHMMSS } from '../../utils/time-format';

class TimeDisplayControl extends BaseComponent {
  constructor(obj: IControlParams) {
    super({name: 'TimeDisplay', player: obj.player, config: obj.config});
  }

  render() {
    return (
      <div className='time-display'>
        <span className='time-current'>{ this.state.currentTime }</span>
        <span className='time-separator'> / </span>
        <span className='time-duration'>{ this.state.duration }</span>
      </div>
    )
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({currentTime: toHHMMSS(store.getState().engine.currentTime)});
      this.setState({duration: toHHMMSS(store.getState().engine.duration)});
    })
  }
}

export default TimeDisplayControl;
