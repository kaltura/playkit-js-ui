//@flow
import BaseComponent from './base';

class KeyboardControl extends BaseComponent {
  // _playerElement: HTMLElement;

  constructor(obj: IControlParams) {
    super({name: 'Keyboard', player: obj.player});

    // this._playerElement = document.getElementsByClassName('player')[0];

    document.body.onkeydown = (e) => {
      let time, newVolume;
      switch(e.which) {
        case 32: // space
        this.logger.debug("Keydown space");
        this.player.paused ? this.player.play() : this.player.pause();
        break;

        case 38: // up
        this.logger.debug("Keydown up");
        newVolume = Math.round(this.player.volume * 100) + 5;
        this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
        if (this.player.muted) {
          this.player.muted = false;
        }
        this.player.volume = newVolume / 100;
        break;

        case 40: // down
        this.logger.debug("Keydown down");
        newVolume = Math.round(this.player.volume * 100) - 5;
        if (newVolume < 5) {
          this.player.muted = true;
          return;
        }
        this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
        this.player.volume = newVolume / 100;
        break;

        case 37: // left
        this.logger.debug("Keydown left");
        time = (this.player.currentTime - 5) > 0 ? this.player.currentTime - 5 : 0;
        this.player.currentTime = time;
        break;

        case 39: // right
        this.logger.debug("Keydown right");
        time = (this.player.currentTime + 5) > this.player.duration ? this.player.duration : this.player.currentTime + 5;
        this.player.currentTime = time;
        break;

        default: return;
      }
    }

    this.disableKeyboardCommandsOnControls();
  }

  disableKeyboardCommandsOnControls() {
    let controlButtonsElements = Array.from(document.getElementsByClassName('control-button'));
    controlButtonsElements.forEach((element) => {
      element.onkeydown = (e) => e.preventDefault();
    });
  }
}

export default KeyboardControl;
