import { h, Component } from 'preact';

class BottomBar extends Component {
  render(props) {
    return (
      <div className='bottom-bar'>{ props.children }</div>
    )
  }
}

export default BottomBar;
