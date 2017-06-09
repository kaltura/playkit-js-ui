//@flow
import { h, Component } from 'preact';
import Icon from '../icon/icon';

class DropDownMenu extends Component {
  render() {
    return (
      <div className='dropdown top left'>
        <div className='dropdown-button'>Auto</div>
        <div className='dropdown-menu'>
          <div className='dropdown-menu-item active'><span>Auto</span> <Icon type='check' /></div>
          <div className='dropdown-menu-item'><span>720p</span></div>
          <div className='dropdown-menu-item'><span>480p</span></div>
        </div>
      </div>
    )
  }
}

export default DropDownMenu;
