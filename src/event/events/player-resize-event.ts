import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

/**
 * PlayerResizeEvent event
 *
 * @class PlayerResizeEvent
 * @extends {FakeEvent}
 */
class PlayerResizeEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} playerSize - The new volume.
   */
  constructor(playerSize: string) {
    super(EventType.PLAYER_RESIZE);
    this.payload = {
      playerSize
    };
  }
}

export {PlayerResizeEvent};
