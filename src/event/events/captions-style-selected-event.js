// @flow
import {FakeEvent} from '../fake-event';

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
  constructor(captionsStyle: Object) {
    super(FakeEvent.Type.USER_SELECTED_CAPTIONS_STYLE);
    this.payload = {
      captionsStyle: captionsStyle
    };
  }
}

export {CaptionsStyleSelectedEvent};
