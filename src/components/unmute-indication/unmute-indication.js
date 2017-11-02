//@flow
import style from '../../styles/style.scss';
import { h } from 'preact';
import BaseComponent from '../base';
import { default as Icon, IconType } from '../icon';

/**
 * UnmuteIndication component
 *
 * @class UnmuteIndication
 * @example <UnmuteIndication player={this.player} />
 * @extends {BaseComponent}
 */
class UnmuteIndication extends BaseComponent {

  /**
   * Creates an instance of UnmuteIndication.
   * @param {Object} obj obj
   * @memberof UnmuteIndication
   */
  constructor(obj: Object) {
    super({name: 'UnmuteIndication', player: obj.player});
  }

  /**
   * after component mounted, listen to relevant player event for updating the state of the component
   *
   * @method componentDidMount
   * @returns {void}
   * @memberof UnmuteIndication
   */
  componentDidMount() {
    this.player.addEventListener(this.player.Event.MUTE_CHANGE, e => {
      this.props.updateMuted(e.payload.mute);

      // hide tooltip on user interaction
      if (!e.payload.mute && this.state.unmuteHint) {
        this.setState({unmuteHint: false});
      }
    });

    this.player.addEventListener(this.player.Event.FALLBACK_TO_MUTED_AUTOPLAY, () => {
      this.setState({unmuteHint: true});
    });
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} component element
   * @memberof UnmuteIndication
   */
  render(props: any): ?React$Element<any> {
    if (!this.state.unmuteHint) return undefined;

    var styleClass = [style.btn, style.btnDarkTransparent, style.unmuteButton];
    if (props.hasTopBar) styleClass.push(style.hasTopBar);

    return (
      <a
        className={styleClass.join(' ')}
        onClick={() => this.player.muted = !this.player.muted}>
        <div className={style.unmuteIconContainer}>
          <Icon type={IconType.VolumeBase} />
          <Icon type={IconType.VolumeMute} />
        </div>
        Unmute
      </a>
    );
  }
}

export default UnmuteIndication;
