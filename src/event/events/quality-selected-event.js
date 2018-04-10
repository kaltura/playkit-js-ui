// @flow
import {FakeEvent} from '../fake-event';

/**
 * QualitySelectedEvent event
 *
 * @class QualitySelectedEvent
 * @extends {FakeEvent}
 */
class QualitySelectedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {Object} quality - The selected quality track.
   */
  constructor(quality: Object) {
    super(FakeEvent.Type.USER_SELECTED_QUALITY);
    this.payload = {
      quality: quality
    };
  }
}

export {QualitySelectedEvent};
