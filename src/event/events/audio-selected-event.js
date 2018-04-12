// @flow
import {FakeEvent} from '../fake-event';

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
  constructor(audioTrack: Object) {
    super(FakeEvent.Type.USER_SELECTED_AUDIO_TRACK);
    this.payload = {
      audioTrack: audioTrack
    };
  }
}

export {AudioSelectedEvent};
