//@flow
import {Component} from 'preact';
import Player from 'playkit-js';
import getLogger from '../utils/logger';
import {types} from '../middlewars/event-dispacher';

/**
 * Base component to be extended by other player UI components
 *
 * @class BaseComponent
 * @extends {Component}
 */
class BaseComponent extends Component {
  state: Object;
  player: Player;
  name: string;
  config: Object;
  logger: any;

  /**
   * Creates an instance of BaseComponent.
   * @param {Object} [obj={ config: {} }] obj
   * @memberof BaseComponent
   */
  constructor(obj?: Object = {config: {}}) {
    super();
    this.name = obj.name;
    this.player = obj.player;
    this.config = obj.config;
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
   * Notify the store that a changeable component has been clicked.
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
}

export default BaseComponent;
export {BaseComponent};
