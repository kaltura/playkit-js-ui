//@flow
import { h, Component } from 'preact';

/**
 * TopBar component
 *
 * @class TopBar
 * @extends {Component}
 */
class TopBar extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {Element} - component element
   * @memberof TopBar
   */
  render(props: any): Element {
    return (
      <div className='top-bar'>{ props.children }</div>
    )
  }
}

export default TopBar;
