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
    super({name: 'Keyboard', player: obj.player, config: obj.config});

    let playerContainer: HTMLElement | null = document.getElementById(this.config.targetId);

    if (!playerContainer) {
      return;
    }

    /*playerContainer.onkeydown = (e) => {
      let time, newVolume;
      switch (e.which) {
        default:
          return;
      }
    };*/

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
