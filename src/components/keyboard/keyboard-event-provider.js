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
  shareOverlay: state.share.overlayOpen,
  playerNav: state.shell.playerNav
});

@connect(
  mapStateToProps,
  bindActions(Object.assign({}, actions, overlayIconActions))
)
@withEventManager
/**
 * KeyboardEventProvider component
 *
 * @class KeyboardEventProvider
 * @extends {Component}
 */
class KeyboardEventProvider extends Component {
  _keyboardHandlers = [];
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
   * @param {KeyboardEvent} e - the keyboard event
   * @returns {void}
   * @memberof HOC
   */
  onKeyDown(e: KeyboardEvent) {
    const nodeName = e.target instanceof Node ? e.target.nodeName || '' : '';
    const isEditableNode = ['INPUT', 'SELECT', 'TEXTAREA'].indexOf(nodeName) !== -1;
    if (!isEditableNode && !this.props.shareOverlay && !this.props.playerNav && !this._keyboardHandlers[e.keyCode]) return;
    this._keyboardHandlers[e.keyCode].forEach(callback => {
      callback(e);
    });
  }
  /**
   * add keyboard event handler
   * @param {number} key - the click data payload
   * @param {Function} callback - the click data payload
   * @returns {void}
   * @private
   */
  _addKeyboardHandler = (key: number, callback: Function) => {
    if (Array.isArray(this._keyboardHandlers[key])) {
      this._keyboardHandlers[key].push(callback);
    } else {
      this._keyboardHandlers[key] = [callback];
    }
  };
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
