import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

/**
 * RewindClickedEvent event
 *
 * @class RewindClickedEvent
 * @extends {FakeEvent}
 */
class RewindClickedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} from - The start seek time.
   * @param {number} to - The target seek time.
   */
  constructor(from: number, to: number) {
    super(EventType.USER_CLICKED_REWIND);
    this.payload = {
      from: from,
      to: to
    };
  }
}

export {RewindClickedEvent};
