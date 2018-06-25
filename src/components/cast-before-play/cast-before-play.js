//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {IconType} from '../icon/index';
import {actions} from '../../reducers/backdrop';
import {Icon} from '../icon/icon';
import {EventManager} from '../../event/event-manager';
import {UIEventManager} from '../../event/event-manager';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  prePlayback: state.shell.prePlayback,
  loading: state.loading.show,
  isCastAvailable: state.engine.isCastAvailable
});

@connect(mapStateToProps, actions)
  /**
   * CastOverlay component
   *
   * @class CastBeforePlay
   * @example <CastBeforePlay player={this.player} />
   * @extends {BaseComponent}
   */
class CastBeforePlay extends BaseComponent {
  _eventManager: EventManager;

  /**
   * @static
   * @type {Object} - Component default props
   */
  static defaultProps: Object = {
    icon: IconType.Chromecast
  };

  /**
   * Creates an instance of CastOverlay.
   * @param {Object} obj obj
   * @memberof CastBeforePlay
   */
  constructor(obj: Object) {
    super({name: 'CastBeforePlay', player: obj.player});
    this._eventManager = UIEventManager.getInstance();
  }

  /**
   * on click we're calling the start casting API and setting connecting state.
   *
   * @returns {void}
   * @memberof CastBeforePlay
   */
  onClick(): void {
    this.props.updateBackdropVisibility(true);
    this.player.startCasting()
      .catch(() => this.props.updateBackdropVisibility(false));
  }

  /**
   * after component did mount, show the cast before play button.
   *
   * @returns {void}
   * @memberof CastBeforePlay
   */
  componentDidMount(): void {
    setTimeout(() => {
      this.setState({show: true})
    }, 700)
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof CastBeforePlay
   */
  render(props: any): ?React$Element<any> {
    if (!props.isCastAvailable || !props.prePlayback || props.loading) return undefined;
    const rootStyle = [style.castBeforePlayButtonContainer];
    if (this.state.show) {
      rootStyle.push(style.showCastBeforePlay);
    }
    return (
      <div>
        <div
          className={rootStyle.join(' ')}
          onClick={() => this.onClick()}>
          <a className={[style.btn, style.btnDarkTransparent, style.castBeforePlayButton].join(' ')}>
            <div className={style.castBeforePlayIconContainer}>
              <Icon type={props.icon}/>
            </div>
            <span>Play on TV</span>
          </a>
        </div>
      </div>
    )
  }
}

export {CastBeforePlay};
