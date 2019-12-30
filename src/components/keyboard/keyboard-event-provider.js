// @flow
import {Component} from 'preact';
import {withEventManager} from 'event/with-event-manager';
import {connect} from 'preact-redux';
import {bindActions} from 'utils/bind-actions';
import {actions} from 'reducers/settings';
import {withLogger} from 'components/logger';

const COMPONENT_NAME = 'KEYBOARD_PROVIDER';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isKeyboardEnable: state.keyboard.isKeyboardEnable,
  priorityComponent: state.keyboard.priorityComponent
});

@connect(
  mapStateToProps,
  bindActions(actions)
)
@withEventManager
@withLogger(COMPONENT_NAME)
/**
 * KeyboardEventProvider component
 *
 * @class KeyboardEventProvider
 * @extends {Component}
 */
class KeyboardEventProvider extends Component {
  _events: Object = {keydown: 1, keyup: 2, keypress: 3};
  _keyboardListeners = [];
  keyEventHandler: Function;
  /**
   * constructor
   * @return {void}
   */
  componentDidMount() {
    const {eventManager, playerContainer} = this.props;
    this.keyEventHandler = this._keyEventHandler.bind(this);
    Object.keys(this._events).forEach(event => {
      eventManager.listen(playerContainer, event, this.keyEventHandler);
    });
  }
  /**
   * Before component is unmounted remove all event manager listeners.
   * @returns {void}
   */
  componentWillUnmount(): void {
    const {eventManager, playerContainer} = this.props;
    Object.keys(this._events).forEach(event => {
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
      this.props.isKeyboardEnable &&
      this._keyboardListeners[keyCombine] &&
      typeof this._keyboardListeners[keyCombine].callback === 'function' &&
      (!this.props.priorityComponent || this._keyboardListeners[keyCombine].componentName === this.props.priorityComponent)
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
   * create key code from sequence of controls
   * @param {string} eventType - keyboard event type
   * @param {KeyboardKey} key - the key to register for
   * @returns {number} the key for handler
   * @private
   */
  _createKeyCode(eventType: string, key: KeyboardKey): number {
    const eventTypeCode = this._events[eventType];
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
      removeKeyboardHandler: this._removeKeyboardHandler
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
