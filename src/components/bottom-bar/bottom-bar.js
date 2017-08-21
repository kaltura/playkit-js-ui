//@flow
import { h, Component } from 'preact';

/**
 * BottomBar component
 *
 * @class BottomBar
 * @example <BottomBar>...</BottomBar>
 * @extends {Component}
 */
class BottomBar extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof BottomBar
   */
  render(props: any): React$Element<any> {
    return (
      <div className='bottom-bar'>{ props.children }</div>
    )
  }
}

export default BottomBar;
