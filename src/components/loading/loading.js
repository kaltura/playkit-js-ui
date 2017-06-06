//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import reduce from '../../reducers/loading';
import actions from '../../reducers/loading';
import store from '../../store';
import BaseComponent from '../base';

@connect(reduce, bindActions(actions))
class LoadingSpinner extends BaseComponent {
  constructor(obj: IControlParams) {
    super({name: 'Loading', player: obj.player});
  }

  render() {
    return (
      <div className={this.state.show ? 'loading-backdrop show' : 'loading-backdrop'}>
        <div className='spinner-container'>
          <div className='spinner'>
            {[...Array(8)].map(() => <span />)}
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({show: store.getState().loading.show});
    })

    this.player.addEventListener(this.player.Event.LOADED_METADATA, () => {
      this.props.addPlayerClass('metadata-loaded');
    });

    this.player.addEventListener(this.player.Event.PLAYER_STATE_CHANGED, e => {
      if (e.payload.newState.type === 'idle' || e.payload.newState.type === 'playing' || e.payload.newState.type === 'paused') {
        this.props.updateLoadingSpinnerState(false);
      }
      else {
        this.props.updateLoadingSpinnerState(true);
      }
    });
  }

}

export default LoadingSpinner;
