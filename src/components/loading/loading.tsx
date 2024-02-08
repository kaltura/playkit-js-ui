import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/loading';
import {withPlayer} from '../player';
import {withEventManager} from '../../event';
import {withLogger, WithLoggerProps} from '../logger';
import {PlayerArea} from '../../components/player-area';
import {Spinner} from '../../components/spinner';
import {ReservedPresetAreas} from '../../reducers/shell';
import {WithPlayerProps} from '../player/with-player';
import {WithEventManagerProps} from '../../event/with-event-manager';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  show: state.loading.show,
  isMobile: state.shell.isMobile,
  adBreak: state.engine.adBreak,
  adIsLinear: state.engine.adIsLinear
});

const COMPONENT_NAME = 'Loading';

/**
 * Loading component
 *
 * @class Loading
 * @example <Loading />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
class Loading extends Component<any, any> {
  // class Loading extends Component<WithPlayerProps & WithEventManagerProps & WithLoggerProps, any> {
  /**
   * Creates an instance of Loading.
   * @memberof Loading
   */
  constructor() {
    super();
  }

  /**
   * after component mounted, set event listener to player state change and update the state of loading spinner accordingly.
   *
   * @returns {void}
   * @memberof Loading
   */
  componentDidMount() {
    const {player, eventManager} = this.props;
    eventManager.listen(player, player.Event.PLAYER_STATE_CHANGED, e => {
      const StateType = player.State;
      if (
        e.payload.newState.type === StateType.IDLE ||
        e.payload.newState.type === StateType.PLAYING ||
        e.payload.newState.type === StateType.PAUSED
      ) {
        this.props.updateLoadingSpinnerState(false);
      } else {
        this.props.updateLoadingSpinnerState(true);
      }
    });

    eventManager.listen(player, player.Event.AD_BREAK_START, () => {
      this.props.updateLoadingSpinnerState(true);
    });

    eventManager.listen(player, player.Event.AD_PROGRESS, () => {
      this.props.updateLoadingSpinnerState(false);
    });

    eventManager.listen(player, player.Event.AD_STARTED, () => {
      if (this.props.adIsLinear) {
        this.props.updateLoadingSpinnerState(false);
      }
    });

    eventManager.listen(player, player.Event.ALL_ADS_COMPLETED, () => {
      this.props.updateLoadingSpinnerState(false);
    });

    eventManager.listen(player, player.Event.AUTOPLAY_FAILED, () => {
      this.props.updateLoadingSpinnerState(false);
    });

    eventManager.listen(player, player.Event.PLAYING, () => {
      this.props.updateLoadingSpinnerState(false);
    });
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Loading
   */
  render(props: any): VNode | undefined {
    if (!props.show) return undefined;

    return (
      <div className={[style.loadingBackdrop, style.show].join(' ')}>
        <div className={style.spinnerContainer}>
          <PlayerArea name={ReservedPresetAreas.LoadingSpinner}>
            <Spinner />
          </PlayerArea>
        </div>
      </div>
    );
  }
}

Loading.displayName = COMPONENT_NAME;
export {Loading};
