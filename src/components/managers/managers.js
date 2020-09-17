//@flow
import {TimelineManager} from './timeline-manager';
import {UIManager} from '../../index';

/**
 * @class CuePoint
 */
class Managers {
  _timeline: TimelineManager;

  /**
   * @constructor
   * @param {UIManager} uiManager - The UI manager.
   * @param {any} store - The store.
   */
  constructor(uiManager: UIManager, store: any) {
    this._timeline = new TimelineManager(uiManager, store);
  }

  /**
   * @returns {TimelineManager} - The timeline manager
   */
  get timeline(): TimelineManager {
    return this._timeline;
  }

  /**
   * @returns {void}
   */
  destroy() {
    this._timeline.destroy();
  }
}

export {Managers};
