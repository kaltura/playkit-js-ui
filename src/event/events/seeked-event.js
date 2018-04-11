// @flow
import {FakeEvent} from '../fake-event';

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
    super(FakeEvent.Type.USER_SEEKED);
    this.payload = {
      from: from,
      to: to
    };
  }
}

export {SeekedEvent};
