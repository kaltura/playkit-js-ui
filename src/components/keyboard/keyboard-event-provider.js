// @flow
import {Component, toChildArray} from 'preact';
import {withEventManager} from 'event/with-event-manager';
import {withLogger} from 'components/logger';
import {connect} from 'react-redux';

const COMPONENT_NAME = 'KEYBOARD_PROVIDER';

export const KEYBOARD_EVENTS = ['keydown', 'keyup'];

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playerNav: state.shell.playerNav,
  shareOverlay: state.share.overlayOpen
});

/**
 * KeyboardEventProvider component
 *
 * @class KeyboardEventProvider
 * @extends {Component}
 */
@connect(mapStateToProps)
@withEventManager
@withLogger(COMPONENT_NAME)
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
    KEYBOARD_EVENTS.forEach(event => {
      eventManager.listen(playerContainer, event, this.keyEventHandler);
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
      this._shouldHandleKeyboardEvents() &&
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
   * check if keyboard handlers are relevant
   * @returns {boolean} - if keyboard handlers are relevant
   * @private
   */
  _shouldHandleKeyboardEvents(): boolean {
    return this._isKeyboardEnable && !this.props.playerNav && !this.props.shareOverlay;
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
   * update the listeners status
   * @param {boolean} isEnable - keyboard status listeners
   * @returns {void}
   * @private
   */
  _updateIsKeyboardEnabled = (isEnable: boolean) => {
    this._isKeyboardEnable = isEnable;
  };

  /**
   * update specific component to handle
   * @param {?string} componentName - component is scoped and only this component handler should work
   * @returns {void}
   * @private
   */
  _setKeyboardEventToScope = (componentName: ?string) => {
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
    const eventTypeCode = KEYBOARD_EVENTS.indexOf(eventType);
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
      updateIsKeyboardEnabled: this._updateIsKeyboardEnabled,
      setKeyboardEventToScope: this._setKeyboardEventToScope
    };
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof KeyboardEventProvider
   */
  render(): React$Element<any> | null {
    return (this.props.children && toChildArray(this.props.children)[0]) || null;
  }
}

export {KeyboardEventProvider};
