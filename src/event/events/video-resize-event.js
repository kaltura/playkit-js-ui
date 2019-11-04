// @flow
import {FakeEvent} from '../fake-event';

/**
 * ActivePresetResizeEvent event
 *
 * @class VideoResizeEvent
 * @extends {FakeEvent}
 */
class VideoResizeEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {{width: number, height: number}} size - The new size.
   */
  constructor(size: {width: number, height: number}) {
    super(FakeEvent.Type.VIDEO_RESIZE);
    this.payload = size;
  }
}

export {VideoResizeEvent};
