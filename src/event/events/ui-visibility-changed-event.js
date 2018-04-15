// @flow
import {FakeEvent} from '../fake-event';

/**
 * UiVisibilityChangedEvent event
 *
 * @class UiVisibilityChangedEvent
 * @extends {FakeEvent}
 */
class UiVisibilityChangedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {boolean} visible - The visible state.
   */
  constructor(visible: boolean) {
    super(FakeEvent.Type.UI_VISIBILITY_CHANGED);
    this.payload = {
      visible: visible
    };
  }
}

export {UiVisibilityChangedEvent};
