import {h, Component, VNode} from 'preact';
import {KeyMap} from '../../utils';
import style from '../../styles/style.scss';

const COMPONENT_NAME = 'ToggleSwitch';

/**
 * Toggle Switch component
 *
 * @class ToggleSwitch
 * @example <ToggleSwitch />
 * @extends {Component}
 */
class ToggleSwitch extends Component<any, any> {
  /**
   * render Toggle Switch component
   *
   * @param {boolean} isChecked - - Whether the input is checked or not
   * @returns {void}
   * @member ToggleSwitch
   */
  onChange = (isChecked: boolean) => {
    this.props.onMenuChosen(isChecked);
  };

  /**
   * render Toggle Switch component
   *
   * @param {KeyboardEvent} event - - Keyboard Event
   * @returns {void}
   * @member ToggleSwitch
   */
  handleOnKeyDown = (event: KeyboardEvent) => {
    if (event.keyCode === KeyMap.ENTER || event.keyCode === KeyMap.SPACE) {
      event.preventDefault();
      this.onChange(!this.props.isChecked);
    }
  };

  /**
   * render Toggle Switch component
   *
   * @param {*} props - component props
   * @returns {React$Element} component element
   * @memberof ToggleSwitch
   */
  render(props: any): VNode<any> {
    return (
      <label
        onKeyDown={event => this.handleOnKeyDown(event)}
        className={style.switch}
        ref={el => {
          if (props.pushRef) {
            props.pushRef(el);
          }
        }}
        aria-label={props.name}
        role="switch"
        aria-checked={props.isChecked}
        tabIndex={-1}
      >
        <input
          name={props.name}
          className={style.toggleInput}
          type="checkbox"
          checked={props.isChecked}
          onChange={e => this.onChange((e.target as HTMLInputElement).checked)}
        />
        <span className={style.slider} />
      </label>
    );
  }
}

ToggleSwitch.displayName = COMPONENT_NAME;
export {ToggleSwitch};
