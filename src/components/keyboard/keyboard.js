//@flow
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {actions as shellActions} from '../../reducers/shell';
import {actions as overlayIconActions} from '../../reducers/overlay-action';
import {bindActions} from '../../utils/bind-actions';
import {KeyMap, getKeyName} from '../../utils/key-map';
import {IconType} from '../icon';
import {CONTROL_BAR_HOVER_DEFAULT_TIMEOUT} from '../shell/shell';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playerNav: state.shell.playerNav,
  isPlaying: state.engine.isPlaying,
  adBreak: state.engine.adBreak,
  adIsPlaying: state.engine.adIsPlaying
});

/**
 * Default seek jump
 * @type {number}
 * @const
 */
export const KEYBOARD_DEFAULT_SEEK_JUMP: number = 5;
/**
 * Default volume jump
 * @type {number}
 * @const
 */
export const KEYBOARD_DEFAULT_VOLUME_JUMP: number = 5;

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
        e.preventDefault();
        this.logger.debug(`KeyDown -> keyName: ${getKeyName(e.keyCode)}, shiftKey: ${e.shiftKey.toString()}`);
        this.keyboardHandlers[e.keyCode](e.shiftKey);
      }
    };
  }

  /**
   * check if currently playing ad or playback
   *
   * @returns {boolean} - if currently playing ad or playback
   * @memberof KeyboardControl
   */
  isPlayingAdOrPlayback(): boolean {
    return (this.props.adBreak && this.props.adIsPlaying) || (!this.props.adBreak && this.props.isPlaying);
  }

  /**
   * handlers for keyboard commands
   * @type {Object} - maps key number to his handler
   *
   * @memberof KeyboardControl
   */
  keyboardHandlers: { [key: number]: Function } = {
    [KeyMap.SPACE]: () => {
      if (this.isPlayingAdOrPlayback()) {
        this.player.pause();
        this.props.updateOverlayActionIcon(IconType.Pause);
      } else {
        this.player.play();
        this.props.updateOverlayActionIcon(IconType.Play);
      }
      this.notifyClick({key: KeyMap.SPACE});
    },
    [KeyMap.UP]: () => {
      const newVolume = (Math.round(this.player.volume * 100) + KEYBOARD_DEFAULT_VOLUME_JUMP) / 100;
      this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
      if (this.player.muted) {
        this.player.muted = false;
      }
      if (newVolume <= 1) {
        this.player.volume = newVolume;
        this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves]);
        this.notifyClick({key: KeyMap.UP});
      }
    },
    [KeyMap.DOWN]: () => {
      const newVolume = (Math.round(this.player.volume * 100) - KEYBOARD_DEFAULT_VOLUME_JUMP) / 100;
      if (newVolume >= 0) {
        this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
        this.player.volume = newVolume;
        if (newVolume === 0) {
          this.player.muted = true;
          this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute]);
        } else {
          this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWave]);
        }
        this.notifyClick({key: KeyMap.DOWN});
      }
    },
    [KeyMap.F]: () => {
      if (!this.player.isFullscreen()) {
        this.logger.debug('Enter fullscreen');
        this.player.enterFullscreen();
        this.notifyClick({key: KeyMap.F});
      }
    },
    [KeyMap.ESC]: () => {
      if (this.player.isFullscreen()) {
        this.logger.debug('Exit fullscreen');
        this.player.exitFullscreen();
        this.notifyClick({key: KeyMap.ESC});
      }
    },
    [KeyMap.LEFT]: () => {
      const newTime = this.player.currentTime - KEYBOARD_DEFAULT_SEEK_JUMP;
      const from = this.player.currentTime;
      const to = (newTime > 0) ? newTime : 0;
      this.logger.debug(`Seek. ${from} => ${to}`);
      this.player.currentTime = to;
      this.props.updateOverlayActionIcon(IconType.Rewind);
      this.toggleHoverState();
      this.notifyClick({key: KeyMap.LEFT, from: from, to: to});
    },
    [KeyMap.RIGHT]: () => {
      const newTime = this.player.currentTime + KEYBOARD_DEFAULT_SEEK_JUMP;
      const from = this.player.currentTime;
      const to = (newTime > this.player.duration) ? this.player.duration : newTime;
      this.logger.debug(`Seek. ${from} => ${to}`);
      this.player.currentTime = (newTime > this.player.duration) ? this.player.duration : newTime;
      this.props.updateOverlayActionIcon(IconType.SeekForward);
      this.toggleHoverState();
      this.notifyClick({key: KeyMap.LEFT, from: from, to: to});
    },
    [KeyMap.HOME]: () => {
      const from = this.player.currentTime;
      const to = 0;
      this.logger.debug(`Seek. ${from} => ${to}`);
      this.player.currentTime = to;
      this.props.updateOverlayActionIcon(IconType.StartOver);
      this.toggleHoverState();
      this.notifyClick({key: KeyMap.LEFT, from: from, to: to});
    },
    [KeyMap.END]: () => {
      const from = this.player.currentTime;
      const to = this.player.duration;
      this.logger.debug(`Seek. ${from} => ${to}`);
      this.player.currentTime = to;
      this.props.updateOverlayActionIcon(IconType.SeekEnd);
      this.toggleHoverState();
      this.notifyClick({key: KeyMap.LEFT, from: from, to: to});
    },
    [KeyMap.M]: () => {
      this.logger.debug(this.player.muted ? 'Umnute' : 'Mute');
      this.player.muted = !this.player.muted;
      this.player.muted ?
        this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute]) :
        this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves]);
      this.notifyClick({key: KeyMap.M});
    },
    [KeyMap.SEMI_COLON]: (shiftKey: boolean) => {
      if (shiftKey && this.player.playbackRate !== this.player.defaultPlaybackRate) {
        this.logger.debug(`Changing playback rate. ${this.player.playbackRate} => ${this.player.defaultPlaybackRate}`);
        this.player.playbackRate = this.player.defaultPlaybackRate;
        this.props.updateOverlayActionIcon(IconType.Speed);
        this.notifyClick({key: KeyMap.SEMI_COLON, speed: this.player.defaultPlaybackRate});
      }
    },
    [KeyMap.PERIOD]: (shiftKey: boolean) => {
      if (shiftKey) {
        const playbackRate = this.player.playbackRate;
        const index = this.player.playbackRates.indexOf(playbackRate);
        if (index < this.player.playbackRates.length - 1) {
          this.logger.debug(`Changing playback rate. ${playbackRate} => ${this.player.playbackRates[index + 1]}`);
          this.player.playbackRate = this.player.playbackRates[index + 1];
          this.notifyClick({key: KeyMap.PERIOD, speed: this.player.playbackRates[index + 1]});
          this.props.updateOverlayActionIcon(IconType.SpeedUp);
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
          this.notifyClick({key: KeyMap.COMMA, speed: this.player.playbackRates[index - 1]});
          this.props.updateOverlayActionIcon(IconType.SpeedDown);
        }
      }
    },
    [KeyMap.C]: () => {
      let activeTextTrack = this.player.getActiveTracks().text;
      if (activeTextTrack.language === 'off' && this._activeTextTrack) {
        this.logger.debug(`Changing text track`, this._activeTextTrack);
        this.player.selectTrack(this._activeTextTrack);
        this.notifyClick({key: KeyMap.C, track: this._activeTextTrack});
        this._activeTextTrack = null;
      } else if (activeTextTrack.language !== 'off' && !this._activeTextTrack) {
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
    }, CONTROL_BAR_HOVER_DEFAULT_TIMEOUT);
  }
}

export {KeyboardControl};
