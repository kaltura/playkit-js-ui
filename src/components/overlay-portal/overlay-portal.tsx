import {h, Component, VNode} from 'preact';

const COMPONENT_NAME = 'OverlayPortal';

/**
 * OverlayPortal component
 *
 * @class OverlayPortal
 * @example <OverlayPortal>...</OverlayPortal>
 * @extends {Component}
 */
class OverlayPortal extends Component<any, any> {
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
  render(props: any): VNode<any> {
    return (
      <div className="overlay-portal" aria-live="polite">
        {props.children}
      </div>
    );
  }
}

OverlayPortal.displayName = COMPONENT_NAME;
export {OverlayPortal};
