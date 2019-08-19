// @flow
import {FakeEvent} from '../fake-event';

/**
 * ForwardClickedEvent event
 *
 * @class ForwardClickedEvent
 * @extends {FakeEvent}
 */
class ForwardClickedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} from - The start seek time.
   * @param {number} to - The target seek time.
   */
  constructor(from: number, to: number) {
    super(FakeEvent.Type.USER_CLICKED_FORWARD);
    this.payload = {
      from: from,
      to: to
    };
  }
}

export {ForwardClickedEvent};
