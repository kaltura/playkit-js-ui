//@flow
import {h, Component} from 'preact';

/**
 *
 * @param {Component} WrappedComponent - the component to wrap
 * @returns {React$Element} - component element
 */
const withKeyboardEvent = (WrappedComponent: Component) => {
  return class KeyboardComponent extends Component {
    /**
     * add keyboard handler
     * @param {number} keyCode - Optional payload.
     * @param {Function} callback - Optional payload.
     * @returns {void}
     *
     * @memberof withKeyboardEvent
     */
    addKeyboardHandler(keyCode: KeyboardKey, callback: Function): void {
      this.context.addKeyboardHandler(keyCode, callback);
    }

    /**
     * add keyboard handler
     * @param {number} keyCode - Optional payload.
     * @returns {void}
     *
     * @memberof withKeyboardEvent
     */
    removeKeyboardHandler(keyCode: KeyboardKey): void {
      this.context.removeKeyboardHandler(keyCode);
    }

    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof withKeyboardEvent
     */
    render(): React$Element<any> | void {
      return (
        <WrappedComponent
          {...this.props}
          addKeyboardHandler={(keyCode, callback) => this.addKeyboardHandler(keyCode, callback)}
          removeKeyboardHandler={keyCode => this.removeKeyboardHandler(keyCode)}
        />
      );
    }
  };
};

export {withKeyboardEvent};
