//@flow
import { h, Component } from 'preact';

class OverlayPortal extends Component {
  shouldComponentUpdate() { return false; }

  render(props: any) {
    return (
      <div id='overlay-portal'>{ props.children }</div>
    )
  }
}

export default OverlayPortal;
