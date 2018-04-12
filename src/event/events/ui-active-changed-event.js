// @flow
import {FakeEvent} from '../fake-event';

/**
 * UIActiveStateChangedEvent event
 *
 * @class UIActiveStateChangedEvent
 * @extends {FakeEvent}
 */
class UIActiveStateChangedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {boolean} isActive - The active state.
   */
  constructor(isActive: boolean) {
    super(FakeEvent.Type.UI_ACTIVE_STATE_CHANGED);
    this.payload = {
      isActive: isActive
    };
  }
}

export {UIActiveStateChangedEvent};
