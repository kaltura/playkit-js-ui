// @flow
import {FakeEvent} from '../fake-event';

/**
 * ActivePresetResizeEvent event
 *
 * @class UIPresetResizeEvent
 * @extends {FakeEvent}
 */
class UIPresetResizeEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} presetSize - The new volume.
   */
  constructor(presetSize: string) {
    super(FakeEvent.Type.UI_PRESET_RESIZE);
    this.payload = {
      presetSize
    };
  }
}

export {UIPresetResizeEvent};
