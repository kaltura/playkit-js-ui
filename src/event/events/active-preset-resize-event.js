// @flow
import {FakeEvent} from '../fake-event';

/**
 * ActivePresetResizeEvent event
 *
 * @class ActivePresetResizeEvent
 * @extends {FakeEvent}
 */
class ActivePresetResizeEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} volume - The new volume.
   */
  constructor(presetName: string) {
    super(FakeEvent.Type.ACTIVE_PRESET_RESIZE);
    this.payload = {
      presetName
    };
  }
}

export {ActivePresetResizeEvent};
