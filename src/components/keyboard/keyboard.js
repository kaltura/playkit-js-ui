//@flow
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {actions} from '../../reducers/shell';
import {bindActions} from '../../utils/bind-actions';
import {KeyMap, getKeyName} from "../../utils/key-map";

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playerNav: state.shell.playerNav
});

const SEEK_JUMP: number = 5;
const VOLUME_JUMP: number = 5;

@connect(mapStateToProps, bindActions(actions))
  /**
   * KeyboardControl component
   *
   * @class KeyboardControl
   * @extends {BaseComponent}
   */
class KeyboardControl extends BaseComponent {
  _activeTextTrack: ?Object = null;

  /**
   * Creates an instance of KeyboardControl.
   * @param {Object} obj obj
   * @memberof KeyboardControl
   */
  constructor(obj: Object) {
    super({name: 'Keyboard', player: obj.player, config: obj.config});
    const playerContainer: HTMLElement | null = document.getElementById(this.config.targetId);
    if (!playerContainer) {
      return;
    }
    playerContainer.onkeydown = (e: KeyboardEvent) => {
      if (!this.props.playerNav && typeof this.keyboardHandlers[e.keyCode] === 'function') {
        this.logger.debug(`KeyDown -> keyName: ${getKeyName(e.keyCode)}, shiftKey: ${e.shiftKey.toString()}`);
        this.keyboardHandlers[e.keyCode](e.shiftKey);
      }
    };
  }

  /**
   * Handlers for keyboard commands
   * @type { Object } - Maps key number to his handler
   * @memberof KeyboardControl
   */
  keyboardHandlers: { [key: number]: Function } = {
    [KeyMap.SPACE]: () => {
      this.player.paused ? this.player.play() : this.player.pause();
    },
    [KeyMap.UP]: () => {
      const newVolume = Math.round(this.player.volume * 100) + VOLUME_JUMP;
      this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
      if (this.player.muted) {
        this.player.muted = false;
      }
      this.player.volume = newVolume / 100;
    },
    [KeyMap.DOWN]: () => {
      const newVolume = Math.round(this.player.volume * 100) - VOLUME_JUMP;
      if (newVolume < 5) {
        this.player.muted = true;
        return;
      }
      this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
      this.player.volume = newVolume / 100;
    },
    [KeyMap.F]: () => {
      if (!this.player.isFullscreen()) {
        this.logger.debug("Enter fullscreen");
        this.player.enterFullscreen();
      }
    },
    [KeyMap.ESC]: () => {
      if (this.player.isFullscreen()) {
        this.logger.debug("Exit fullscreen");
        this.player.exitFullscreen();
      }
    },
    [KeyMap.LEFT]: () => {
      const newTime = this.player.currentTime - SEEK_JUMP;
      this.logger.debug(`Seek. ${this.player.currentTime} => ${(newTime > 0) ? newTime : 0}`);
      this.player.currentTime = (newTime > 0) ? newTime : 0;
    },
    [KeyMap.RIGHT]: () => {
      const newTime = this.player.currentTime + SEEK_JUMP;
      this.logger.debug(`Seek. ${this.player.currentTime} => ${(newTime > this.player.duration) ? this.player.duration : newTime}`);
      this.player.currentTime = (newTime > this.player.duration) ? this.player.duration : newTime;
    },
    [KeyMap.HOME]: () => {
      this.logger.debug(`Seek. ${this.player.currentTime} => 0`);
      this.player.currentTime = 0;
    },
    [KeyMap.END]: () => {
      this.logger.debug(`Seek. ${this.player.currentTime} => ${this.player.duration}`);
      this.player.currentTime = this.player.duration;
    },
    [KeyMap.M]: () => {
      this.logger.debug(this.player.muted ? "Umnute" : "Mute");
      this.player.muted = !this.player.muted;
    },
    [KeyMap.SEMI_COLON]: (shiftKey: boolean) => {
      if (shiftKey) {
        this.logger.debug(`Changing playback rate. ${this.player.playbackRate} => ${this.player.defaultPlaybackRate}`);
        this.player.playbackRate = this.player.defaultPlaybackRate;
      }
    },
    [KeyMap.PERIOD]: (shiftKey: boolean) => {
      if (shiftKey) {
        const playbackRate = this.player.playbackRate;
        const index = this.player.playbackRates.indexOf(playbackRate);
        if (index < this.player.playbackRates.length - 1) {
          this.logger.debug(`Changing playback rate. ${playbackRate} => ${this.player.playbackRates[index + 1]}`);
          this.player.playbackRate = this.player.playbackRates[index + 1];
        }
      }
    },
    [KeyMap.COMMA]: (shiftKey: boolean) => {
      if (shiftKey) {
        const playbackRate = this.player.playbackRate;
        const index = this.player.playbackRates.indexOf(playbackRate);
        if (index > 0) {
          this.logger.debug(`Changing playback rate. ${playbackRate} => ${this.player.playbackRates[index - 1]}`);
          this.player.playbackRate = this.player.playbackRates[index - 1];
        }
      }
    },
    [KeyMap.C]: () => {
      let activeTextTrack = this.player.getActiveTracks().text;
      if (activeTextTrack.language === "off" && this._activeTextTrack) {
        this.logger.debug(`Changing text track`, this._activeTextTrack);
        this.player.selectTrack(this._activeTextTrack);
        this._activeTextTrack = null;
      } else if (activeTextTrack.language !== "off" && !this._activeTextTrack) {
        this.logger.debug(`Hiding text track`);
        this._activeTextTrack = activeTextTrack;
        this.player.hideTextTrack();
      }
    }
  };
}

export default KeyboardControl;
