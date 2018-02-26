//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/loading';
import BaseComponent from '../base';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  show: state.loading.show,
  isMobile: state.shell.isMobile,
  adBreak: state.engine.adBreak
});

@connect(mapStateToProps, bindActions(actions))
  /**
   * Loading component
   *
   * @class Loading
   * @example <Loading />
   * @extends {BaseComponent}
   */
class Loading extends BaseComponent {
  /**
   * Creates an instance of Loading.
   * @param {Object} obj obj
   * @memberof Loading
   */
  constructor(obj: Object) {
    super({name: 'Loading', player: obj.player});
    this.setState({afterPlayingEvent: false});
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
    this.player.addEventListener(this.player.Event.PLAYER_STATE_CHANGED, e => {
      const StateType = this.player.State;
      if (!this.state.afterPlayingEvent) {
        return;
      }
      if (e.payload.newState.type === StateType.IDLE
        || e.payload.newState.type === StateType.PLAYING
        || e.payload.newState.type === StateType.PAUSED) {
        this.props.updateLoadingSpinnerState(false);
      } else {
        this.props.updateLoadingSpinnerState(true);
      }
    });

    this.player.addEventListener(this.player.Event.SOURCE_SELECTED, () => {
      if (this.player.config.autoplay && !this.props.adBreak) {
        this.props.updateLoadingSpinnerState(true);
      }
    });

    this.player.addEventListener(this.player.Event.AD_BREAK_START, () => {
      this.props.updateLoadingSpinnerState(true);
    });

    this.player.addEventListener(this.player.Event.AD_LOADED, () => {
      this.props.updateLoadingSpinnerState(true);
    });

    this.player.addEventListener(this.player.Event.AD_STARTED, () => {
      this.props.updateLoadingSpinnerState(false);
    });

    this.player.addEventListener(this.player.Event.ALL_ADS_COMPLETED, () => {
      this.props.updateLoadingSpinnerState(false);
    });

    this.player.addEventListener(this.player.Event.AUTOPLAY_FAILED, () => {
      this.props.updateLoadingSpinnerState(false);
    });

    this.player.addEventListener(this.player.Event.PLAYING, () => {
      this.setState({afterPlayingEvent: true});
      this.props.updateLoadingSpinnerState(false);
    });

    this.player.addEventListener(this.player.Event.CHANGE_SOURCE_STARTED, () => {
      this.setState({afterPlayingEvent: false});
    });
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Loading
   */
  render(props: any): React$Element<any> | void {
    if (!props.show) return undefined;

    return (
      <div className={[style.loadingBackdrop, style.show].join(' ')}>
        <div className={style.spinnerContainer}>
          <div className={style.spinner}>
            {[...Array(8)].map((i) => <span key={i}/>)}
          </div>
        </div>
      </div>
    )
  }

}

export default Loading;
