//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {DropDown} from '../dropdown';
import {default as Icon} from '../icon';
import {KeyMap} from '../../utils/key-map';

/**
 * SmartContainerItem component
 *
 * @class SmartContainerItem
 * @extends {Component}
 */
class SmartContainerItem extends Component {
  _el: HTMLDivElement;
  _dropDown: DropDown;

  /**
   * after component mounted, focus dropdown button if passed to be focus
   * @returns {void}
   * @memberof DropDown
   */
  componentDidMount(): void {
    if (this.props.focus) {
      this._el.focus();
    }
  }

  onKeyDown(e): void {
    this.props.onKeyDown(e);
    this._dropDown.onKeyDown(e);
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
        onKeyDown={e => {
          this.onKeyDown(e);
        }}
        ref={el => (this._el = el)}
        tabIndex="0"
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
          onRef={ref => (this._dropDown = ref)}
          onSelect={o => props.onSelect(o)}
          options={props.options}
          focus={typeof this.props.focus === 'boolean' && this.props.focus}
        />
      </div>
    );
  }
}

export {SmartContainerItem};
