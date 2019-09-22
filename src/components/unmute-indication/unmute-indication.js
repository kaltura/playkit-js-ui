//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {Localizer, Text} from 'preact-i18n';
import {withPlayer} from '../player';

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
  fallbackToMutedAutoPlay: state.engine.fallbackToMutedAutoPlay
});

const COMPONENT_NAME = 'UnmuteIndication';

@connect(
  mapStateToProps,
  null
)
@withPlayer
/**
 * UnmuteIndication component
 *
 * @class UnmuteIndication
 * @example <UnmuteIndication />
 * @extends {BaseComponent}
 */
class UnmuteIndication extends BaseComponent {
  /**
   * Creates an instance of UnmuteIndication.
   * @memberof UnmuteIndication
   */
  constructor() {
    super({name: COMPONENT_NAME});
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
      this.eventManager.listenOnce(this.props.player, this.props.player.Event.PLAYING, () => this._iconOnlyTimeout());
      this.eventManager.listenOnce(this.props.player, this.props.player.Event.AD_STARTED, () => this._iconOnlyTimeout());
    }
  }

  /**
   * The icon only timeout handler
   * @private
   * @memberof UnmuteIndication
   * @returns {void}
   */
  _iconOnlyTimeout(): void {
    setTimeout(() => {
      this.setState({iconOnly: true});
    }, MUTED_AUTOPLAY_ICON_ONLY_DEFAULT_TIMEOUT);
  }

  /**
   * @param {KeyboardEvent} e - the keyDown Event
   * @private
   * @memberof UnmuteIndication
   * @returns {void}
   */
  _keyDownHandler(e: KeyboardEvent): void {
    if (e.keyCode === KeyMap.ENTER) {
      this.props.player.muted = !this.props.player.muted;
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} component element
   * @memberof UnmuteIndication
   */
  render(props: any): ?React$Element<any> {
    if (!this.props.fallbackToMutedAutoPlay) return undefined;

    const styleClass = [style.unmuteButtonContainer];
    if (props.hasTopBar) styleClass.push(style.hasTopBar);
    if (this.state.iconOnly) styleClass.push(style.showIconOnly);

    return (
      <Localizer>
        <div
          tabIndex="0"
          aria-label={<Text id="controls.unmute" />}
          className={styleClass.join(' ')}
          onMouseOver={() => this.setState({iconOnly: false})}
          onMouseOut={() => this.setState({iconOnly: true})}
          onClick={() => (this.props.player.muted = !this.props.player.muted)}
          onTouchEnd={e => e.stopImmediatePropagation()}
          onKeyDown={e => this._keyDownHandler(e)}>
          <a className={[style.btn, style.btnDarkTransparent, style.unmuteButton].join(' ')}>
            <div className={style.unmuteIconContainer}>
              <Icon type={IconType.VolumeBase} />
              <Icon type={IconType.VolumeMute} />
            </div>
            <span>
              <Text id={'unmute.unmute'} />
            </span>
          </a>
        </div>
      </Localizer>
    );
  }
}

UnmuteIndication.displayName = COMPONENT_NAME;
export {UnmuteIndication};
