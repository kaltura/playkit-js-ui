import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

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
    super(EventType.VIDEO_RESIZE);
    this.payload = {
      videoSize
    };
  }
}

export {VideoResizeEvent};
