//@flow
import style from '../../styles/style.scss';
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/volume';
import BaseComponent from '../base';
import { default as Icon, IconType } from '../icon';

@connect(null, bindActions(actions))
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

      setTimeout(() => {
        this.setState({iconOnly: true});
      }, 3000);
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

    var styleClass = [style.unmuteButtonContainer];
    if (props.hasTopBar) styleClass.push(style.hasTopBar);
    if (this.state.iconOnly) styleClass.push(style.showIconOnly);

    return (
      <div
        className={styleClass.join(' ')}
        onMouseOver={() => this.setState({iconOnly: false})}
        onMouseOut={() => this.setState({iconOnly: true})}
        onClick={() => this.player.muted = !this.player.muted}
      >
        <a
          className={[style.btn, style.btnDarkTransparent, style.unmuteButton].join(' ')}
        >
          <div className={style.unmuteIconContainer}>
            <Icon type={IconType.VolumeBase} />
            <Icon type={IconType.VolumeMute} />
          </div>
          <span>Unmute</span>
        </a>
      </div>
    );
  }
}

export default UnmuteIndication;
