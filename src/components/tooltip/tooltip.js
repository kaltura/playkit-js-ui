//@flow
import style from './_tooltip.scss';
import {h, Component} from 'preact';

/**
 * Tooltip component
 *
 * @class Tooltip
 * @example <Tooltip>...</Tooltip>
 * @extends {Component}
 */
class Tooltip extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Tooltip
   */
  render(props: any): React$Element<any> {
    let className = [style.tooltip];
    if (props.out) className.push(style.out);

    return (
      <div className={className.join(' ')} style={props.left ? {left: props.left} : ''}>{props.children}</div>
    )
  }
}

export default Tooltip;
