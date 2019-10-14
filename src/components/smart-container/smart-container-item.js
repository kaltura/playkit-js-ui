//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {DropDown} from '../dropdown';
import {default as Icon} from '../icon';

const COMPONENT_NAME = 'SmartContainerItem';

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
    const label = props.label && props.label.toLowerCase();
    return (
      <div className={[style.smartContainerItem, style.selectMenuItem].join(' ')}>
        <label htmlFor={label}>
          {props.icon ? (
            <div className={style.labelIcon}>
              <Icon type={props.icon} />
            </div>
          ) : (
            undefined
          )}
          {props.label}
        </label>
        <DropDown
          pushRef={el => {
            props.pushRef(el);
          }}
          name={label}
          onMenuChosen={o => props.onMenuChosen(o)}
          options={props.options}
        />
      </div>
    );
  }
}

SmartContainerItem.displayName = COMPONENT_NAME;
export {SmartContainerItem};
