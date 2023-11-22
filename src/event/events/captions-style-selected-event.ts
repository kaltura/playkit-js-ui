import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../event-type';


/**
 * CaptionsStyleSelectedEvent event
 *
 * @class CaptionsStyleSelectedEvent
 * @extends {FakeEvent}
 */
class CaptionsStyleSelectedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {Object} captionsStyle - The selected captoons style.
   */
  constructor(captionsStyle: any) {
    super(EventType.USER_SELECTED_CAPTIONS_STYLE);
    this.payload = {
      captionsStyle: captionsStyle
    };
  }
}

export {CaptionsStyleSelectedEvent};
