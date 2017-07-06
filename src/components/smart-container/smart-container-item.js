//@flow
import { h, Component } from 'preact';
import DropDownMenu from '../dropdown-menu/dropdown-menu';
import Icon from '../icon/icon';

class SmartContainer extends Component {
  render(props: any) {
    return (
      <div className='smart-container-item select-menu-item'>
        <label htmlFor='quality'>
          {props.icon ? <div className='label-icon'><Icon type={props.icon} /></div> : undefined}
          {props.label}
        </label>
        <DropDownMenu onSelect={o => props.onSelect(o)} options={props.options} />
      </div>
    )
  }
}

export default SmartContainer;
