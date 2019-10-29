// @flow
import {FakeEvent} from '../fake-event';

/**
 * ActivePresetChangedEvent event
 *
 * @class ActivePresetChangedEvent
 * @extends {FakeEvent}
 */
class ActivePresetChangedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} volume - The new volume.
   */
  constructor(presetName: string) {
    super(FakeEvent.Type.ACTIVE_PRESET_CHANGED);
    this.payload = {
      presetName
    };
  }
}

export {ActivePresetChangedEvent};
