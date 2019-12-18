//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';

export const TOOLTIP_SHOW_TIMEOUT: number = 250;
const ToolTipType = {
  Top: 'top',
  TopRight: 'top-right',
  TopLeft: 'top-left',
  Left: 'left',
  Right: 'right',
  Bottom: 'bottom',
  BottomRight: 'bottom-right',
  BottomLeft: 'bottom-left'
};

type CalculatedStyling = {
  className: String,
  marginLeft: Number,
  marginTop: Number
};
/**
 * Tooltip component
 *
 * @class Tooltip
 * @example <Tooltip>...</Tooltip>
 * @extends {Component}
 */
class Tooltip extends Component {
  state: Object;
  _hoverTimeout: ?number;
  textElement: HTMLSpanElement;

  /**
   * default component props
   * @type {Object}
   * @memberof Tooltip
   */
  static defaultProps = {
    type: ToolTipType.Top
  };

  /**
   * @constructor
   * @param {*} props props
   * @memberof Tooltip
   */
  constructor(props: Object) {
    super(props);
    this.setState({showTooltip: false});
  }

  /**
   * gets the tooltip position based on component prop
   *
   * @returns {string} - position style class
   * @memberof Tooltip
   */
  calcTooltipStyling(): CalculatedStyling {
    let calculatedStyling: CalculatedStyling = {};
    switch (this.props.type) {
      case ToolTipType.Top:
        calculatedStyling.className = style.tooltipTop;
        calculatedStyling.marginLeft = this.textElement ? -this.textElement.getBoundingClientRect().width / 2 : 0;
        break;
      case ToolTipType.TopLeft:
        calculatedStyling.className = style.tooltipTopLeft;
        calculatedStyling.marginLeft = this.textElement ? -this.textElement.getBoundingClientRect().width + 16 : 0;
        break;
      case ToolTipType.TopRight:
        calculatedStyling.className = style.tooltipTopRight;
        calculatedStyling.marginLeft = -16;
        break;
      case ToolTipType.Left:
        calculatedStyling.className = style.tooltipLeft;
        calculatedStyling.marginTop = this.textElement ? -this.textElement.getBoundingClientRect().height / 2 : 0;
        break;
      case ToolTipType.Right:
        calculatedStyling.className = style.tooltipRight;
        calculatedStyling.marginTop = this.textElement ? -this.textElement.getBoundingClientRect().height / 2 : 0;
        break;
      case ToolTipType.Bottom:
        calculatedStyling.className = style.tooltipBottom;
        calculatedStyling.marginLeft = this.textElement ? -this.textElement.getBoundingClientRect().width / 2 : 0;
        break;
      case ToolTipType.BottomRight:
        calculatedStyling.className = style.tooltipBottomRight;
        calculatedStyling.marginLeft = -16;
        break;
      case ToolTipType.BottomLeft:
        calculatedStyling.className = style.tooltipBottomLeft;
        calculatedStyling.marginLeft = this.textElement ? -this.textElement.getBoundingClientRect().width + 16 : 0;
        break;
    }
    return calculatedStyling;
  }

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
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Tooltip
   */
  render(props: any): React$Element<any> {
    const calcStyle = this.calcTooltipStyling();
    const className = [style.tooltipLabel, calcStyle.className];
    this.state.showTooltip ? className.push(style.show) : className.push(style.hide);

    return (
      <div className={style.tooltip} onMouseOver={() => this.onMouseOver()} onMouseLeave={() => this.onMouseLeave()}>
        <span
          style={{marginLeft: calcStyle.marginLeft, marginTop: calcStyle.marginTop}}
          ref={el => {
            this.textElement = el;
          }}
          className={className.join(' ')}>
          {props.label}
        </span>
        {props.children}
      </div>
    );
  }
}

export {Tooltip, ToolTipType};
