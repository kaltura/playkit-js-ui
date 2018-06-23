//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {EventManager} from '../../event/event-manager';
import {UIEventManager} from '../../event/event-manager';

/**
 * The icon only default timeout
 * @type {number}
 * @const
 */
export const MUTED_AUTOPLAY_ICON_ONLY_DEFAULT_TIMEOUT = 3000;

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  fallbackToMutedAutoPlay: state.engine.fallbackToMutedAutoPlay,
  isPlaying: state.engine.isPlaying,
  adBreak: state.engine.adBreak,
  adIsPlaying: state.engine.adIsPlaying
});


@connect(mapStateToProps, null)
  /**
   * UnmuteIndication component
   *
   * @class UnmuteIndication
   * @example <UnmuteIndication player={this.player} />
   * @extends {BaseComponent}
   */
class UnmuteIndication extends BaseComponent {
  _eventManager: EventManager;
  /**
   * The icon only timeout bounded method reference
   * @private
   * @memberof UnmuteIndication
   * @type {Function}
   */
  _iconOnlyTimeoutCallback: Function;

  /**
   * Creates an instance of UnmuteIndication.
   * @param {Object} obj obj
   * @memberof UnmuteIndication
   */
  constructor(obj: Object) {
    super({name: 'UnmuteIndication', player: obj.player});
    this._eventManager = UIEventManager.getInstance();
    this._iconOnlyTimeoutCallback = this._iconOnlyTimeout.bind(this);
  }

  /**
   * check if currently playing ad or playback
   *
   * @returns {boolean} - if currently playing ad or playback
   * @memberof UnmuteIndication
   */
  isPlayingAdOrPlayback(): boolean {
    return (this.props.adBreak && this.props.adIsPlaying) || (!this.props.adBreak && this.props.isPlaying);
  }

  /**
   * after component updated, check the fallbackToMutedAutoPlay prop for updating the state of the component
   *
   * @param {Object} prevProps - previous component props
   * @method componentDidUpdate
   * @returns {void}
   * @memberof UnmuteIndication
   */
  componentDidUpdate(prevProps: Object): void {
    if (!prevProps.fallbackToMutedAutoPlay && this.props.fallbackToMutedAutoPlay) {
      this._eventManager.listen(this.player, this.player.Event.PLAYING, this._iconOnlyTimeoutCallback);
      this._eventManager.listen(this.player, this.player.Event.AD_STARTED, this._iconOnlyTimeoutCallback);
    }
  }

  /**
   * The icon only timeout handler
   * @private
   * @memberof UnmuteIndication
   * @returns {void}
   */
  _iconOnlyTimeout(): void {
    this.player.removeEventListener(this.player.Event.PLAYING, this._iconOnlyTimeoutCallback);
    this.player.removeEventListener(this.player.Event.AD_STARTED, this._iconOnlyTimeoutCallback);
    setTimeout(() => {
      this.setState({iconOnly: true});
    }, MUTED_AUTOPLAY_ICON_ONLY_DEFAULT_TIMEOUT);
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} component element
   * @memberof UnmuteIndication
   */
  render(props: any): ?React$Element<any> {
    if (!this.props.fallbackToMutedAutoPlay || !this.isPlayingAdOrPlayback()) return undefined;

    const styleClass = [style.unmuteButtonContainer];
    if (props.hasTopBar) styleClass.push(style.hasTopBar);
    if (this.state.iconOnly) styleClass.push(style.showIconOnly);

    return (
      <div
        className={styleClass.join(' ')}
        onMouseOver={() => this.setState({iconOnly: false})}
        onMouseOut={() => this.setState({iconOnly: true})}
        onClick={() => this.player.muted = !this.player.muted}>
        <a className={[style.btn, style.btnDarkTransparent, style.unmuteButton].join(' ')}>
          <div className={style.unmuteIconContainer}>
            <Icon type={IconType.VolumeBase}/>
            <Icon type={IconType.VolumeMute}/>
          </div>
          <span>Unmute</span>
        </a>
      </div>
    );
  }
}

export {UnmuteIndication};
