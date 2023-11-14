// @flow
import {FakeEvent} from '../fake-event';

/**
 * GuiResizeEvent event
 *
 * @class GuiResizeEvent
 * @extends {FakeEvent}
 */
class GuiResizeEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} guiSize - The new volume.
   */
  constructor(guiSize: string) {
    super(FakeEvent.Type.GUI_RESIZE);
    this.payload = {
      guiSize
    };
  }
}

export {GuiResizeEvent};
