//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/loading';
import BaseComponent from '../base';

const mapStateToProps = state => ({
  show: state.loading.show,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
class Loading extends BaseComponent {
  autoplay: boolean;
  mobileAutoplay: boolean;

  constructor(obj: Object) {
    super({name: 'Loading', player: obj.player});
  }

  componentWillMount() {
    try { this.autoplay = this.player.config.playback.autoplay; }
    catch (e) { this.autoplay = false; } // eslint-disable-line no-unused-vars

    try { this.mobileAutoplay = this.player.config.playback.mobileAutoplay; }
    catch (e) { this.mobileAutoplay = false; } // eslint-disable-line no-unused-vars
  }

  componentDidMount() {
    if (!this.props.isMobile && this.autoplay || this.props.isMobile && this.mobileAutoplay) {
      this.props.updateLoadingSpinnerState(true);
    }

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
