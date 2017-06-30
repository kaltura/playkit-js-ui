import { h, Component } from 'preact';

class BottomBar extends Component {
  render(props: any) {
    return (
      <div className='bottom-bar'>{ props.children }</div>
    )
  }
}

export default BottomBar;
