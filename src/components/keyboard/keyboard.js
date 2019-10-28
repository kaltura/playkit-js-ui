//@flow
import {Component} from 'preact';
import {connect} from 'preact-redux';
import {actions as shellActions} from '../../reducers/shell';
import {actions as overlayIconActions} from '../../reducers/overlay-action';
import {bindActions} from '../../utils/bind-actions';
import {KeyMap, getKeyName} from '../../utils/key-map';
import {IconType} from '../icon';
import {CONTROL_BAR_HOVER_DEFAULT_TIMEOUT} from '../shell/shell';
import {isPlayingAdOrPlayback} from '../../reducers/getters';
import {withPlayer} from '../player';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPlayingAdOrPlayback: isPlayingAdOrPlayback(state.engine),
  playerNav: state.shell.playerNav,
  textTracks: state.engine.textTracks,
  shareOverlay: state.share.overlayOpen
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

const COMPONENT_NAME = 'Keyboard';

@connect(
  mapStateToProps,
  bindActions(Object.assign({}, shellActions, overlayIconActions))
)
@withPlayer
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
/**
 * Keyboard component
 *
 * @class Keyboard
 * @extends {Component}
 */
class Keyboard extends Component {
  _lastActiveTextLanguage: string = '';
  _hoverTimeout: ?number = null;

  /**
   * creates an instance of Keyboard
   *
   * @param {Object} obj obj
   * @memberof Keyboard
   */
  constructor(obj: Object) {
    super();
    const playerContainer: HTMLElement | null = document.getElementById(obj.config.targetId);
    if (!playerContainer) {
      return;
    }
    playerContainer.onkeydown = (e: KeyboardEvent) => {
      if (!this.props.shareOverlay && !this.props.playerNav && typeof this.keyboardHandlers[e.keyCode] === 'function') {
        this.props.logger.debug(`KeyDown -> keyName: ${getKeyName(e.keyCode)}, shiftKey: ${e.shiftKey.toString()}`);
        const {preventDefault, payload} = this.keyboardHandlers[e.keyCode](e);
        if (preventDefault) {
          e.preventDefault();
        }
        if (payload) {
          this.props.notifyClick({key: e.keyCode, ...payload});
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
   * @memberof Keyboard
   */
  keyboardHandlers: {[key: number]: (event: KeyboardEvent) => {preventDefault: boolean, payload: any}} = {
    [KeyMap.SPACE]: (): {preventDefault: boolean, payload: any} => {
      if (this.props.isPlayingAdOrPlayback) {
        this.props.player.pause();
        this.props.updateOverlayActionIcon(IconType.Pause);
      } else {
        this.props.player.play();
        this.props.updateOverlayActionIcon(IconType.Play);
      }
      this.toggleHoverState();
      return {preventDefault: true, payload: true};
    },
    [KeyMap.UP]: (): {preventDefault: boolean, payload: any} => {
      let newVolume = (Math.round(this.props.player.volume * 100) + KEYBOARD_DEFAULT_VOLUME_JUMP) / 100;
      newVolume = newVolume > 1 ? 1 : newVolume;
      this.props.logger.debug(`Changing volume. ${this.props.player.volume} => ${newVolume}`);
      if (this.props.player.muted) {
        this.props.player.muted = false;
      }
      this.props.player.volume = newVolume;
      this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves]);
      return {preventDefault: true, payload: {volume: this.props.player.volume}};
    },
    [KeyMap.DOWN]: (): {preventDefault: boolean, payload: any} => {
      let newVolume = (Math.round(this.props.player.volume * 100) - KEYBOARD_DEFAULT_VOLUME_JUMP) / 100;
      newVolume = newVolume < 0 ? 0 : newVolume;
      this.props.logger.debug(`Changing volume. ${this.props.player.volume} => ${newVolume}`);
      this.props.player.volume = newVolume;
      if (newVolume === 0) {
        this.props.player.muted = true;
        this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute]);
      } else {
        this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWave]);
      }
      return {preventDefault: true, payload: {volume: this.props.player.volume}};
    },
    [KeyMap.F]: (): {preventDefault: boolean, payload: any} => {
      if (!this.props.player.isFullscreen()) {
        this.props.logger.debug('Enter fullscreen');
        this.props.player.enterFullscreen();
        return {preventDefault: true, payload: true};
      }
      return {preventDefault: true, payload: null};
    },
    [KeyMap.P]: (): {preventDefault: boolean, payload: any} => {
      if (!this.props.player.isInPictureInPicture()) {
        this.props.logger.debug('Enter Picture In Picture');
        this.props.player.enterPictureInPicture();
      } else {
        this.props.logger.debug('Exit Picture In Picture');
        this.props.player.exitPictureInPicture();
      }
      this.toggleHoverState();
      return {preventDefault: true, payload: true};
    },
    [KeyMap.ESC]: (): {preventDefault: boolean, payload: any} => {
      if (this.props.player.isFullscreen()) {
        this.props.logger.debug('Exit fullscreen');
        this.props.player.exitFullscreen();
        return {preventDefault: true, payload: true};
      }
      return {preventDefault: true, payload: null};
    },
    [KeyMap.LEFT]: (): {preventDefault: boolean, payload: any} => {
      if (!(this.props.player.ads && this.props.player.ads.isAdBreak())) {
        const newTime = this.props.player.currentTime - KEYBOARD_DEFAULT_SEEK_JUMP;
        const from = this.props.player.currentTime;
        const to = newTime > 0 ? newTime : 0;
        this.props.logger.debug(`Seek. ${from} => ${to}`);
        this.props.player.currentTime = to;
        this.props.updateOverlayActionIcon(IconType.Rewind);
        this.toggleHoverState();
        return {preventDefault: true, payload: {from: from, to: to}};
      }
      return {preventDefault: true, payload: null};
    },
    [KeyMap.RIGHT]: (): {preventDefault: boolean, payload: any} => {
      if (!(this.props.player.ads && this.props.player.ads.isAdBreak())) {
        const newTime = this.props.player.currentTime + KEYBOARD_DEFAULT_SEEK_JUMP;
        const from = this.props.player.currentTime;
        const to = newTime > this.props.player.duration ? this.props.player.duration : newTime;
        this.props.logger.debug(`Seek. ${from} => ${to}`);
        this.props.player.currentTime = newTime > this.props.player.duration ? this.props.player.duration : newTime;
        this.props.updateOverlayActionIcon(IconType.Forward);
        this.toggleHoverState();
        return {preventDefault: true, payload: {from: from, to: to}};
      }
      return {preventDefault: true, payload: null};
    },
    [KeyMap.HOME]: (): {preventDefault: boolean, payload: any} => {
      if (!(this.props.player.ads && this.props.player.ads.isAdBreak())) {
        const from = this.props.player.currentTime;
        const to = 0;
        this.props.logger.debug(`Seek. ${from} => ${to}`);
        this.props.player.currentTime = to;
        this.props.updateOverlayActionIcon(IconType.StartOver);
        this.toggleHoverState();
        return {preventDefault: true, payload: {from: from, to: to}};
      }
      return {preventDefault: true, payload: null};
    },
    [KeyMap.END]: (): {preventDefault: boolean, payload: any} => {
      if (!(this.props.player.ads && this.props.player.ads.isAdBreak())) {
        const from = this.props.player.currentTime;
        const to = this.props.player.duration;
        this.props.logger.debug(`Seek. ${from} => ${to}`);
        this.props.player.currentTime = to;
        this.props.updateOverlayActionIcon(IconType.SeekEnd);
        this.toggleHoverState();
        return {preventDefault: true, payload: {from: from, to: to}};
      }
      return {preventDefault: true, payload: null};
    },
    [KeyMap.M]: (): {preventDefault: boolean, payload: any} => {
      this.props.logger.debug(this.props.player.muted ? 'Umnute' : 'Mute');
      this.props.player.muted = !this.props.player.muted;
      this.props.player.muted
        ? this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute])
        : this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves]);
      return {preventDefault: true, payload: true};
    },
    [KeyMap.SEMI_COLON]: (event: KeyboardEvent): {preventDefault: boolean, payload: any} => {
      if (event.shiftKey) {
        if (this.props.player.playbackRate !== this.props.player.defaultPlaybackRate) {
          this.props.logger.debug(`Changing playback rate. ${this.props.player.playbackRate} => ${this.props.player.defaultPlaybackRate}`);
          this.props.player.playbackRate = this.props.player.defaultPlaybackRate;
          this.props.updateOverlayActionIcon(IconType.Speed);
          return {preventDefault: true, payload: {speed: this.props.player.defaultPlaybackRate}};
        }
        return {preventDefault: true, payload: null};
      }
      return {preventDefault: false, payload: null};
    },
    [KeyMap.PERIOD]: (event: KeyboardEvent): {preventDefault: boolean, payload: any} => {
      if (event.shiftKey) {
        const playbackRate = this.props.player.playbackRate;
        const index = this.props.player.playbackRates.indexOf(playbackRate);
        if (index < this.props.player.playbackRates.length - 1) {
          this.props.logger.debug(`Changing playback rate. ${playbackRate} => ${this.props.player.playbackRates[index + 1]}`);
          this.props.player.playbackRate = this.props.player.playbackRates[index + 1];
          this.props.updateOverlayActionIcon(IconType.SpeedUp);
          return {preventDefault: true, payload: {speed: this.props.player.playbackRates[index + 1]}};
        }
        return {preventDefault: true, payload: null};
      }
      return {preventDefault: false, payload: null};
    },
    [KeyMap.COMMA]: (event: KeyboardEvent): {preventDefault: boolean, payload: any} => {
      if (event.shiftKey) {
        const playbackRate = this.props.player.playbackRate;
        const index = this.props.player.playbackRates.indexOf(playbackRate);
        if (index > 0) {
          this.props.logger.debug(`Changing playback rate. ${playbackRate} => ${this.props.player.playbackRates[index - 1]}`);
          this.props.player.playbackRate = this.props.player.playbackRates[index - 1];
          this.props.updateOverlayActionIcon(IconType.SpeedDown);
          return {preventDefault: true, payload: {speed: this.props.player.playbackRates[index - 1]}};
        }
        return {preventDefault: true, payload: null};
      }
      return {preventDefault: false, payload: null};
    },
    [KeyMap.C]: (event: KeyboardEvent): {preventDefault: boolean, payload: any} => {
      let activeTextTrack = this.props.player.getActiveTracks().text;
      // if not active track then exit or if key is combined then exit
      if (!activeTextTrack || event.altKey || event.shiftKey || event.ctrlKey || event.metaKey) return {preventDefault: false, payload: null};
      if (activeTextTrack.language === 'off' && this._lastActiveTextLanguage) {
        this.props.logger.debug(`Changing text track to language`, this._lastActiveTextLanguage);
        const selectedTextTrack = this.props.player.getTracks('text').find(track => track.language === this._lastActiveTextLanguage);
        this.props.player.selectTrack(selectedTextTrack);
        return {preventDefault: true, payload: {track: selectedTextTrack}};
      } else if (activeTextTrack.language !== 'off' && !this._lastActiveTextLanguage) {
        this.props.logger.debug(`Hiding text track`);
        this._lastActiveTextLanguage = activeTextTrack.language;
        this.props.player.hideTextTrack();
      }
      return {preventDefault: true, payload: null};
    }
  };

  /**
   * toggles the shell hover state
   *
   * @returns {void}
   * @memberof Keyboard
   */
  toggleHoverState(): void {
    if (this._hoverTimeout !== null) {
      clearTimeout(this._hoverTimeout);
      this._hoverTimeout = null;
    }
    this.props.updatePlayerHoverState(true);
    this.props.notifyHoverChange({hover: true});
    this._hoverTimeout = setTimeout(() => {
      this.props.updatePlayerHoverState(false);
      this.props.notifyHoverChange({hover: false});
    }, CONTROL_BAR_HOVER_DEFAULT_TIMEOUT);
  }
}

export {Keyboard};
