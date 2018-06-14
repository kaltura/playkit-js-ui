// @flow
import {FakeEvent} from '../fake-event';

/**
 * PointerDownEvent event
 *
 * @class PointerDownEvent
 * @extends {FakeEvent}
 */
class PointerDownEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {Object} coordinates - The pointer down coordinates.
   */
  constructor(coordinates: Object) {
    super(FakeEvent.Type.USER_POINTER_DOWN);
    this.payload = {
      x: coordinates.x,
      y: coordinates.y
    };
  }
}

export {PointerDownEvent};
