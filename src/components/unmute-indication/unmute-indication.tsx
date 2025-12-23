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
  fallbackToMutedAutoPlay: state.engine.fallbackToMutedAutoPlay,
  unmuteTextSeconds: state.config.components.unmuteIndication.unmuteTextSeconds,
  unmuteButtonSeconds: state.config.components.unmuteIndication.unmuteButtonSeconds,
  showUnmuteIndicationButton: state.config.buttons.showUnmuteIndicationButton
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
  _removeButtonTimeout: number | null = null;
  _iconOnlySeconds: number = MUTED_AUTOPLAY_ICON_ONLY_DEFAULT_TIMEOUT;
  _buttonRemoveSeconds: number = 0;

  constructor(props: any) {
    super(props);
    this._setValidSeconds();
  }

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
      this.props.eventManager.listenOnce(this.props.player, this.props.player.Event.PLAYING, () => this._setElementsTimeout());
      this.props.eventManager.listenOnce(this.props.player, this.props.player.Event.AD_STARTED, () => this._setElementsTimeout());
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
    if (this._removeButtonTimeout) {
      clearTimeout(this._removeButtonTimeout);
      this._removeButtonTimeout = null;
    }
  }

  /**
   * Set only valid seconds for timeouts
   * @private
   * @memberof UnmuteIndication
   * @returns {void}
   */
    _setValidSeconds(): void {
    const isValid = (value: any): boolean => {
      return (typeof value === 'number' && value >= 0);
    }
    if (isValid(this.props.unmuteTextSeconds)) {
        this._iconOnlySeconds = this.props.unmuteTextSeconds * 1000;
    }
    if (isValid(this.props.unmuteButtonSeconds)) {
        this._buttonRemoveSeconds = this.props.unmuteButtonSeconds * 1000;
    }
  }

  /**
   * The icon and text timeout handler
   * @private
   * @memberof UnmuteIndication
   * @returns {void}
   */
  _setElementsTimeout(): void {
    if (this._iconOnlySeconds !== 0){
      this._iconTimeout = setTimeout(() => {
        this.setState({iconOnly: true});
      }, this._iconOnlySeconds ) as unknown as number;
    } 

    if (this._buttonRemoveSeconds !== 0){
      this._removeButtonTimeout = setTimeout(() => {
        this.setState({removeButton: true});
      }, this._buttonRemoveSeconds ) as unknown as number;
    }
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
    if (!this.props.fallbackToMutedAutoPlay || this.state.removeButton || !this.props.showUnmuteIndicationButton) return undefined;

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
