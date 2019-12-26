// @flow
import {Component} from 'preact';
import {withEventManager} from 'event/with-event-manager';
import {connect} from 'preact-redux';
import {bindActions} from 'utils/bind-actions';
import {actions} from 'reducers/settings';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playerNav: state.shell.playerNav,
  shareOverlay: state.share.overlayOpen,
  isKeyboardEnable: state.keyboard.isKeyboardEnable
});

@connect(
  mapStateToProps,
  bindActions(actions)
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
    const {eventManager, playerContainer} = this.props;
    eventManager.listen(playerContainer, 'keydown', e => this.onKeyDown(e));
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
   * handles keydown events
   * @param {KeyboardEvent} event - the keyboard event
   * @returns {void}
   * @memberof KeyboardEventProvider
   */
  onKeyDown(event: KeyboardEvent) {
    const keyCombine = this._createKeyCode({
      code: event.keyCode,
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey
    });
    if (this._shouldHandledKeyboardEvent() && typeof this._keyboardListeners[keyCombine] === 'function') {
      this._keyboardListeners[keyCombine](event);
    }
  }
  /**
   * check if keyboard handler should be used
   * @returns {boolean} - handler should be used
   * @private
   */
  _shouldHandledKeyboardEvent(): boolean {
    return this.props.isKeyboardEnable && !this.props.shareOverlay && !this.props.playerNav;
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
   * create context for keyboard event handler
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
   * @memberof KeyboardEventProvider
   */
  render(): React$Element<any> | null {
    return (this.props.children && this.props.children[0]) || null;
  }
}

export {KeyboardEventProvider};
