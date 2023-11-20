import {Component, RenderableProps, ComponentChild} from 'preact';
import getLogger from '../utils/logger';
import {types} from '../middlewares/event-dispatcher';
import {EventManager} from '@playkit-js/playkit-js';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';

/**
 * Base component to be extended by other player UI components
 *
 * @class BaseComponent
 * @extends {Component}
 */
class BaseComponent extends Component<any, any> {
  player: KalturaPlayer;
  name: string;
  config: Object;
  logger: any;
  eventManager: EventManager;

  /**
   * Components default props.
   * @type {Object}
   * @static
   */
  static defaultProps: any = {};

  /**
   * Creates an instance of BaseComponent.
   * @param {Object} [obj={ config: {} }] obj
   * @memberof BaseComponent
   */
  constructor(obj: any = {config: {}}) {
    super();
    this.name = obj.name;
    this.config = obj.config;
    this.player = obj.player;
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

  render(props?: RenderableProps<any>, state?: Readonly<any>, context?: any): ComponentChild {
    return undefined;
  }
}

export default BaseComponent;
export {BaseComponent};
