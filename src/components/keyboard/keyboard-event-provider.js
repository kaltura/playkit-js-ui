// @flow
import {Component} from 'preact';
import {withEventManager} from 'event/with-event-manager';
import {connect} from 'preact-redux';
import {bindActions} from 'utils/bind-actions';
import {actions} from 'reducers/settings';
import {actions as overlayIconActions} from 'reducers/overlay-action';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isKeyboardEnable: state.keyboard.isKeyboardEnable
});

@connect(
  mapStateToProps,
  bindActions({...actions, ...overlayIconActions})
)
@withEventManager
/**
 * KeyboardEventProvider component
 *
 * @class KeyboardEventProvider
 * @extends {Component}
 */
class KeyboardEventProvider extends Component {
  _keyboardListeners = [];
  /**
   * constructor
   * @return {void}
   */
  componentDidMount() {
    const {eventManager} = this.props;
    eventManager.listen(this.props.playerContainer, 'keydown', e => this.onKeyDown(e));
  }
  /**
   * handles keydown events
   * @param {KeyboardEvent} event - the keyboard event
   * @returns {void}
   * @memberof HOC
   */
  onKeyDown(event: KeyboardEvent) {
    const nodeName = event.target instanceof Node ? event.target.nodeName || '' : '';
    const isEditableNode = ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(nodeName) !== -1;
    const keyCombine = this._createKeyCode({
      code: event.keyCode,
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey
    });
    if (!isEditableNode && this.props.isKeyboardEnable && typeof this._keyboardListeners[keyCombine] === 'function') {
      this._keyboardListeners[keyCombine](event);
    }
  }
  /**
   * add keyboard event handler
   * @param {KeyboardKey} key - the click data payload
   * @param {Function} callback - the click data payload
   * @returns {void}
   * @private
   */
  _addKeyboardHandler = (key: KeyboardKey, callback: Function) => {
    const keyCode = this._createKeyCode(key);
    if (!this._keyboardListeners[keyCode]) {
      this._keyboardListeners[keyCode] = callback;
    }
    window.console.log(this._keyboardListeners[keyCode]);
  };
  /**
   * create key code from sequence of controls
   * @param {KeyboardKey} key - the key to register for
   * @returns {number} the key for handler
   * @private
   */
  _createKeyCode(key: KeyboardKey): number {
    const altKey = key.altKey ? 1 : 0;
    const ctrlKey = key.ctrlKey ? 1 : 0;
    const metaKey = key.metaKey ? 1 : 0;
    const shiftKey = key.shiftKey ? 1 : 0;
    return parseInt('' + key.code + altKey + ctrlKey + metaKey + shiftKey);
  }
  /**
   * create context player
   * @returns {void}
   */
  getChildContext() {
    return {
      addKeyboardHandler: this._addKeyboardHandler
    };
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof EventDispatcherProvider
   */
  render(): React$Element<any> | null {
    return (this.props.children && this.props.children[0]) || null;
  }
}

export {KeyboardEventProvider};
