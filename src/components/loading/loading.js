//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/loading';
import BaseComponent from '../base';

const mapStateToProps = state => ({
  show: state.loading.show
});

@connect(mapStateToProps, bindActions(actions))
class Loading extends BaseComponent {
  constructor(obj: Object) {
    super({name: 'Loading', player: obj.player});
  }

  componentDidMount() {
    this.player.addEventListener(this.player.Event.PLAYER_STATE_CHANGED, e => {
      if (e.payload.newState.type === 'idle' || e.payload.newState.type === 'playing' || e.payload.newState.type === 'paused') {
        this.props.updateLoadingSpinnerState(false);
      }
      else {
        this.props.updateLoadingSpinnerState(true);
      }
    });
  }

  render(props: any) {
    if (!props.show) return undefined;

    return (
      <div className='loading-backdrop show'>
        <div className='spinner-container'>
          <div className='spinner'>
            {[...Array(8)].map((i) => <span key={i} />)}
          </div>
        </div>
      </div>
    )
  }

}

export default Loading;
