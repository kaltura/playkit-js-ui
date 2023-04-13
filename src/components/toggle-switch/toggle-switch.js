//@flow
import style from './_toggle-switch.scss';
import {h, Component} from 'preact';
import {KeyMap} from 'utils';

const COMPONENT_NAME = 'ToggleSwitch';

/**
 * Toggle Switch component
 *
 * @class ToggleSwitch
 * @example <ToggleSwitch />
 * @extends {Component}
 */
class ToggleSwitch extends Component {
  onChange = isChecked => {
    this.props.onMenuChosen(isChecked);
  };

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
  render(props: any): React$Element<any> {
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
        tabIndex="-1">
        <input
          name={props.name}
          className={style.toggleInput}
          type="checkbox"
          checked={props.isChecked}
          onChange={e => this.onChange(e.target.checked)}
        />
        <span className={style.slider} />
      </label>
    );
  }
}

ToggleSwitch.displayName = COMPONENT_NAME;
export {ToggleSwitch};
