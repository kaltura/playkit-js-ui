//@flow
import {Component} from 'preact';
import getLogger from '../utils/logger';
import {types} from '../middlewares/event-dispatcher';
import {EventManager} from '../event/event-manager';

/**
 * Base component to be extended by other player UI components
 *
 * @class BaseComponent
 * @extends {Component}
 */
class BaseComponent extends Component {
  state: Object;
  player: Object;
  name: string;
  config: Object;
  logger: any;
  eventManager: EventManager;

  /**
   * Components default props.
   * @type {Object}
   * @static
   */
  static defaultProps: Object = {};

  /**
   * Creates an instance of BaseComponent.
   * @param {Object} [obj={ config: {} }] obj
   * @param {Object} props - component props
   * @memberof BaseComponent
   */
  constructor(obj?: Object = {config: {}}, props?: Object) {
    super(props);
    this.name = obj.name;
    this.player = obj.player;
    this.config = obj.config;
    this.eventManager = new EventManager();
    this.logger = getLogger(`UI ${this.name}`);
    this.logger.debug(`Initialized`);
  }

  /**
   * Notify the store that a clickable component has been clicked.
   * @param {any} payload - Optional payload.
   * @returns {void}
   *
   * @memberof BaseComponent
   */
  notifyClick(payload?: any): void {
    this.context.store.dispatch({
      type: types.COMPONENT_CLICKED,
      name: this.name,
      payload: payload
    });
  }

  /**
   * Notify the store that a changeable component has been change.
   * @param {any} payload - Optional payload.
   * @returns {void}
   *
   * @memberof BaseComponent
   */
  notifyChange(payload?: any): void {
    this.context.store.dispatch({
      type: types.COMPONENT_CHANGED,
      name: this.name,
      payload: payload
    });
  }

  /**
   * Before component is mounted remove all event manager listeners.
   * @returns {void}
   *
   * @memberof BaseComponent
   */
  componentWillUnmount(): void {
    this.eventManager.removeAll();
  }
}

export default BaseComponent;
export {BaseComponent};
