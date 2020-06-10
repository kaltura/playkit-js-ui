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
   * @param {number} videoSize - The new volume.
   */
  constructor(videoSize: string) {
    super(FakeEvent.Type.VIDEO_RESIZE);
    this.payload = {
      videoSize
    };
  }
}

export {VideoResizeEvent};
