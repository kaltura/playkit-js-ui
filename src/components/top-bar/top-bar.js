import { h, Component } from 'preact';

class TopBar extends Component {
  render(props) {
    return (
      <div className='top-bar'>{ props.children }</div>
    )
  }
}

export default TopBar;
