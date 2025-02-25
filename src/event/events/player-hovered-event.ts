import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

/**
 * PlayerHoveredEvent event
 *
 * @class PlayerHoveredEvent
 * @extends {FakeEvent}
 */
class PlayerHoveredEvent extends FakeEvent {
  /**
   * @constructor
   *
   */
  constructor() {
    super(EventType.PLAYER_HOVERED);
  }
}

export {PlayerHoveredEvent};
