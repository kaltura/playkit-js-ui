import {FakeEvent} from '../fake-event';

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
    super(FakeEvent.Type.USER_SELECTED_SPEED);
    this.payload = {
      speed: speed
    };
  }
}

export {SpeedSelectedEvent};
