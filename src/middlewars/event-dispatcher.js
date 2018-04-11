// @flow
import {FakeEvent} from '../event/fake-event';
import {types as shell} from '../reducers/shell'
import {AudioSelectedEvent} from '../event/events/audio-selected-event';
import {CaptionSelectedEvent} from '../event/events/caption-selected-event';
import {CaptionsStyleSelectedEvent} from '../event/events/captions-style-selected-event';
import {QualitySelectedEvent} from '../event/events/quality-selected-event';
import {SeekedEvent} from '../event/events/seeked-event';
import {SpeedSelectedEvent} from '../event/events/speed-selected-event';
import {UIActiveStateChangedEvent} from '../event/events/ui-active-changed-event';

const namespace = 'event-dispatcher-middleware';

const types = {
  COMPONENT_CLICKED: `${namespace}/COMPONENT_CLICKED`,
  COMPONENT_CHANGED: `${namespace}/COMPONENT_CHANGED`
};

/**
 * EventDispatcher Middleware function.
 * @param {Player} player - The video player.
 * @returns {void}
 */
const eventDispatcherMiddleware = player => store => next => action => {
  switch (action.type) {
    case types.COMPONENT_CLICKED:
      onClickableComponentsHandler(store, action, player);
      break;

    case types.COMPONENT_CHANGED:
      onChangeableComponentsHandler(store, action, player);
      break;

    case shell.UPDATE_PLAYER_HOVER_STATE:
      player.dispatchEvent(new UIActiveStateChangedEvent(action.hover));
      break;

    default:
      break;
  }
  next(action);
};

/**
 * Handler for changeable components actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onChangeableComponentsHandler(store, action, player): void {
  switch (action.name) {
    case 'Volume':
      player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CHANGED_VOLUME));
      break;

    case 'SeekBarPlaybackContainer':
      player.dispatchEvent(new SeekedEvent(action.payload.from, action.payload.to));
      break;

    default:
      break;
  }
}

/**
 * Handler for clickable components actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onClickableComponentsHandler(store, action, player) {
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

    case 'LanguageControl':
      onLanguageClicked(store, action, player);
      break;

    case 'Shell':
      player.dispatchEvent(new FakeEvent(FakeEvent.Type.UI_CLICKED));
      break;

    case 'Rewind':
      player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_REWIND));
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
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onPlayPauseClicked(store, action, player) {
  const engineState = store.getState().engine;
  if (engineState.adBreak) {
    engineState.adIsPlaying ?
      player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_PAUSE)) :
      player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_PLAY))
  } else {
    engineState.isPlaying ?
      player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_PAUSE)) :
      player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_PLAY));
  }
}

/**
 * Handler for volume clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onVolumeClicked(store, action, player) {
  const engineState = store.getState().engine;
  engineState.muted ?
    player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_MUTE)) :
    player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_CLICKED_UNMUTE));
}

/**
 * Handler for language menu clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onLanguageClicked(store, action, player) {
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
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onFullScreenClicked(store, action, player) {
  player.isFullscreen() ?
    player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_EXITED_FULL_SCREEN)) :
    player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_ENTERED_FULL_SCREEN));
}

/**
 * Handler for settings menu clicked actions.
 * @param {any} store - The redux store.
 * @param {Object} action - The action object.
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onSettingsClicked(store, action, player) {
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
 * @param {Player} player - The video player.
 * @returns {void}
 */
function onOverlayActionClicked(store, action, player) {
  if (action.payload.type === 'PlayPause') {
    onPlayPauseClicked(store, action, player);
  } else if (action.payload.type === 'Fullscreen') {
    onFullScreenClicked(store, action, player);
  }
}

export {types, eventDispatcherMiddleware};
