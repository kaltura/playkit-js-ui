import {h, Component, VNode} from 'preact';
import {KEYBOARD_EVENTS} from './keyboard-event-provider';
import {KeyboardEventHandlers, KeyboardKey} from '../../types';

export type WithKeyboardEventProps = {
  registerKeyboardEvents(eventHandlers: Array<KeyboardEventHandlers>): void;
  setKeyboardEventToScope(isScoped: boolean): void;
  updateIsKeyboardEnabled(isEnable: boolean): void;
};

/**
 *
 * @param {string} name - the component to wrap
 // * @param {Component} WrappedComponent - the component to wrap
 * @returns {React$Element} - component element
 */
const withKeyboardEvent =
  <P extends object>(name: string) =>
  (WrappedComponent: any): any => {
    return class KeyboardComponent extends Component<P & WithKeyboardEventProps, any> {
      keyboardEventHandlers: Array<KeyboardEventHandlers> = [];

      /**
       * on component mount
       *
       * @returns {void}
       * @memberof withKeyboardEvent
       */
      componentDidMount(): void {
        this.keyboardEventHandlers.forEach(eventHandler => {
          const eventType = eventHandler.eventType ? eventHandler.eventType : KEYBOARD_EVENTS[0];
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
          const eventType = eventHandler.eventType ? eventHandler.eventType : KEYBOARD_EVENTS[0];
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
      _updateIsKeyboardEnabled = (isEnable: boolean) => {
        this.context.updateIsKeyboardEnabled(isEnable);
      };

      /**
       * update specific component to handle
       * @param {boolean} isScoped - component is scoped and only this component handler should work
       * @returns {void}
       * @private
       */
      _setKeyboardEventToScope = (isScoped: boolean) => {
        isScoped ? this.context.setKeyboardEventToScope(name) : this.context.setKeyboardEventToScope(null);
      };
      /**
       * render component
       *
       * @returns {React$Element} - component element
       * @memberof withKeyboardEvent
       */
      render(): VNode<any> {
        return (
          <WrappedComponent
            {...this.props}
            setKeyboardEventToScope={isScoped => this._setKeyboardEventToScope(isScoped)}
            updateIsKeyboardEnabled={isEnable => this._updateIsKeyboardEnabled(isEnable)}
            registerKeyboardEvents={eventHandlers => this.registerKeyboardEvents(eventHandlers)}
          />
        );
      }
    };
  };

export {withKeyboardEvent};
