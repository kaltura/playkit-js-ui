//@flow
import { Component } from 'preact';
import Player from 'playkit-js';
import LoggerFactory from '../utils/logger';

class BaseComponent extends Component {
  state: Object;
  player: Player;
  name: string;
  config: Object;
  logger: any;

  constructor(obj?: Object = { config: {} }) {
    super();

    this.name = obj.name;
    this.player = obj.player;
    this.config = obj.config;
    this.logger = LoggerFactory.getLogger(`UI ${this.name}`);
    this.logger.debug(`Initialized`);
  }

  getConfig(attr?: string): any {
    if (attr) {
      return this.config[attr];
    }
    return this.config;
  }

  get defaultConfig(): Object {
    return {}
  }
}

export default BaseComponent;
