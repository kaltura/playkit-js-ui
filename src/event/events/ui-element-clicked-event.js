// @flow
import {FakeEvent} from '../fake-event';

/**
 * UIElementClickedEvent event
 *
 * @class UIElementClickedEvent
 * @extends {FakeEvent}
 */
class UIElementClickedEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {string} element - The element name
   */
  constructor(element: string) {
    super(FakeEvent.Type.UI_ELEMENT_CLICKED);
    this.payload = {
      element
    };
  }
}

export {UIElementClickedEvent};
