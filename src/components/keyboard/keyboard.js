//@flow
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {actions as shellActions} from '../../reducers/shell';
import {actions as overlayIconActions} from '../../reducers/overlay-action';
import {bindActions} from '../../utils/bind-actions';
import {KeyMap} from "../../utils/key-map";
import {IconType} from '../icon';
import {DEFAULT_CONTROL_BAR_HOVER_TIMEOUT} from "../shell/shell";

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

@connect(mapStateToProps, bindActions(Object.assign(shellActions, overlayIconActions)))
  /**
   * KeyboardControl component
   *
   * @class KeyboardControl
   * @extends {BaseComponent}
   */
class KeyboardControl extends BaseComponent {
  _activeTextTrack: ?Object = null;
  _hoverTimeout: ?number = null;

  /**
   * creates an instance of KeyboardControl
   *
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
        this.keyboardHandlers[e.keyCode](e.shiftKey);
      }
    };
  }

  /**
   * handlers for keyboard commands
   * @type {Object} - maps key number to his handler
   *
   * @memberof KeyboardControl
   */
  keyboardHandlers: { [key: number]: Function } = {
    [KeyMap.SPACE]: () => {
      if (this.player.paused) {
        this.player.play();
        this.props.updateOverlayActionIcon(IconType.Play);
      } else {
        this.player.pause();
        this.props.updateOverlayActionIcon(IconType.Pause);
      }
    },
    [KeyMap.UP]: () => {
      if (this.player.volume === 1) return;
      const newVolume = (Math.round(this.player.volume * 100) + VOLUME_JUMP) / 100;
      this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
      if (this.player.muted) {
        this.player.muted = false;
      }
      this.player.volume = newVolume;
      this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves]);
    },
    [KeyMap.DOWN]: () => {
      if (this.player.muted || this.player.volume === 0) return;
      const newVolume = (Math.round(this.player.volume * 100) - VOLUME_JUMP) / 100;
      if (newVolume === 0) {
        this.player.muted = true;
        this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute]);
        return;
      }
      this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
      this.player.volume = newVolume;
      this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWave]);
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
      this.toggleHoverState();
    },
    [KeyMap.RIGHT]: () => {
      const newTime = this.player.currentTime + SEEK_JUMP;
      this.logger.debug(`Seek. ${this.player.currentTime} => ${(newTime > this.player.duration) ? this.player.duration : newTime}`);
      this.player.currentTime = (newTime > this.player.duration) ? this.player.duration : newTime;
      this.toggleHoverState();
    },
    [KeyMap.HOME]: () => {
      this.logger.debug(`Seek. ${this.player.currentTime} => 0`);
      this.player.currentTime = 0;
      this.toggleHoverState();
    },
    [KeyMap.END]: () => {
      this.logger.debug(`Seek. ${this.player.currentTime} => ${this.player.duration}`);
      this.player.currentTime = this.player.duration;
      this.toggleHoverState();
    },
    [KeyMap.M]: () => {
      this.logger.debug(this.player.muted ? "Umnute" : "Mute");
      this.player.muted = !this.player.muted;
      this.player.muted ?
        this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute]) :
        this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves]);
    },
    [KeyMap.ADD]: (shiftKey) => {
      if (shiftKey) {
        this.logger.debug(`Changing playback rate. ${this.player.playbackRate} => ${this.player.defaultPlaybackRate}`);
        this.player.playbackRate = this.player.defaultPlaybackRate;
        this.props.updateOverlayActionIcon(IconType.Speed);
      } else {
        const playbackRate = this.player.playbackRate;
        const index = this.player.playbackRates.indexOf(playbackRate);
        if (index < this.player.playbackRates.length - 1) {
          this.logger.debug(`Changing playback rate. ${playbackRate} => ${this.player.playbackRates[index + 1]}`);
          this.player.playbackRate = this.player.playbackRates[index + 1];
          this.props.updateOverlayActionIcon(IconType.SpeedUp);
        }
      }
    },
    [KeyMap.SUBTRACT]: () => {
      const playbackRate = this.player.playbackRate;
      const index = this.player.playbackRates.indexOf(playbackRate);
      if (index > 0) {
        this.logger.debug(`Changing playback rate. ${playbackRate} => ${this.player.playbackRates[index - 1]}`);
        this.player.playbackRate = this.player.playbackRates[index - 1];
        this.props.updateOverlayActionIcon(IconType.SpeedDown);
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

  /**
   * toggles the shell hover state
   *
   * @returns {void}
   * @memberof KeyboardControl
   */
  toggleHoverState(): void {
    if (this._hoverTimeout !== null) {
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = null;
    }
    this.props.updatePlayerHoverState(true);
    this._hoverTimeout = setTimeout(() => {
      this.props.updatePlayerHoverState(false);
    }, DEFAULT_CONTROL_BAR_HOVER_TIMEOUT);
  }
}

export default KeyboardControl;
