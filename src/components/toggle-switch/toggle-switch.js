//@flow
import style from './_toggle-switch.scss';
import {h, Component} from 'preact';

const COMPONENT_NAME = 'ToggleSwitch';

/**
 * Toggle Switch component
 *
 * @class ToggleSwitch
 * @example <ToggleSwitch />
 * @extends {Component}
 */
class ToggleSwitch extends Component {
  /**
   * render Toggle Switch component
   *
   * @param {*} props - component props
   * @returns {React$Element} component element
   * @memberof ToggleSwitch
   */
  render(props: any): React$Element<any> {
    return (
      <label className={style.switch}>
        <input
          className={style.toggleInput}
          ref={el => {
            if (props.pushRef) {
              props.pushRef(el);
            }
          }}
          // onChange={this.onChange}
          onChange={props.onMenuChosen}
          type="checkbox"
          checked
        />
        <span className={style.slider} />
      </label>
    );
  }
}

ToggleSwitch.displayName = COMPONENT_NAME;
export {ToggleSwitch};
