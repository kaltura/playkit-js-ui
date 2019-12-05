// @flow
import {FakeEvent} from 'event/fake-event';
import {AudioSelectedEvent} from 'event/events/audio-selected-event';
import {CaptionSelectedEvent} from 'event/events/caption-selected-event';
import {CaptionsStyleSelectedEvent} from 'event/events/captions-style-selected-event';
import {QualitySelectedEvent} from 'event/events/quality-selected-event';
import {SeekedEvent} from 'event/events/seeked-event';
import {SpeedSelectedEvent} from 'event/events/speed-selected-event';
import {UIVisibilityChangedEvent} from 'event/events/ui-visibility-changed-event';
import {RewindClickedEvent} from 'event/events/rewind-clicked';
import {ForwardClickedEvent} from 'event/events/forward-clicked';
import {VolumeChangedEvent} from 'event/events/volume-changed';
import {Component} from 'preact';

/**
 * PlayerProvider component
 *
 * @class EventDispatcherProvider
 * @example <EventDispatcherProvider player={this.player} store={this.store}>...</EventDispatcherProvider>
 * @extends {Component}
 */
class EventDispatcherProvider extends Component {
  /**
   * bounded component click handler
   * @param {Object} payload - the click data payload
   * @returns {void}
   * @private
   */
  _notifyClick = (payload: Object) => onClickableComponentsHandler(this.props.store, payload, this.props.player);
  /**
   * bounded component state change handler
   * @param {Object} payload - the click data payload
   * @returns {void}
   * @private
   */
  _notifyChange = (payload: Object) => onChangeableComponentsHandler(this.props.store, payload, this.props.player);
  /**
   * bounded hover change  handler
   * @param {Object} payload - the click data payload
   * @returns {void}
   * @private
   */
  _notifyHoverChange = (payload: Object) => onPlayerHoverStateChangeHandler(this.props.store, payload, this.props.player);
  /**
   * create context player
   * @returns {void}
   */
  getChildContext() {
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
  render(): React$Element<any> | null {
    return (this.props.children && this.props.children[0]) || null;
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
function onPlayerHoverStateChangeHandler(store: any, action: Object, player: Object): void {
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
function onChangeableComponentsHandler(store: any, action: Object, player: Object): void {
  switch (action.name) {
    case 'Volume':
      player.dispatchEvent(new VolumeChangedEvent(action.payload.volume));
      break;

    case 'SeekBarPlaybackContainer':
      player.dispatchEvent(new SeekedEvent(action.payload.from, action.payload.to));
      break;

    case 'PlayerGui':
      player.dispatchEvent(new FakeEvent(FakeEvent.Type.UI_PRESET_CHANGE, action.payload));
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
function onClickableComponentsHandler(store: any, action: Object, player: Object): void {
  switch (action.name) {
    case 'OverlayAction':
      onOverlayActionClicked(store, action, player);
      break;

    case 'Settings':
      onSettingsClicked(store, action, player);
      break;

    case 'CVAAOverlay':
      player.dispatchEvent(new CaptionsStyleSelectedEvent(action.payload.textStyle));
      break;

    case 'Fullscreen':
      onFullScreenClicked(store, action, player);
      break;

    case 'Language':
      onLanguageClicked(store, action, player);
      break;

    case 'Shell':
      player.dispatchEvent(new FakeEvent(FakeEvent.Type.UI_CLICKED));
      break;

    case 'Rewind':
      player.dispatchEvent(new RewindClickedEvent(action.payload.from, action.payload.to));
      break;

    case 'Forward':
      player.dispatchEvent(new ForwardClickedEvent(action.payload.from, action.payload.to));
      break;

    case 'LiveTag':
      player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_LIVE_TAG));
      break;

    case 'PrePlaybackPlayOverlay':
    case 'PlayPause':
      onPlayPauseClicked(store, action, player);
      break;

    case 'Volume':
      onVolumeClicked(store, action, player);
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
function onPlayPauseClicked(store: any, action: Object, player: Object): void {
  const engineState = store.getState().engine;
  if (engineState.adBreak) {
    engineState.adIsPlaying
      ? player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_PAUSE))
      : player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_PLAY));
  } else {
    engineState.isPlaying
      ? player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_PAUSE))
      : player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_PLAY));
  }
}

/**
 * Handler for volume clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onVolumeClicked(store: any, action: Object, player: Object): void {
  const engineState = store.getState().engine;
  engineState.muted
    ? player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_MUTE))
    : player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_UNMUTE));
}

/**
 * Handler for language menu clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onLanguageClicked(store: any, action: Object, player: Object): void {
  if (action.payload.type === player.Track.AUDIO) {
    player.dispatchEvent(new AudioSelectedEvent(action.payload.track));
  } else if (action.payload.type === player.Track.TEXT) {
    player.dispatchEvent(new CaptionSelectedEvent(action.payload.track));
  }
}

/**
 * Handler for fullscreen clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onFullScreenClicked(store: any, action: Object, player: Object): void {
  player.isFullscreen()
    ? player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_EXITED_FULL_SCREEN))
    : player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_ENTERED_FULL_SCREEN));
}

/**
 * Handler for settings menu clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onSettingsClicked(store: any, action: Object, player: Object): void {
  if (action.payload.type === player.Track.VIDEO) {
    player.dispatchEvent(new QualitySelectedEvent(action.payload.track));
  } else {
    player.dispatchEvent(new SpeedSelectedEvent(action.payload.speed));
  }
}

/**
 * Handler for overlay clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Object} player - The video player.
 * @returns {void}
 */
function onOverlayActionClicked(store: any, action: Object, player: Object): void {
  if (action.payload.type === 'PlayPause') {
    onPlayPauseClicked(store, action, player);
  } else if (action.payload.type === 'Fullscreen') {
    onFullScreenClicked(store, action, player);
  }
}
