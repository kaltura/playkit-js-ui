//@flow
import { h, Component } from 'preact';
import DropDownMenu from '../dropdown-menu/dropdown-menu';

class SmartContainer extends Component {
  render(props) {
    return (
      <div className='smart-container-item select-menu-item'>
        <label htmlFor='quality'>{props.label}</label>
        <DropDownMenu onSelect={o => props.onSelect(o)} options={props.options} />
      </div>
    )
  }
}

export default SmartContainer;
