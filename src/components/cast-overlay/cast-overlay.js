//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {IconType} from '../icon/index';
import {Icon} from '../icon/icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  poster: state.engine.poster,
  castSession: state.engine.castSession
});

@connect(
  mapStateToProps,
  null
)
/**
 * CastOverlay component
 *
 * @class CastOverlay
 * @example <CastOverlay player={this.player} />
 * @extends {BaseComponent}
 */
class CastOverlay extends BaseComponent {
  /**
   * @static
   * @type {Object} - Component default props
   */
  static defaultProps: any = {
    icon: IconType.Cast
  };

  /**
   * Creates an instance of CastOverlay.
   * @param {Object} obj obj
   * @memberof CastOverlay
   */
  constructor(obj: Object) {
    super({name: 'CastOverlay', player: obj.player});
    this.setState({connecting: true});
  }

  /**
   * when component mounted, attach the relevant listeners.
   * @memberof CastOverlay
   * @returns {void}
   */
  componentWillMount(): void {
    this.eventManager.listen(this.player, this.player.Event.PLAYBACK_STARTED, () =>
      this.setState({
        playing: true,
        connected: false,
        connecting: false
      })
    );
    this.eventManager.listen(this.player, this.player.Event.ENDED, () =>
      this.setState({
        playing: false,
        connected: true,
        connecting: false
      })
    );
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof CastOverlay
   */
  render(props: any): ?React$Element<any> {
    if (!props.castSession) return undefined;

    let status;
    if (this.state.playing) {
      status = 'Playing on';
    } else if (this.state.connected) {
      status = 'Connected to';
    } else if (this.state.connecting) {
      status = 'Connecting to';
    }

    let posterStyle = {};
    const posterClasses = [style.castPoster];
    if (props.poster) {
      posterStyle = {backgroundImage: `url(${props.poster})`};
      posterClasses.push(style.hasPoster);
    }

    return (
      <div>
        <div className={style.castOverlay}>
          <div className={posterClasses.join(' ')} style={posterStyle} onMouseOver={e => e.stopPropagation()} />
          <div className={style.castBlackCover} />
        </div>
        <div className={style.castBox}>
          <div className={style.castIcon}>{this.state.connecting ? <div className={style.castConnectingSpinner} /> : <Icon type={props.icon} />}</div>
          <div className={style.castText}>
            <span className={style.castPlayingOn}>{status}</span>
            <br />
            <span className={style.castDevice}>{props.castSession.deviceFriendlyName}</span>
          </div>
        </div>
      </div>
    );
  }
}

export {CastOverlay};
