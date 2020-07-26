//@flow
import style from '../../styles/style.scss';
import {h, Component, toChildArray, createRef} from 'preact';
import {connect} from 'react-redux';

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

const TOOLTIP_SHOW_TIMEOUT: number = 250;

// notice the order represents the order of the alternative fallback
const ToolTipType = {
  Top: 'top',
  Bottom: 'bottom',
  TopRight: 'top-right',
  TopLeft: 'top-left',
  BottomRight: 'bottom-right',
  BottomLeft: 'bottom-left',
  Left: 'left',
  Right: 'right'
};

/**
 * Tooltip component
 *
 * @class Tooltip
 * @example <Tooltip>...</Tooltip>
 * @extends {Component}
 */
@connect(mapStateToProps)
class Tooltip extends Component {
  state: Object;
  _hoverTimeout: ?TimeoutID;
  textElement: HTMLSpanElement = createRef();
  lastAlternativeTypeIndex: number = -1;

  /**
   * default component props
   * @type {Object}
   * @memberof Tooltip
   */
  static defaultProps = {
    type: ToolTipType.Top,
    maxWidth: '240px'
  };

  /**
   * on mouse over handler.
   * @memberof Tooltip
   * @returns {void}
   */
  onMouseOver(): void {
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = null;
    }
    this._hoverTimeout = setTimeout(() => {
      this.setState({showTooltip: true});
    }, TOOLTIP_SHOW_TIMEOUT);
  }

  /**
   * on mouse leave handler.
   * @memberof Tooltip
   * @returns {void}
   */
  onMouseLeave(): void {
    this.setState({showTooltip: false});
    clearTimeout(this._hoverTimeout);
    this._hoverTimeout = null;
  }

  /**
   * brings another tooltip type which hasn't been marked as invalid
   * @memberof Tooltip
   * @returns {string} tooltip type
   */
  getAlternateType(): ?string {
    return ((Object.values(ToolTipType).find((item, index) => {
      if (index > this.lastAlternativeTypeIndex && item != this.props.type) {
        this.lastAlternativeTypeIndex = index;
        return true;
      } else {
        return false;
      }
    }): any): string);
  }

  /**
   * checks if the current tooltip type is within the player boundaries
   * @memberof Tooltip
   * @returns {string} is in boundaries
   */
  isToolTipInBoundaries(): boolean {
    const tooltipBoundingRect = this.textElement.getBoundingClientRect();
    const playerContainerRect = this.props.playerClientRect;

    return (
      tooltipBoundingRect.top > playerContainerRect.top + PLAYER_MARGIN &&
      tooltipBoundingRect.bottom < playerContainerRect.bottom - PLAYER_MARGIN &&
      tooltipBoundingRect.right < playerContainerRect.right - PLAYER_MARGIN &&
      tooltipBoundingRect.left > playerContainerRect.left + PLAYER_MARGIN
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
   * checks if after the render the tooltip is within boundaries of the player
   * if not it will try to set a new type which will be checked after the next render
   * @param {Object} prevProps - previous component props
   * @memberof Tooltip
   * @returns {void}
   */
  componentDidUpdate(prevProps: Object): void {
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
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Tooltip
   */
  render(props: any): React$Element<any> {
    const className = [style.tooltipLabel, style[`tooltip-${this.state.type}`]];
    this.state.showTooltip && this.state.valid ? className.push(style.show) : className.push(style.hide);
    return props.isMobile ? (
      toChildArray(props.children)[0]
    ) : (
      <div className={style.tooltip} onMouseOver={() => this.onMouseOver()} onMouseLeave={() => this.onMouseLeave()}>
        {props.children}
        <span style={{maxWidth: props.maxWidth}} ref={this.textElement} className={className.join(' ')}>
          {props.label}
        </span>
      </div>
    );
  }
}

export {Tooltip, ToolTipType};
