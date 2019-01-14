//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {DropDown} from '../dropdown';
import {default as Icon} from '../icon';

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
      <div className={[style.smartContainerItem, style.selectMenuItem].join(' ')}>
        <label htmlFor={props.label.toLowerCase()}>
          {props.icon ? (
            <div className={style.labelIcon}>
              <Icon type={props.icon} />
            </div>
          ) : (
            undefined
          )}
          {props.label}
        </label>
        <DropDown name={props.label.toLowerCase()} onSelect={o => props.onSelect(o)} options={props.options} />
      </div>
    );
  }
}

export {SmartContainerItem};
