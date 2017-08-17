//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/loading';
import BaseComponent from '../base';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  show: state.loading.show,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
/**
 * Loading component
 *
 * @class Loading
 * @extends {BaseComponent}
 */
class Loading extends BaseComponent {
  autoplay: boolean;
  mobileAutoplay: boolean;

  /**
   * Creates an instance of Loading.
   * @param {Object} obj obj
   * @memberof Loading
   */
  constructor(obj: Object) {
    super({name: 'Loading', player: obj.player});
  }

  /**
   * before component mount, update the autoplay and mobileAutoplay values from player config
   *
   * @returns {void}
   * @memberof Loading
   */
  componentWillMount() {
    try { this.autoplay = this.player.config.playback.autoplay; }
    catch (e) { this.autoplay = false; } // eslint-disable-line no-unused-vars

    try { this.mobileAutoplay = this.player.config.playback.mobileAutoplay; }
    catch (e) { this.mobileAutoplay = false; } // eslint-disable-line no-unused-vars
  }

  /**
   * after component mounted, set event listener to player state change and update the state of loading spinner accordingly.
   * initially, if not mobile and autoplay is on, show the loading spinner without dependency on the player state.
   * if is mobile and mobile autoplay is on, show the loading spinner without dependency on the player state.
   *
   * @returns {void}
   * @memberof Loading
   */
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

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {Element} - component element
   * @memberof Loading
   */
  render(props: any): Element {
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
