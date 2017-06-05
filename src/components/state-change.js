//@flow
import BaseComponent from './base';
import PLAYER_EVENTS from '../event/events';

class StateChange extends BaseComponent {
  _playerElement: HTMLElement;

  constructor(obj: IControlParams) {
    super({name: 'StateChange', player: obj.player});

    this._playerElement = document.getElementsByClassName('player')[0];

    this.player.addEventListener(PLAYER_EVENTS.PLAYER_STATE_CHANGED, (e) => {
      if (this._playerElement.classList.contains('state-' + e.payload.oldState.type)) {
        this._playerElement.classList.remove('state-' + e.payload.oldState.type);
      }
      if (!this._playerElement.classList.contains('state-' + e.payload.newState.type)) {
        this._playerElement.classList.add('state-' + e.payload.newState.type);
      }
    });
  }

}

export default StateChange;
