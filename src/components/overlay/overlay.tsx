/* eslint-disable @typescript-eslint/no-unused-vars */
import {h, Component, VNode} from 'preact';
import style from '../../styles/style.scss';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions as overlayActions} from '../../reducers/overlay';
import {actions as shellActions} from '../../reducers/shell';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils';
import {withPlayer} from '../player';
import {getOverlayPortalElement} from '../overlay-portal';

const COMPONENT_NAME = 'Overlay';

interface OverlayProps {
  type?: string;
  open?: boolean;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  onClose?: (e?: KeyboardEvent, byKeyboard?: true) => void;
  handleKeyDown?: (e: KeyboardEvent) => void;
  addPlayerClass?: (className: string) => void;
  removePlayerClass?: (className: string) => void;
  updateOverlay?: (isOpen: boolean) => void;
  overlayOpen?: boolean;
  dontCheckOverlayPortal?: boolean;
  permanent?: boolean;
  player?: any;
  addAccessibleChild?: (el: HTMLElement) => void;
  pauseOnOpen?: boolean;
  closeAriaLabel?: string;
}

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  overlayOpen: state.overlay.isOpen
});

/**
 * Overlay component
 * @class Overlay
 * @example <Overlay
 *  type='share'
 *  onClose={() => this.closeShareOverlay()}
 * >
 *  ...
 * </Overlay>
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...shellActions, ...overlayActions}))
@withPlayer
class Overlay extends Component<OverlayProps, any> {
  private _timeoutId: NodeJS.Timeout | null = null;
  private _wasPlayed = false; // keep state of the player so we can resume if needed
  static defaultProps = {closeAriaLabel: (<Text id="overlay.close" />) as unknown as string};

  /**
   * componentWillMount
   *
   * @returns {void}
   * @memberof Overlay
   */
  /* eslint-disable @typescript-eslint/explicit-member-accessibility */
  componentDidMount(): void {
    this._timeoutId = setTimeout(() => this.props.addPlayerClass!(style.overlayActive), 0);
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   * @memberof Overlay
   */
  /* eslint-disable @typescript-eslint/explicit-member-accessibility */
  componentWillUnmount(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
    if (this.props.dontCheckOverlayPortal) {
      this.props.removePlayerClass!(style.overlayActive);
    } else {
      // Remove the overlay-active class only when overlay portal has a single child
      const overlayPortalEl = getOverlayPortalElement(this.props.player);
      if (overlayPortalEl!.childElementCount <= 1) {
        this.props.removePlayerClass!(style.overlayActive);
      }
    }
    if (this.props.overlayOpen && this._wasPlayed) {
      this._wasPlayed = false;
      this.props.player.play();
    }
  }

  componentDidUpdate(previousProps: Readonly<OverlayProps>): void {
    const {player, pauseOnOpen} = this.props;
    if (this.props.overlayOpen && !previousProps.overlayOpen) {
      if (pauseOnOpen && !player.paused) {
        this._wasPlayed = true;
        player.pause();
      }
    }
  }

  /**
   * on close button key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof Overlay
   */
  private onCloseButtonKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER || e.keyCode === KeyMap.SPACE) {
      e.preventDefault();
      this.props.onClose?.(e, true);
    }
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof Overlay
   */
  private onKeyDown = (e: KeyboardEvent): void => {
    if (this.props.handleKeyDown) {
      this.props.handleKeyDown(e);
    }
  };

  /**
   * closeButton
   * @param {any} props - props
   * @returns {React$Element | void} close button element
   * @memberof Overlay
   */
  private renderCloseButton(props: any): VNode<any> | undefined {
    if (!props.permanent) {
      return (
        <Localizer>
          <a
            role="button"
            ref={el => {
              if (props.addAccessibleChild) {
                props.addAccessibleChild(el);
              }
            }}
            tabIndex={0}
            onClick={() => {
              props.updateOverlay(false);
              props.onClose();
            }}
            onKeyDown={this.onCloseButtonKeyDown}
            aria-label={props.closeAriaLabel}
            className={style.closeOverlay}>
            <Icon type={IconType.Close} />
          </a>
        </Localizer>
      );
    } else {
      return undefined;
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof Overlay
   */
  render({type, open, ariaLabel, ariaLabelledBy}: any): VNode<any> {
    const role = type === 'error' ? 'alert' : 'dialog';
    const ariaLive = type === 'error' ? 'polite' : undefined;
    const ariaProps = ariaLabelledBy ? { 'aria-labelledby': ariaLabelledBy, 'aria-live': ariaLive } : { 'aria-label': ariaLabel, 'aria-live': ariaLive }
    const overlayClass = [style.overlay];
    if (type) {
      const classType = style[type + '-overlay'] ? style[type + '-overlay'] : type + '-overlay';
      overlayClass.push(classType);
    }

    if (open) {
      this.props.updateOverlay!(open);
      overlayClass.push(style.active);
    }

    return (
      <div tabIndex={-1} className={overlayClass.join(' ')} role={role} onKeyDown={this.onKeyDown} {...ariaProps}>
        <div className={style.overlayContents}>{this.props.children}</div>
        {this.renderCloseButton(this.props)}
      </div>
    );
  }
}

Overlay.displayName = COMPONENT_NAME;
export {Overlay};
