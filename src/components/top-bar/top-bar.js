//@flow
import { h, Component } from 'preact';

class TopBar extends Component {
  render(props: any) {
    return (
      <div className='top-bar'>{ props.children }</div>
    )
  }
}

export default TopBar;
