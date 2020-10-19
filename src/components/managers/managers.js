//@flow
import {TimelineManager} from './timeline-manager';
import {UIManager} from '../../index';
import getLogger from '../../utils/logger';

/**
 * @class CuePoint
 */
class Managers {
  static _logger: any;
  _managerRegistry: Map<(name: string) => Object | null> = new Map();

  /**
   * @constructor
   * @param {UIManager} uiManager - The UI manager.
   * @param {any} store - The store.
   */
  constructor(uiManager: UIManager, store: any) {
    Managers._logger = getLogger('Managers');
    this.registerManager('timeline', new TimelineManager(uiManager, store));
  }

  /**
   * @param {string} name - the manager name
   * @param {Object} manager - the manager object
   * @returns {void}
   */
  registerManager(name: string, manager: Object): void {
    if (this._managerRegistry.has(name)) {
      Managers._logger.debug(`${name} manager already exists`);
    } else {
      this._managerRegistry.set(name, manager);
      Managers._logger.debug(`${name} manager registered`);
    }
  }

  /**
   *
   * @param {string} name - the manager name
   * @returns {Object} - the manager object
   */
  getManager(name: string): Object | void {
    return this._managerRegistry.get(name);
  }

  /**
   *
   * @param {string} name - the manager name
   * @returns {boolean} - if the manager exist
   */
  hasManager(name: string): boolean {
    return this._managerRegistry.has(name);
  }

  /**
   * @returns {void}
   */
  destroy() {
    this._managerRegistry.forEach((name, manager) => typeof manager.destroy === 'function' && manager.destroy());
    this._managerRegistry.clear();
  }
}

export {Managers};
