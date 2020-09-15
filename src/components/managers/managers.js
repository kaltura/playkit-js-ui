//@flow
import {TimelineManager} from './timeline-manager';
import {UIManager} from '../../index';

class Managers {
  _timeline: TimelineManager;
  constructor(uiManager: UIManager, store: any) {
    this._timeline = new TimelineManager(uiManager, store);
  }

  get timeline(): TimelineManager {
    return this._timeline;
  }

  destroy() {
    this._timeline.destroy();
  }
}

export {Managers};
