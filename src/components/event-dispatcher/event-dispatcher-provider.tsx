/* eslint-disable @typescript-eslint/no-use-before-define */
import {FakeEvent} from '@playkit-js/playkit-js';
import {EventType} from '../../event';
import {AudioSelectedEvent} from '../../event/events/audio-selected-event';
import {CaptionSelectedEvent} from '../../event/events/caption-selected-event';
import {CaptionsStyleSelectedEvent} from '../../event/events/captions-style-selected-event';
import {QualitySelectedEvent} from '../../event/events/quality-selected-event';
import {SeekedEvent} from '../../event/events/seeked-event';
import {SpeedSelectedEvent} from '../../event/events/speed-selected-event';
import {UIVisibilityChangedEvent} from '../../event/events/ui-visibility-changed-event';
import {RewindClickedEvent} from '../../event/events/rewind-clicked';
import {ForwardClickedEvent} from '../../event/events/forward-clicked';
import {VolumeChangedEvent} from '../../event/events/volume-changed';
import {KeyMap} from '../../utils';
import {Component, toChildArray} from 'preact';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';

/**
 * PlayerProvider component
 *
 * @class EventDispatcherProvider
 * @example <EventDispatcherProvider player={this.player} store={this.store}>...</EventDispatcherProvider>
 * @extends {Component}
 */
class EventDispatcherProvider extends Component<any, any> {
  /**
   * bounded component click handler
   * @param {Object} payload - the click data payload
   * @returns {void}
   * @private
   */
  private _notifyClick = (payload: any): void => onClickableComponentsHandler(this.props.store, payload, this.props.player);
  /**
   * bounded component state change handler
   * @param {Object} payload - the click data payload
   * @returns {void}
   * @private
   */
  private _notifyChange = (payload: any): void => onChangeableComponentsHandler(this.props.store, payload, this.props.player);
  /**
   * bounded hover change  handler
   * @param {Object} payload - the click data payload
   * @returns {void}
   * @private
   */
  private _notifyHoverChange = (payload: any): void => onPlayerHoverStateChangeHandler(this.props.store, payload, this.props.player);
  /**
   * create context player
   * @returns {void}
   */
  public getChildContext() {
    return {
      notifyClick: this._notifyClick,
      notifyChange: this._notifyChange,
      notifyHoverChange: this._notifyHoverChange
    };
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof EventDispatcherProvider
   */
  render() {
    return (this.props.children && toChildArray(this.props.children)[0]) || null;
  }
}
export {EventDispatcherProvider};

/**
 * Handler for hover state change action.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onPlayerHoverStateChangeHandler(store: any, action: any, player: KalturaPlayer): void {
  const engineState = store.getState().engine;
  const shellState = store.getState().shell;
  if (!engineState.adBreak && engineState.isPlaying && shellState.playerHover !== action.payload.hover) {
    player.dispatchEvent(new UIVisibilityChangedEvent(action.payload.hover));
  }
}

/**
 * Handler for changeable components actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onChangeableComponentsHandler(store: any, action: any, player: KalturaPlayer): void {
  switch (action.name) {
    case 'Volume':
      player.dispatchEvent(new VolumeChangedEvent(action.payload.volume));
      break;

    case 'SeekBarPlaybackContainer':
      player.dispatchEvent(new SeekedEvent(action.payload.from, action.payload.to));
      break;

    case 'SeekBarLivePlaybackContainer':
      player.dispatchEvent(new SeekedEvent(action.payload.from, action.payload.to));
      break;

    case 'ActivePreset':
      player.dispatchEvent(new FakeEvent(EventType.UI_PRESET_CHANGE, action.payload));
      break;

    default:
      break;
  }
}

/**
 * Handler for clickable components actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onClickableComponentsHandler(store: any, action: any, player: KalturaPlayer): void {
  switch (action.name) {
    case 'Keyboard':
      keyboardHandlers[action.payload.key](store, action, player);
      break;

    case 'OverlayAction':
      onOverlayActionClicked(store, action, player);
      break;

    case 'CVAAOverlay':
      player.dispatchEvent(new CaptionsStyleSelectedEvent(action.payload.textStyle));
      break;

    case 'Fullscreen':
      onFullScreenClicked(store, action, player);
      break;

    case 'CaptionsMenu':
      onCaptionsClick(store, action, player);
      break;

    case 'AudioMenu':
      onAudioClicked(store, action, player);
      break;

    case 'QualityMenu':
      onQualityClicked(store, action, player);
      break;

    case 'SpeedMenu':
      onSpeedClicked(store, action, player);
      break;

    case 'AdvancedAudioDescToggle':
      onAdvancedAudioDescriptionClicked(store, action, player);
      break;

    case 'Shell':
      player.dispatchEvent(new FakeEvent(EventType.UI_CLICKED));
      break;

    case 'Rewind':
      player.dispatchEvent(new RewindClickedEvent(action.payload.from, action.payload.to));
      break;

    case 'Forward':
      player.dispatchEvent(new ForwardClickedEvent(action.payload.from, action.payload.to));
      break;

    case 'LiveTag':
      player.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_LIVE_TAG));
      break;
    case 'Logo':
      player.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_LOGO, action.payload));
      break;

    case 'PrePlaybackPlayOverlay':
    case 'PlayPause':
      onPlayPauseClicked(store, action, player);
      break;

    case 'Volume':
      onVolumeClicked(store, action, player);
      break;

    case 'PictureInPicture':
      onPictureInPictureClicked(store, action, player);
      break;

    case 'ClosedCaptions':
      onClosedCaptionsClicked(store, action, player);
      break;
  }
}

/**
 * Handler for play-pause clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onPlayPauseClicked(store: any, action: any, player: KalturaPlayer): void {
  const engineState = store.getState().engine;
  if (engineState.adBreak) {
    engineState.adIsPlaying
      ? player.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_PAUSE))
      : player.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_PLAY));
  } else {
    engineState.isPlaying
      ? player.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_PAUSE))
      : player.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_PLAY));
  }
}

/**
 * Handler for volume clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onVolumeClicked(store: any, action: any, player: KalturaPlayer): void {
  const engineState = store.getState().engine;
  engineState.muted
    ? player.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_MUTE))
    : player.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_UNMUTE));
}

/**
 * Handler for captions menu clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onCaptionsClick(store: any, action: any, player: KalturaPlayer): void {
  if (action.payload.type === player.Track.TEXT) {
    player.dispatchEvent(new CaptionSelectedEvent(action.payload.track));
  }
}

/**
 * Handler for audio menu clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onAudioClicked(store: any, action: any, player: KalturaPlayer): void {
  if (action.payload.type === player.Track.AUDIO) {
    player.dispatchEvent(new AudioSelectedEvent(action.payload.track));
  }
}

/**
 * Handler for Quality menu clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onQualityClicked(store: any, action: any, player: KalturaPlayer): void {
  if (action.payload.type === player.Track.VIDEO) {
    player.dispatchEvent(new QualitySelectedEvent(action.payload.track));
  }
}

/**
 * Handler for Speed menu clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onSpeedClicked(store: any, action: any, player: KalturaPlayer): void {
  if (action.payload.type === 'speed') {
    player.dispatchEvent(new SpeedSelectedEvent(action.payload.speed));
  }
}

/**
 * Handler for AdvancedAudioDescription menu clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onAdvancedAudioDescriptionClicked(store: any, action: any, player: KalturaPlayer): void {
  if (action.payload.type === 'AdvancedAudioDescription') {
    player.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_ADVANCED_AUDIO_DESCRIPTION, action.payload));
  }
}

/**
 * Handler for fullscreen clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onFullScreenClicked(store: any, action: any, player: KalturaPlayer): void {
  player.isFullscreen()
    ? player.dispatchEvent(new FakeEvent(EventType.USER_EXITED_FULL_SCREEN))
    : player.dispatchEvent(new FakeEvent(EventType.USER_ENTERED_FULL_SCREEN));
}

/**
 * Handler for PictureInPicture clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onPictureInPictureClicked(store: any, action: any, player: KalturaPlayer): void {
  player.isInPictureInPicture()
    ? player.dispatchEvent(new FakeEvent(EventType.USER_EXITED_PICTURE_IN_PICTURE))
    : player.dispatchEvent(new FakeEvent(EventType.USER_ENTERED_PICTURE_IN_PICTURE));
}

/**
 * Handler for overlay clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onOverlayActionClicked(store: any, action: any, player: KalturaPlayer): void {
  if (action.payload.type === 'PlayPause') {
    onPlayPauseClicked(store, action, player);
  } else if (action.payload.type === 'Fullscreen') {
    onFullScreenClicked(store, action, player);
  }
}

/**
 * Handler for CC clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onClosedCaptionsClicked(store: any, action: any, player: KalturaPlayer): void {
  const {payload: ccOn} = action;
  ccOn ? player.dispatchEvent(new FakeEvent(EventType.USER_HID_CAPTIONS)) : player.dispatchEvent(new FakeEvent(EventType.USER_SHOWED_CAPTIONS));
}

/**
 * Keyboard handler object.
 * Maps key code to its event dispatching logic.
 * @type {Object}
 */
const keyboardHandlers: {[key: number]: Function} = {
  [KeyMap.SPACE]: (store, action, player) => {
    onPlayPauseClicked(store, action, player);
  },
  [KeyMap.UP]: (store, action, player) => {
    player.dispatchEvent(new VolumeChangedEvent(action.payload.volume));
  },
  [KeyMap.DOWN]: (store, action, player) => {
    player.dispatchEvent(new VolumeChangedEvent(action.payload.volume));
  },
  [KeyMap.F]: (store, action, player) => {
    onFullScreenClicked(store, action, player);
  },
  [KeyMap.P]: (store, action, player) => {
    onPictureInPictureClicked(store, action, player);
  },
  [KeyMap.ESC]: (store, action, player) => {
    onFullScreenClicked(store, action, player);
  },
  [KeyMap.LEFT]: (store, action, player) => {
    player.dispatchEvent(new SeekedEvent(action.payload.from, action.payload.to));
  },
  [KeyMap.RIGHT]: (store, action, player) => {
    player.dispatchEvent(new SeekedEvent(action.payload.from, action.payload.to));
  },
  [KeyMap.HOME]: (store, action, player) => {
    player.dispatchEvent(new SeekedEvent(action.payload.from, action.payload.to));
  },
  [KeyMap.END]: (store, action, player) => {
    player.dispatchEvent(new SeekedEvent(action.payload.from, action.payload.to));
  },
  [KeyMap.M]: (store, action, player) => {
    onVolumeClicked(store, action, player);
  },
  [KeyMap.SEMI_COLON]: (store, action, player) => {
    player.dispatchEvent(new SpeedSelectedEvent(action.payload.speed));
  },
  [KeyMap.PERIOD]: (store, action, player) => {
    player.dispatchEvent(new SpeedSelectedEvent(action.payload.speed));
  },
  [KeyMap.COMMA]: (store, action, player) => {
    player.dispatchEvent(new SpeedSelectedEvent(action.payload.speed));
  },
  [KeyMap.C]: (store, action, player) => {
    player.dispatchEvent(new CaptionSelectedEvent(action.payload.track));
  }
};
