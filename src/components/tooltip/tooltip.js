//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';

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
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof Tooltip
   */
  render(): React$Element<any> {
    const className = [style.tooltipLabel, this.getTooltipPosition()];
    return (
      <div className={style.tooltip}>
        <span className={className.join(' ')}>{this.props.label}</span>
        {this.props.children}
      </div>
    );
  }
}

export default Tooltip;
