//@flow
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {actions as shellActions} from '../../reducers/shell';
import {actions as overlayIconActions} from '../../reducers/overlay-action';
import {bindActions} from '../../utils/bind-actions';
import {KeyMap, getKeyName} from '../../utils/key-map';
import {IconType} from '../icon';
import {CONTROL_BAR_HOVER_DEFAULT_TIMEOUT} from '../shell/shell';
import {isPlayingAdOrPlayback} from '../../reducers/getters';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPlayingAdOrPlayback: isPlayingAdOrPlayback(state.engine),
  playerNav: state.shell.playerNav,
  textTracks: state.engine.textTracks
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

@connect(
  mapStateToProps,
  bindActions(Object.assign({}, shellActions, overlayIconActions))
)
/**
 * KeyboardControl component
 *
 * @class KeyboardControl
 * @extends {BaseComponent}
 */
class KeyboardControl extends BaseComponent {
  _lastActiveTextLanguage: string = '';
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
        const payload = this.keyboardHandlers[e.keyCode](e.shiftKey);
        if (payload) {
          this.notifyClick({key: e.keyCode, ...payload});
        }
      }
    };
  }

  /**
   * We update the last language selected here upon trackTracks props change. This is done to make sure we update the
   * last text track lanague upon language menu selection and using the (C) keyboard key.
   * @param {Object} nextProps - the props that will replace the current props
   * @returns {void}
   */
  componentWillReceiveProps(nextProps: Object): void {
    const currActiveTrack = this.props.textTracks.find(track => track.active);
    const nextActiveTrack = nextProps.textTracks.find(track => track.active);
    if (currActiveTrack && currActiveTrack.language !== 'off' && nextActiveTrack && nextActiveTrack.language === 'off') {
      this._lastActiveTextLanguage = currActiveTrack.language;
    } else if (nextActiveTrack && nextActiveTrack.language !== 'off') {
      this._lastActiveTextLanguage = '';
    }
  }

  /**
   * handlers for keyboard commands
   * @type {Object} - maps key number to his handler
   *
   * @memberof KeyboardControl
   */
  keyboardHandlers: {[key: number]: Function} = {
    [KeyMap.SPACE]: () => {
      if (this.props.isPlayingAdOrPlayback) {
        this.player.pause();
        this.props.updateOverlayActionIcon(IconType.Pause);
      } else {
        this.player.play();
        this.props.updateOverlayActionIcon(IconType.Play);
      }
      this.toggleHoverState();
      return true;
    },
    [KeyMap.UP]: () => {
      let newVolume = (Math.round(this.player.volume * 100) + KEYBOARD_DEFAULT_VOLUME_JUMP) / 100;
      newVolume = newVolume > 1 ? 1 : newVolume;
      this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
      if (this.player.muted) {
        this.player.muted = false;
      }
      this.player.volume = newVolume;
      this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves]);
      return {volume: this.player.volume};
    },
    [KeyMap.DOWN]: () => {
      let newVolume = (Math.round(this.player.volume * 100) - KEYBOARD_DEFAULT_VOLUME_JUMP) / 100;
      newVolume = newVolume < 0 ? 0 : newVolume;
      this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
      this.player.volume = newVolume;
      if (newVolume === 0) {
        this.player.muted = true;
        this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute]);
      } else {
        this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWave]);
      }
      return {volume: this.player.volume};
    },
    [KeyMap.F]: () => {
      if (!this.player.isFullscreen()) {
        this.logger.debug('Enter fullscreen');
        this.player.enterFullscreen();
        return true;
      }
    },
    [KeyMap.ESC]: () => {
      if (this.player.isFullscreen()) {
        this.logger.debug('Exit fullscreen');
        this.player.exitFullscreen();
        return true;
      }
    },
    [KeyMap.LEFT]: () => {
      if (!(this.player.ads && this.player.ads.isAdBreak())) {
        const newTime = this.player.currentTime - KEYBOARD_DEFAULT_SEEK_JUMP;
        const from = this.player.currentTime;
        const to = newTime > 0 ? newTime : 0;
        this.logger.debug(`Seek. ${from} => ${to}`);
        this.player.currentTime = to;
        this.props.updateOverlayActionIcon(IconType.Rewind);
        this.toggleHoverState();
        return {from: from, to: to};
      }
    },
    [KeyMap.RIGHT]: () => {
      if (!(this.player.ads && this.player.ads.isAdBreak())) {
        const newTime = this.player.currentTime + KEYBOARD_DEFAULT_SEEK_JUMP;
        const from = this.player.currentTime;
        const to = newTime > this.player.duration ? this.player.duration : newTime;
        this.logger.debug(`Seek. ${from} => ${to}`);
        this.player.currentTime = newTime > this.player.duration ? this.player.duration : newTime;
        this.props.updateOverlayActionIcon(IconType.SeekForward);
        this.toggleHoverState();
        return {from: from, to: to};
      }
    },
    [KeyMap.HOME]: () => {
      if (!(this.player.ads && this.player.ads.isAdBreak())) {
        const from = this.player.currentTime;
        const to = 0;
        this.logger.debug(`Seek. ${from} => ${to}`);
        this.player.currentTime = to;
        this.props.updateOverlayActionIcon(IconType.StartOver);
        this.toggleHoverState();
        return {from: from, to: to};
      }
    },
    [KeyMap.END]: () => {
      if (!(this.player.ads && this.player.ads.isAdBreak())) {
        const from = this.player.currentTime;
        const to = this.player.duration;
        this.logger.debug(`Seek. ${from} => ${to}`);
        this.player.currentTime = to;
        this.props.updateOverlayActionIcon(IconType.SeekEnd);
        this.toggleHoverState();
        return {from: from, to: to};
      }
    },
    [KeyMap.M]: () => {
      this.logger.debug(this.player.muted ? 'Umnute' : 'Mute');
      this.player.muted = !this.player.muted;
      this.player.muted
        ? this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute])
        : this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves]);
      return true;
    },
    [KeyMap.SEMI_COLON]: (shiftKey: boolean) => {
      if (shiftKey && this.player.playbackRate !== this.player.defaultPlaybackRate) {
        this.logger.debug(`Changing playback rate. ${this.player.playbackRate} => ${this.player.defaultPlaybackRate}`);
        this.player.playbackRate = this.player.defaultPlaybackRate;
        this.props.updateOverlayActionIcon(IconType.Speed);
        return {speed: this.player.defaultPlaybackRate};
      }
    },
    [KeyMap.PERIOD]: (shiftKey: boolean) => {
      if (shiftKey) {
        const playbackRate = this.player.playbackRate;
        const index = this.player.playbackRates.indexOf(playbackRate);
        if (index < this.player.playbackRates.length - 1) {
          this.logger.debug(`Changing playback rate. ${playbackRate} => ${this.player.playbackRates[index + 1]}`);
          this.player.playbackRate = this.player.playbackRates[index + 1];
          this.props.updateOverlayActionIcon(IconType.SpeedUp);
          return {speed: this.player.playbackRates[index + 1]};
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
          this.props.updateOverlayActionIcon(IconType.SpeedDown);
          return {speed: this.player.playbackRates[index - 1]};
        }
      }
    },
    [KeyMap.C]: () => {
      let activeTextTrack = this.player.getActiveTracks().text;
      if (activeTextTrack.language === 'off' && this._lastActiveTextLanguage) {
        this.logger.debug(`Changing text track to language`, this._lastActiveTextLanguage);
        const selectedTextTrack = this.player.getTracks('text').find(track => track.language === this._lastActiveTextLanguage);
        this.player.selectTrack(selectedTextTrack);
        return {track: selectedTextTrack};
      } else if (activeTextTrack.language !== 'off' && !this._lastActiveTextLanguage) {
        this.logger.debug(`Hiding text track`);
        this._lastActiveTextLanguage = activeTextTrack.language;
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
