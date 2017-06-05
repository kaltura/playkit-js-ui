import { h } from 'preact';
import BaseComponent from '../base';

class TopBar extends BaseComponent {
  constructor() {
    super({name: 'TopBar'});
  }
  render(props) {
    return (
      <div className='top-bar'>{ props.children }</div>
    )
  }
}

export default TopBar;
