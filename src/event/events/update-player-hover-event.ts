import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

/**
 * UpdatePlayerHoverEvent event
 *
 * @class UpdatePlayerHoverEvent
 * @extends {FakeEvent}
 */
class UpdatePlayerHoverEvent extends FakeEvent {
  /**
   * @constructor
   *
   */
  constructor() {
    super(EventType.PLAYER_HOVER_STATE_CHANGED);
  }
}

export {UpdatePlayerHoverEvent};
