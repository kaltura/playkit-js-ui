//@flow
import { h, Component } from 'preact';

/**
 * BottomBar component
 *
 * @class BottomBar
 * @extends {Component}
 */
class BottomBar extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {Element} - component element
   * @memberof BottomBar
   */
  render(props: any): Element {
    return (
      <div className='bottom-bar'>{ props.children }</div>
    )
  }
}

export default BottomBar;
