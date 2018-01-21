//@flow
import {Component} from 'preact';
import Player from 'playkit-js';
import getLogger from '../utils/logger';

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
}

export default BaseComponent;
