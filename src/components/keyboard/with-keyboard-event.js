//@flow
import {h, Component} from 'preact';

/**
 *
 * @param {string} name - the component to wrap
 // * @param {Component} WrappedComponent - the component to wrap
 * @returns {React$Element} - component element
 */
const withKeyboardEvent: Function = (name: string) => (WrappedComponent: Component) => {
  return class KeyboardComponent extends Component {
    keyboardEventHandlers: Array<KeyboardEventHandler>;
    /**
     *
     * @param {Array<KeyboardHandlers>} eventHandlers - Events of keyboard
     * @returns {void}
     */
    registerEvents(eventHandlers: Array<KeyboardEventHandler>) {
      this.keyboardEventHandlers = eventHandlers;
      this.keyboardEventHandlers.forEach(eventHandler => {
        const {eventType, handlers} = eventHandler;
        if (Array.isArray(handlers)) {
          handlers.forEach(handler => {
            this._addKeyboardHandler(name, eventType, handler.key, handler.action);
          });
        }
      });
    }
    /**
     * Before component is unmounted remove all event manager listeners.
     * @returns {void}
     */
    componentWillUnmount(): void {
      this.keyboardEventHandlers.forEach(eventHandler => {
        const {eventType, handlers} = eventHandler;
        if (Array.isArray(handlers)) {
          handlers.forEach(handler => {
            this._removeKeyboardHandler(eventType, handler.key);
          });
        }
      });
    }
    /**
     * add keyboard handler
     * @param {string} componentName - component name
     * @param {string} eventType - event type to handle
     * @param {number} keyCode - key code to handle
     * @param {Function} callback - Optional payload.
     * @returns {void}
     *
     * @memberof withKeyboardEvent
     */
    _addKeyboardHandler(componentName: string, eventType: string, keyCode: KeyboardKey, callback: Function): void {
      this.context.addKeyboardHandler(componentName, eventType, keyCode, callback);
    }

    /**
     * add keyboard handler
     * @param {string} eventType - event type
     * @param {number} keyCode - Optional payload.
     * @returns {void}
     *
     * @memberof withKeyboardEvent
     */
    _removeKeyboardHandler(eventType: string, keyCode: KeyboardKey): void {
      this.context.removeKeyboardHandler(eventType, keyCode);
    }

    /**
     * render component
     *
     * @returns {React$Element} - component element
     * @memberof withKeyboardEvent
     */
    render(): React$Element<any> | void {
      return <WrappedComponent {...this.props} registerEvents={eventHandlers => this.registerEvents(eventHandlers)} />;
    }
  };
};

export {withKeyboardEvent};
