import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

/**
 * SpeedSelectedEvent event
 *
 * @class SpeedSelectedEvent
 * @extends {FakeEvent}
 */
class SpeedSelectedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} speed - The selected speed.
   */
  constructor(speed: number) {
    super(EventType.USER_SELECTED_SPEED);
    this.payload = {
      speed: speed
    };
  }
}

export {SpeedSelectedEvent};
