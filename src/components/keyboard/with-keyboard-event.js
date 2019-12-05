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
     * @memberof EventDispatcherComponent
     */
    addKeyboardHandler(keyCode: number, callback: Function): void {
      this.context.addKeyboardHandler(keyCode, callback);
    }

    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof LoggerComponent
     */
    render(): React$Element<any> | void {
      return <WrappedComponent {...this.props} addKeyboardHandler={(keyCode, callback) => this.addKeyboardHandler(keyCode, callback)} />;
    }
  };
};

export {withKeyboardEvent};
