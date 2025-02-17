import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

/**
 * BottomBarClientRectEvent event
 *
 * @class BottomBarClientRectEvent
 * @extends {FakeEvent}
 */
class BottomBarClientRectEvent extends FakeEvent {
  /**
   * @constructor
   *
   */
  constructor() {
    super(EventType.BOTTOM_BAR_CLIENT_RECT_CHANGED);
  }
}

export {BottomBarClientRectEvent};
