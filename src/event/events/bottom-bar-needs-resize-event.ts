import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

/**
 * BottomBarClientRectEvent event
 *
 * @class BottomBarClientRectEvent
 * @extends {FakeEvent}
 */
class BottomBarNeedsResizeEvent extends FakeEvent {
  /**
   * @constructor
   *
   */
  constructor() {
    super(EventType.BOTTOM_BAR_NEEDS_RESIZE);
  }
}

export {BottomBarNeedsResizeEvent};
