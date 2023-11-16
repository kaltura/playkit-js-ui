import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

/**
 * AudioSelectedEvent event
 *
 * @class AudioSelectedEvent
 * @extends {FakeEvent}
 */
class AudioSelectedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {Object} audioTrack - The selected audio track.
   */
  constructor(audioTrack: any) {
    super(EventType.USER_SELECTED_AUDIO_TRACK);
    this.payload = {
      audioTrack: audioTrack
    };
  }
}

export {AudioSelectedEvent};
