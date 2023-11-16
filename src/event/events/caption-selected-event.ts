import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

/**
 * CaptionSelectedEvent event
 *
 * @class CaptionSelectedEvent
 * @extends {FakeEvent}
 */
class CaptionSelectedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {Object} captionTrack - The selected caption track.
   */
  constructor(captionTrack: any) {
    super(EventType.USER_SELECTED_CAPTION_TRACK);
    this.payload = {
      captionTrack: captionTrack
    };
  }
}

export {CaptionSelectedEvent};
