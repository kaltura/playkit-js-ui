//@flow
import { h, Component } from 'preact';
import DropDown from '../dropdown';
import { default as Icon, IconType } from '../icon';

/**
 * SmartContainerItem component
 *
 * @class SmartContainerItem
 * @extends {Component}
 */
class SmartContainerItem extends Component {

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SmartContainer
   */
  render(props: any): React$Element<any> {
    return (
      <div className='smart-container-item select-menu-item'>
        <label htmlFor={IconType.Quality}>
          {props.icon ? <div className='label-icon'><Icon type={props.icon} /></div> : undefined}
          {props.label}
        </label>
        <DropDown onSelect={o => props.onSelect(o)} options={props.options} />
      </div>
    )
  }
}

export default SmartContainerItem;
