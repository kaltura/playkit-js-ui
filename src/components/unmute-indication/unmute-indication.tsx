import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils';
import {Localizer, Text, withText} from 'preact-i18n';
import {withPlayer} from '../player';
import {withEventManager} from '../../event';
import {withLogger} from '../logger';
import {Button} from '../button';

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

/**
 * translates
 * @returns {Object} - The object translations
 */
const translates = {
  unmuteAriaLabel: <Text id={'controls.unmute'}>Unmute</Text>,
  unmuteButtonText: <Text id={'unmute.unmute'}>Unmute</Text>
};

/**
 * UnmuteIndication component
 *
 * @class UnmuteIndication
 * @example <UnmuteIndication />
 * @extends {Component}
 */
@connect(mapStateToProps, null)
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
@withText(translates)
class UnmuteIndication extends Component<any, any> {
  _iconTimeout: number | null = null;

  /**
   * after component updated, check the fallbackToMutedAutoPlay prop for updating the state of the component
   *
   * @param {Object} prevProps - previous component props
   * @method componentDidUpdate
   * @returns {void}
   * @memberof UnmuteIndication
   */
  componentDidUpdate(prevProps: any): void {
    if (!prevProps.fallbackToMutedAutoPlay && this.props.fallbackToMutedAutoPlay) {
      this.props.eventManager.listenOnce(this.props.player, this.props.player.Event.PLAYING, () => this._iconOnlyTimeout());
      this.props.eventManager.listenOnce(this.props.player, this.props.player.Event.AD_STARTED, () => this._iconOnlyTimeout());
    }
  }

  /**
   * after component unmount, clear timeouts
   *
   * @returns {void}
   * @memberof UnmuteIndication
   */
  componentWillUnmount(): void {
    if (this._iconTimeout) {
      clearTimeout(this._iconTimeout);
      this._iconTimeout = null;
    }
  }

  /**
   * The icon only timeout handler
   * @private
   * @memberof UnmuteIndication
   * @returns {void}
   */
  _iconOnlyTimeout(): void {
    // @ts-expect-error - Type 'Timeout' is not assignable to type 'number'.
    this._iconTimeout = setTimeout(() => {
      this.setState({iconOnly: true});
    }, MUTED_AUTOPLAY_ICON_ONLY_DEFAULT_TIMEOUT);
  }

  /**
   * @param {KeyboardEvent} e - the keyDown Event
   * @private
   * @memberof UnmuteIndication
   * @returns {void}
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER) {
      this.props.player.muted = !this.props.player.muted;
    }
  };
  /**
   * @private
   * @memberof UnmuteIndication
   * @returns {void}
   */
  onMouseOver = () => this.setState({iconOnly: false});
  /**
   * @private
   * @memberof UnmuteIndication
   * @returns {void}
   */
  onMouseOut = () => this.setState({iconOnly: true});
  /**
   * @private
   * @memberof UnmuteIndication
   * @returns {void}
   */
  onMouseUp = () => (this.props.player.muted = !this.props.player.muted);
  /**
   * @param {Event} e - the touch end event
   * @private
   * @memberof UnmuteIndication
   * @returns {void}
   */
  onTouchEnd = (e: Event) => e.stopImmediatePropagation();

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} component element
   * @memberof UnmuteIndication
   */
  render(props: any): VNode<any> | undefined {
    if (!this.props.fallbackToMutedAutoPlay) return undefined;

    const styleClass = [style.unmuteButtonContainer];
    if (props.hasTopBar) styleClass.push(style.hasTopBar);
    if (this.state.iconOnly) styleClass.push(style.showIconOnly);

    return (
      <Localizer>
        <div className={styleClass.join(' ')}>
          <Button
            className={[style.btn, style.btnDarkTransparent, style.unmuteButton, style.btnTranslucent].join(' ')}
            tabIndex={0}
            aria-label={props.unmuteAriaLabel}
            onMouseOver={this.onMouseOver}
            onMouseOut={this.onMouseOut}
            onMouseUp={this.onMouseUp}
            onTouchEnd={this.onTouchEnd}
            onKeyDown={this.onKeyDown}>
            <div className={style.unmuteIconContainer}>
              <Icon type={IconType.VolumeBase} />
              <Icon type={IconType.VolumeMute} />
            </div>
            <span>{props.unmuteButtonText}</span>
          </Button>
        </div>
      </Localizer>
    );
  }
}

UnmuteIndication.displayName = COMPONENT_NAME;
export {UnmuteIndication};
