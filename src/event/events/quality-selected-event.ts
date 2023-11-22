import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';

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
   * @param {Object} qualityTrack - The selected quality track.
   */
  constructor(qualityTrack: any) {
    super(EventType.USER_SELECTED_QUALITY_TRACK);
    this.payload = {
      qualityTrack: qualityTrack
    };
  }
}

export {QualitySelectedEvent};
