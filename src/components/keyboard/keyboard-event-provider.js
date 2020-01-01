// @flow
import {Component} from 'preact';
import {withEventManager} from 'event/with-event-manager';
import {withLogger} from 'components/logger';

const COMPONENT_NAME = 'KEYBOARD_PROVIDER';

export const keyboardEvents: Object = {keydown: 1, keyup: 2};

@withEventManager
@withLogger(COMPONENT_NAME)
/**
 * KeyboardEventProvider component
 *
 * @class KeyboardEventProvider
 * @extends {Component}
 */
class KeyboardEventProvider extends Component {
  _keyboardListeners = [];
  _isKeyboardEnable: boolean = false;
  _componentToHandle: ?string = null;
  keyEventHandler: Function;
  /**
   * constructor
   * @return {void}
   */
  componentDidMount() {
    const {eventManager, playerContainer} = this.props;
    this.keyEventHandler = this._keyEventHandler.bind(this);
    Object.keys(keyboardEvents).forEach(event => {
      eventManager.listen(playerContainer, event, this.keyEventHandler);
    });
  }
  /**
   * Before component is unmounted remove all event manager listeners.
   * @returns {void}
   */
  componentWillUnmount(): void {
    const {eventManager, playerContainer} = this.props;
    Object.keys(keyboardEvents).forEach(event => {
      eventManager.unlisten(playerContainer, event, this.keyEventHandler);
    });
  }

  /**
   *
   * @returns {boolean} should not rerender
   * @memberof KeyboardEventProvider
   */
  shouldComponentUpdate(): boolean {
    return false;
  }
  /**
   * handles key events
   * @param {KeyboardEvent} event - the keyboard event
   * @returns {void}
   * @memberof KeyboardEventProvider
   */
  _keyEventHandler(event: KeyboardEvent) {
    const keyCombine = this._createKeyCode(event.type, {
      code: event.keyCode,
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey
    });
    const nodeName = event.target instanceof Node ? event.target.nodeName || '' : '';
    const isEditableNode = ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(nodeName) !== -1;
    if (
      !isEditableNode &&
      this._isKeyboardEnable &&
      this._keyboardListeners[keyCombine] &&
      typeof this._keyboardListeners[keyCombine].callback === 'function' &&
      (!this._componentToHandle || this._keyboardListeners[keyCombine].componentName === this._componentToHandle)
    ) {
      event.preventDefault();
      event.stopPropagation();
      this._keyboardListeners[keyCombine].callback(event);
    }
  }
  /**
   * add keyboard event handler
   * @param {string} componentName - event type
   * @param {string} eventType - event type
   * @param {KeyboardKey} key - the click data payload
   * @param {Function} callback - the click data payload
   * @returns {void}
   * @private
   */
  _addKeyboardHandler = (componentName: string, eventType: string, key: KeyboardKey, callback: Function) => {
    const keyCode = this._createKeyCode(eventType, key);
    if (!this._keyboardListeners[keyCode]) {
      this._keyboardListeners[keyCode] = {callback, componentName};
    } else {
      this.props.logger.warn(`Combination of key ${key.code} altKey ${(!!key.altKey).toString()} ctrlKey ${(!!key.ctrlKey).toString()} 
      metaKey ${(!!key.metaKey).toString()} shiftKey ${(!!key.shiftKey).toString()} already exist`);
    }
  };
  /**
   * remove keyboard event handler
   * @param {string} eventType - event type
   * @param {KeyboardKey} key - the click data payload
   * @returns {void}
   * @private
   */
  _removeKeyboardHandler = (eventType: string, key: KeyboardKey) => {
    const keyCode = this._createKeyCode(eventType, key);
    if (this._keyboardListeners[keyCode]) {
      delete this._keyboardListeners[keyCode];
    }
  };

  /**
   * update the listners status
   * @param {boolean} isEnable - keyboard status listeners
   * @returns {void}
   * @private
   */
  _updateIsKeyboardEnable = (isEnable: boolean) => {
    this._isKeyboardEnable = isEnable;
  };

  /**
   * update specific component to handle
   * @param {?string} componentName - Component to handle
   * @returns {void}
   * @private
   */
  _updateComponentToHandler = (componentName: ?string) => {
    this._componentToHandle = componentName;
  };

  /**
   * create key code from sequence of controls
   * @param {string} eventType - keyboard event type
   * @param {KeyboardKey} key - the key to register for
   * @returns {number} the key for handler
   * @private
   */
  _createKeyCode(eventType: string, key: KeyboardKey): number {
    const eventTypeCode = keyboardEvents[eventType];
    const altKey = key.altKey ? 1 : 0;
    const ctrlKey = key.ctrlKey ? 1 : 0;
    const metaKey = key.metaKey ? 1 : 0;
    const shiftKey = key.shiftKey ? 1 : 0;
    return parseInt('' + eventTypeCode + key.code + altKey + ctrlKey + metaKey + shiftKey);
  }
  /**
   * create context for keyboard event handler
   * @returns {void}
   */
  getChildContext() {
    return {
      addKeyboardHandler: this._addKeyboardHandler,
      removeKeyboardHandler: this._removeKeyboardHandler,
      updateIsKeyboardEnable: this._updateIsKeyboardEnable,
      updateComponentToHandler: this._updateComponentToHandler
    };
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof KeyboardEventProvider
   */
  render(): React$Element<any> | null {
    return (this.props.children && this.props.children[0]) || null;
  }
}

export {KeyboardEventProvider};
