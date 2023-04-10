//@flow
import style from './_toggle-button.scss';
import {h, Component} from 'preact';
// import {Text} from 'preact-i18n';

const COMPONENT_NAME = 'ToggleButton';

/**
 * Toggle Button component
 *
 * @class ToggleButton
 * @example <ToggleButton />
 * @extends {Component}
 */
class ToggleButton extends Component {
  onClick = (): void => {
    // TODO
    this.props.notifyClick();
  };

  /**
   * render Toggle Button component
   *
   * @param {*} props - component props
   * @returns {React$Element} component element
   * @memberof ToggleButton
   */
  // eslint-disable-next-line no-unused-vars,require-jsdoc
  render(props: any): React$Element<any> {
    return (
      <label className={style.switch}>
        <input type="checkbox" checked />
        <span className={style.slider} />
      </label>
    );
  }
}

ToggleButton.displayName = COMPONENT_NAME;
export {ToggleButton};
