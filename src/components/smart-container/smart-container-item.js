//@flow
import { h, Component } from 'preact';
import DropDown from '../dropdown';
import Icon from '../icon';

class SmartContainer extends Component {
  render(props: any) {
    return (
      <div className='smart-container-item select-menu-item'>
        <label htmlFor='quality'>
          {props.icon ? <div className='label-icon'><Icon type={props.icon} /></div> : undefined}
          {props.label}
        </label>
        <DropDown onSelect={o => props.onSelect(o)} options={props.options} />
      </div>
    )
  }
}

export default SmartContainer;
