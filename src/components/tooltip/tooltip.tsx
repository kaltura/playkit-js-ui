import style from '../../styles/style.scss';
import {h, Component, toChildArray, cloneElement, VNode} from 'preact';
import {connect} from 'react-redux';
import {withEventManager} from '../../event';
import {WithEventManagerProps} from '../../event/with-event-manager';
import {KeyMap} from '../../utils/key-map';
import {withKeyboardEvent} from '../../components/keyboard';
import {KeyboardEventHandlers} from '../../types';
import {WithKeyboardEventProps} from '../keyboard/with-keyboard-event';

interface ReduxStateProps {
  playerClientRect?: DOMRect;
  guiClientRect?: DOMRect;
  isMobile?: boolean;
}

type ToolTipPosition = 'top' | 'bottom' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'left' | 'right';

interface TooltipOwnProps {
  type?: ToolTipPosition;
  maxWidth?: string;
  label: string;
  strictPosition?: boolean;
  className?: string;
}

type TooltipProps = ReduxStateProps & TooltipOwnProps;

const PLAYER_MARGIN = 5;

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playerClientRect: state.shell.playerClientRect,
  guiClientRect: state.shell.guiClientRect,
  isMobile: state.shell.isMobile
});

const TOOLTIP_SHOW_TIMEOUT: number = 750;

// notice the order represents the order of the alternative fallback
const ToolTipType: {[type: string]: ToolTipPosition} = {
  Top: 'top',
  Bottom: 'bottom',
  TopRight: 'top-right',
  TopLeft: 'top-left',
  BottomRight: 'bottom-right',
  BottomLeft: 'bottom-left',
  Left: 'left',
  Right: 'right'
};

const COMPONENT_NAME = 'Tooltip';

/**
 * Tooltip component
 *
 * @class Tooltip
 * @example <Tooltip>...</Tooltip>
 * @extends {Component}
 */
@connect(mapStateToProps)
@withEventManager
@withKeyboardEvent(COMPONENT_NAME)
class Tooltip extends Component<TooltipProps & WithEventManagerProps & WithKeyboardEventProps, any> {
  _hoverTimeout: number | null = null;
  textElement!: HTMLSpanElement;
  tooltipElement!: HTMLDivElement;
  lastAlternativeTypeIndex: number = -1;
  _buttonRef: HTMLButtonElement | null = null;

  /**
   * default component props
   * @type {Object}
   * @memberof Tooltip
   */
  static defaultProps = {
    type: ToolTipType.Top,
    maxWidth: '240px',
    strictPosition: false
  };

  /**
   * clear hover timeout
   *
   * @returns {void}
   * @memberof Tooltip
   */
  _clearHoverTimeout(): void {
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = null;
    }
  }

  /**
   * displays tooltip.
   * @memberof Tooltip
   * @returns {void}
   */
  showTooltip = (): void => {
    this.setState({showTooltip: true});
  };

  /**
   * hide tooltip.
   * @memberof Tooltip
   * @returns {void}
   */
  hideTooltip = (): void => {
    this.setState({showTooltip: false});
  };

  /**
   * handle keyDown
   * @memberof Tooltip
   * @returns {void}
   */
  handleKeyDown = (event: KeyboardEvent): void => {
    if (event.keyCode === KeyMap.ESC) {
      this.hideTooltip();
    }
  };

  /**
   * set button ref
   * @memberof Tooltip
   * @returns {void}
   */
  setButtonRef = (element: HTMLButtonElement | null) => {
    this._buttonRef = element;
  };

  /**
   * handle focus on wrapped element
   * @memberof Tooltip
   * @returns {void}
   */
  handleFocusOnChildren = (): void => {
    const {onFocus} = (this.props.children as VNode<any>).props;
    this.showTooltip();
    if (onFocus) {
      onFocus();
    }
  };

  /**
   * handle blur on wrapped element
   * @memberof Tooltip
   * @returns {void}
   */
  handleBlurOnChildren = (): void => {
    const {onBlur} = (this.props.children as VNode<any>).props;
    this.hideTooltip();
    if (onBlur) {
      onBlur();
    }
  };

  /**
   * on mouse over handler.
   * @memberof Tooltip
   * @returns {void}
   */
  onMouseOver = (): void => {
    this._clearHoverTimeout();
    // @ts-ignore
    this._hoverTimeout = setTimeout(() => {
      this.showTooltip();
    }, TOOLTIP_SHOW_TIMEOUT);
  };

  /**
   * on mouse leave handler.
   * @memberof Tooltip
   * @returns {void}
   */
  onMouseLeave = (): void => {
    this.hideTooltip();
    this._clearHoverTimeout();
  };

  /**
   * brings another tooltip type which hasn't been marked as invalid
   * @memberof Tooltip
   * @returns {string} tooltip type
   */
  getAlternateType(): string | undefined {
    return Object.values<string>(ToolTipType).find((item, index) => {
      if (index > this.lastAlternativeTypeIndex && item != this.props.type) {
        this.lastAlternativeTypeIndex = index;
        return true;
      } else {
        return false;
      }
    });
  }

  /**
   * checks if the current tooltip type is within the player boundaries
   * @memberof Tooltip
   * @returns {string} is in boundaries
   */
  isToolTipInBoundaries(): boolean {
    if (this.props.strictPosition) {
      return true;
    }
    const tooltipBoundingRect = this.textElement.getBoundingClientRect();
    const playerContainerRect = this.props.playerClientRect;

    return (
      tooltipBoundingRect.top > playerContainerRect!.top + PLAYER_MARGIN &&
      tooltipBoundingRect.bottom < playerContainerRect!.bottom - PLAYER_MARGIN &&
      tooltipBoundingRect.right < playerContainerRect!.right - PLAYER_MARGIN &&
      tooltipBoundingRect.left > playerContainerRect!.left + PLAYER_MARGIN
    );
  }

  /**
   * sets the requested type prop of the tooltip as a state cause it can change if is not valid
   * @memberof Tooltip
   * @returns {void}
   */
  componentWillMount(): void {
    this.setState({valid: false, type: this.props.type});
  }

  /**
   * after component mounted, set event listener to click outside the component
   *
   * @returns {void}
   * @memberof Tooltip
   */
  componentDidMount() {
    const {eventManager} = this.props;
    eventManager!.listen(document, 'click', e => this.handleClickOutside(e));
    if (this._buttonRef?.addEventListener) {
      this._buttonRef.addEventListener('keydown', this.handleKeyDown);
    }
  }

  /**
   * event listener for clicking outside handler.
   *
   * @param {*} e - click event
   * @returns {void}
   * @memberof Tooltip
   */
  handleClickOutside(e: any) {
    if (!this.tooltipElement?.contains(e.target) && this.state.showTooltip) {
      this.hideTooltip();
    }
  }

  /**
   * checks if after the render the tooltip is within boundaries of the player
   * if not it will try to set a new type which will be checked after the next render
   * @param {Object} prevProps - previous component props
   * @memberof Tooltip
   * @returns {void}
   */
  componentDidUpdate(prevProps: any): void {
    if (this.props.guiClientRect !== prevProps.guiClientRect) {
      this.lastAlternativeTypeIndex = -1;
      this.setState({valid: false, type: this.props.type});
    } else if (this.state.showTooltip) {
      if (this.isToolTipInBoundaries()) {
        if (!this.state.valid) {
          this.setState({valid: true});
        }
      } else {
        const alternative = this.getAlternateType();
        if (alternative) {
          this.setState({valid: false, type: alternative});
        }
      }
    }
  }

  /**
   * after component unmount, clear timeouts
   *
   * @returns {void}
   * @memberof Tooltip
   */
  componentWillUnmount(): void {
    this._clearHoverTimeout();
    if (this._buttonRef?.removeEventListener) {
      this._buttonRef.removeEventListener('keydown', this.handleKeyDown);
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Tooltip
   */
  render(props: any): VNode<any> {
    const className = [style.tooltipLabel, style[`tooltip-${this.state.type}`]];
    if (props.className) {
      className.push(props.className);
    }
    this.state.showTooltip && this.state.valid ? className.push(style.show) : className.push(style.hide);
    if (props.isMobile) {
      return toChildArray(props.children)[0] as VNode<any>;
    }
    const children = cloneElement(props.children, {
      onFocus: this.handleFocusOnChildren,
      onBlur: this.handleBlurOnChildren,
      ref: this.setButtonRef
    });
    return (
      <div
        className={style.tooltip}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        ref={el => (el ? (this.tooltipElement = el) : undefined)}
      >
        {children}
        <span style={{maxWidth: props.maxWidth}} ref={el => (el ? (this.textElement = el) : undefined)} className={className.join(' ')}>
          {props.label}
        </span>
      </div>
    );
  }
}

export {Tooltip, ToolTipType};
