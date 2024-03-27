import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {DropDown} from '../dropdown';
import {default as Icon, IconType} from '../icon';
import {ToggleSwitch} from '../../components';
import {SmartContainerItemType} from './smart-container-item-type';

const COMPONENT_NAME = 'SmartContainerItem';

/**
 * SmartContainerItem component
 *
 * @class SmartContainerItem
 * @extends {Component}
 */
class SmartContainerItem extends Component<any, any> {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SmartContainer
   */
  render(props: any): VNode<any> {
    const label = props.label && props.label.toLowerCase();
    return (
      <div className={[style.smartContainerItem, style.selectMenuItem].join(' ')}>
        <label id={label} htmlFor={label}>
          {props.icon ? (
            <div className={style.labelIcon}>
              <Icon type={props.icon} />
            </div>
          ) : undefined}
          {props.label}
        </label>
        {props.options && props.options.length ? (
          <DropDown
            pushRef={el => {
              props.pushRef(el);
            }}
            name={label}
            onMenuChosen={o => props.onMenuChosen(o)}
            options={props.options}
          />
        ) : (
          <div style={{paddingLeft: '20px'}}>
            {props.type === SmartContainerItemType.ToggleSwitch && (
              <ToggleSwitch
                pushRef={el => {
                  props.pushRef(el);
                }}
                name={label}
                isChecked={props.isChecked}
                onMenuChosen={o => props.onMenuChosen(o)}
              />
            )}
            {props.type === SmartContainerItemType.Menu && (
              <span style={{width: '24px', height: '24px', display: 'block'}} className={[style.menuIconContainer, style.active].join(' ')}>
                <Icon type={IconType.CheckActive} />
              </span>
            )}
          </div>
        )}
      </div>
    );
  }
}

SmartContainerItem.displayName = COMPONENT_NAME;
export {SmartContainerItem};
