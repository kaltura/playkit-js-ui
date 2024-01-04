import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

/**
 * SeekedEvent event
 *
 * @class SeekedEvent
 * @extends {FakeEvent}
 */
class SeekedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} from - The start seek time.
   * @param {number} to - The target seek time.
   */
  constructor(from: number, to: number) {
    super(EventType.USER_SEEKED);
    this.payload = {
      from: from,
      to: to
    };
  }
}

export {SeekedEvent};
