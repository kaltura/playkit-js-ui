//@flow
import {TimelineManager} from './timeline-manager';
import {UIManager} from '../../ui-manager';
import getLogger from '../../utils/logger';
import {EventManager} from 'event/event-manager';

/**
 * @class CuePoint
 */
class Managers {
  static _logger: any;
  _managerRegistry: Map<string, Object> = new Map();
  _eventManager: EventManager;

  /**
   * @constructor
   * @param {UIManager} uiManager - The UI manager.
   * @param {any} store - The store.
   * @param {any} player - The player.
   */
  constructor(uiManager: UIManager, store: any, player: any) {
    Managers._logger = getLogger('Managers');
    this._eventManager = new EventManager();
    this._eventManager.listen(player, player.Event.Core.PLAYER_RESET, () => this.reset());
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
  reset() {
    this._managerRegistry.forEach(manager => typeof manager.reset === 'function' && manager.reset());
  }

  /**
   * @returns {void}
   */
  destroy() {
    this._managerRegistry.forEach(manager => typeof manager.destroy === 'function' && manager.destroy());
    this._eventManager.removeAll();
    this._managerRegistry.clear();
  }
}

export {Managers};
