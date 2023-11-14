// @flow
import {FakeEvent} from '../fake-event';

/**
 * PlayerResizeEvent event
 *
 * @class PlayerResizeEvent
 * @extends {FakeEvent}
 */
class PlayerResizeEvent extends FakeEvent {
  /**
   * @constructor
   *
   * @param {number} playerSize - The new volume.
   */
  constructor(playerSize: string) {
    super(FakeEvent.Type.PLAYER_RESIZE);
    this.payload = {
      playerSize
    };
  }
}

export {PlayerResizeEvent};
