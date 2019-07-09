//@flow
import {h, Component} from 'preact';

/**
 * OverlayPortal component
 *
 * @class OverlayPortal
 * @example <OverlayPortal>...</OverlayPortal>
 * @extends {Component}
 */
class OverlayPortal extends Component {
  /**
   * change in component props or state shouldn't render the component again
   *
   * @returns {boolean} shouldComponentUpdate
   * @memberof OverlayPortal
   */
  shouldComponentUpdate(): boolean {
    return false;
  }

  /**
   * render component
   *
   * @param {*} props - comonent props
   * @returns {React$Element} - component element
   * @memberof OverlayPortal
   */
  render(props: any): React$Element<any> {
    return <div className="overlay-portal">{props.children}</div>;
  }
}

export {OverlayPortal};
