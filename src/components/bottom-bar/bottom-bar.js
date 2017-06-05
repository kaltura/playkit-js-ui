import { h } from 'preact';
import BaseComponent from '../base';

class BottomBar extends BaseComponent {
  constructor() {
    super({name: 'BottomBar'});
  }
  render(props) {
    return (
      <div className='bottom-bar'>{ props.children }</div>
    )
  }
}

export default BottomBar;
