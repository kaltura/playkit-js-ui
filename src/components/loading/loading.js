//@flow
import style from './_loading.scss';
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
  isPreloading: boolean;
  autoplay: boolean;
  mobileAutoplay: boolean;
  /**
   * Creates an instance of Loading.
   * @param {Object} obj obj
   * @memberof Loading
   */
  constructor(obj: Object) {
    super({name: 'Loading', player: obj.player});
    this.setState({afterFirstPlay: false});
    try {
      // TODO: Change the dependency on ima to our ads plugin when it will be developed.
      if (this.player.config.playback.preload === "auto" && !this.player.config.plugins.ima) {
        this.isPreloading = true;
        this.player.addEventListener(this.player.Event.PLAYER_STATE_CHANGED, (e) => {
          if (e.payload.oldState.type === this.player.State.LOADING) {
            this.isPreloading = false;
          }
        });
      }
    } catch (e) {
      this.logger.error(e.message);
      this.isPreloading = false;
    }
  }

  /**
   * before component mount, update the autoplay and mobileAutoplay values from player config
   *
   * @returns {void}
   * @memberof Loading
   */
  componentWillMount() {
    try {
      this.autoplay = this.player.config.playback.autoplay;
    }
    catch (e) { // eslint-disable-line no-unused-vars
      this.autoplay = false;
    }

    try {
      this.mobileAutoplay = this.player.config.playback.mobileAutoplay;
    }
    catch (e) { // eslint-disable-line no-unused-vars
      this.mobileAutoplay = false;
    }
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
      if (!this.state.afterFirstPlay){
        return;
      }
      if (e.payload.newState.type === 'idle' || e.payload.newState.type === 'playing' || e.payload.newState.type === 'paused') {
        this.props.updateLoadingSpinnerState(false);
      }
      else {
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

    this.player.addEventListener(this.player.Event.FIRST_PLAY, () => {
      this.setState({afterFirstPlay: true});
    });

    this.player.addEventListener(this.player.Event.CHANGE_SOURCE_STARTED, () => {
      this.setState({afterFirstPlay: false});
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
    if (!props.show || this.isPreloading) return undefined;

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
