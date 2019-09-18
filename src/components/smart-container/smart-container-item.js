//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {DropDown} from '../dropdown';
import {default as Icon} from '../icon';
import {popupItemWithKeyboardA11y} from '../../utils/popup-item-keyboard-accessibility';


/**
 * SmartContainerItem component
 *
 * @class SmartContainerItem
 * @extends {Component}
 */
class SmartContainerItem extends Component {
  _parentSelectCallback: Function;

  componentDidMount(): void {
    this.props.setSelectCallback(this._parentSelectCallback);
    this.props.setCloseCallback(this.props.onClose);
  }

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
      <div
        ref={el => {
          if (props.pushRef) {
            props.pushRef(el);
          }
        }}
        tabIndex="-1"
        className={[style.smartContainerItem, style.selectMenuItem].join(' ')}>
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
          name={label}
          onSelect={o => props.onSelect(o)}
          options={props.options}
          registerParentSelectedCallback={callback => {
            this.registerParentSelectedCallback(callback);
          }}
        />
      </div>
    );
  }

  registerParentSelectedCallback(callback) {
    this._parentSelectCallback = callback;
  }
}

const keyboardAccessibleSmartContainerItem = popupItemWithKeyboardA11y(SmartContainerItem);
export {keyboardAccessibleSmartContainerItem as SmartContainerItem};
