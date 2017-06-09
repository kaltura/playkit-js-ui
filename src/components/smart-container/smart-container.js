//@flow
import { h, Component } from 'preact';
import DropDownMenu from '../dropdown-menu/dropdown-menu';

class SmartContainer extends Component {
  render() {
    return (
      <div className='menu top left'>
        <div className='menu-item select-menu-item'>
          <label htmlFor='quality'>Quality</label>
          <DropDownMenu />
        </div>
        <div className='menu-item select-menu-item'>
          <label htmlFor='speed'>Speed</label>
          <DropDownMenu />
        </div>
      </div>
    )
  }
}

export default SmartContainer;
