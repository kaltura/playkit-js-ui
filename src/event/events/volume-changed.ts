import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

/**
 * VolumeChangedEvent event
 *
 * @class VolumeChangedEvent
 * @extends {FakeEvent}
 */
class VolumeChangedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} volume - The new volume.
   */
  constructor(volume: number) {
    super(EventType.USER_CHANGED_VOLUME);
    this.payload = {
      volume: volume
    };
  }
}

export {VolumeChangedEvent};
