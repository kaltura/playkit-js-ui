//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';


export const TOOLTIP_SHOW_TIMEOUT: number = 800;

/**
 * Tooltip component
 *
 * @class Tooltip
 * @example <Tooltip>...</Tooltip>
 * @extends {Component}
 */
class Tooltip extends Component {
  static defaultProps = {
    position: 'top'
  };
  _hoverTimeout: ?number;

  /**
   * @constructor
   * @memberof Tooltip
   */
  constructor() {
    super();
    this.setState({show: false});
  }

  /**
   * gets the tooltip position based on component prop
   *
   * @returns {string} - position style class
   * @memberof Tooltip
   */
  getTooltipPosition(): string {
    switch (this.props.position) {
      case 'left':
        return style.tooltipLeft;
      case 'right':
        return style.tooltipRight;
      case 'bottom':
        return style.tooltipBottom;
      case 'top':
      default:
        return style.tooltipTop;
    }
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
      this.setState({show: true});
    }, TOOLTIP_SHOW_TIMEOUT);
  }

  /**
   * on mouse leave handler.
   * @memberof Tooltip
   * @returns {void}
   */
  onMouseLeave(): void {
    this.setState({show: false});
    clearTimeout(this._hoverTimeout);
    this._hoverTimeout = null;
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof Tooltip
   */
  render(): React$Element<any> {
    const className = [style.tooltipLabel, this.getTooltipPosition()];
    this.state.show ? className.push(style.show) : className.push(style.hide);
    return (
      <div className={style.tooltip}
           onMouseOver={() => this.onMouseOver()}
           onMouseLeave={() => this.onMouseLeave()}>
        <span className={className.join(' ')}>{this.props.label}</span>
        {this.props.children}
      </div>
    );
  }
}

export default Tooltip;
