//@flow
import BaseComponent from '../base';
/**
 * KeyboardControl component
 *
 * @class KeyboardControl
 * @extends {BaseComponent}
 */
class KeyboardControl extends BaseComponent {

  /**
   * Creates an instance of KeyboardControl.
   * @param {Object} obj obj
   * @memberof KeyboardControl
   */
  constructor(obj: Object) {
    super({name: 'Keyboard', player: obj.player});

    this.player.getView().parentElement.onkeydown = (e) => {
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

  /**
   * disable keyboard commands when control button is on focus to prevent
   * double function execution.
   *
   * @returns {void}
   * @memberof KeyboardControl
   */
  disableKeyboardCommandsOnControls(): void {
    let controlButtonsElements = Array.from(document.getElementsByClassName('control-button'));
    controlButtonsElements.forEach((element) => {
      element.onkeydown = (e) => e.preventDefault();
    });
  }
}

export default KeyboardControl;
