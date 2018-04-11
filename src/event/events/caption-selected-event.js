// @flow
import {FakeEvent} from '../fake-event';

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
  constructor(captionTrack: Object) {
    super(FakeEvent.Type.USER_SELECTED_CAPTION_TRACK);
    this.payload = {
      captionTrack: captionTrack
    };
  }
}

export {CaptionSelectedEvent};
