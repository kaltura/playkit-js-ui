//@flow
import {h, Component} from 'preact';
import {keyboardEvents} from './keyboard-event-provider';
/**
 *
 * @param {string} name - the component to wrap
 // * @param {Component} WrappedComponent - the component to wrap
 * @returns {React$Element} - component element
 */
const withKeyboardEvent: Function = (name: string) => (WrappedComponent: Component) => {
  return class KeyboardComponent extends Component {
    keyboardEventHandlers: Array<KeyboardEventHandlers> = [];

    /**
     * on component mount
     *
     * @returns {void}
     * @memberof withKeyboardEvent
     */
    componentDidMount(): void {
      this.keyboardEventHandlers.forEach(eventHandler => {
        const eventType = eventHandler.eventType ? eventHandler.eventType : Object.keys(keyboardEvents)[0];
        this._addKeyboardHandler(name, eventType, eventHandler.key, eventHandler.action);
      });
    }

    /**
     * on component unmount
     *
     * @returns {void}
     * @memberof withKeyboardEvent
     */
    componentWillUnmount(): void {
      this.keyboardEventHandlers.forEach(eventHandler => {
        const eventType = eventHandler.eventType ? eventHandler.eventType : Object.keys(keyboardEvents)[0];
        this._removeKeyboardHandler(eventType, eventHandler.key);
      });
    }

    /**
     * register keyboard events
     * @param {Array<KeyboardEventHandlers>} eventHandlers - Events of keyboard
     * @returns {void}
     */
    registerKeyboardEvents(eventHandlers: Array<KeyboardEventHandlers>) {
      this.keyboardEventHandlers = eventHandlers;
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
     * update the listners status
     * @param {boolean} isEnable - keyboard status listeners
     * @returns {void}
     *
     * @memberof withKeyboardEvent
     */
    _updateIsKeyboardEnable = (isEnable: boolean) => {
      this.context.updateIsKeyboardEnable(isEnable);
    };

    /**
     * update specific component to handle
     * @param {?string} componentName - Component to handle
     * @returns {void}
     * @private
     */
    _updateComponentToHandler = (componentName: ?string) => {
      this.context.updateComponentToHandler(componentName);
    };
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
          updateComponentToHandler={componentName => this._updateComponentToHandler(componentName)}
          updateIsKeyboardEnable={isEnable => this._updateIsKeyboardEnable(isEnable)}
          registerKeyboardEvents={eventHandlers => this.registerKeyboardEvents(eventHandlers)}
        />
      );
    }
  };
};

export {withKeyboardEvent};
