//@flow
import {combineReducers} from 'redux';
import app from './reducers/app';
import config from './reducers/config';
import engine from './reducers/engine';
import shell from './reducers/shell';
import seekbar from './reducers/seekbar';
import volume from './reducers/volume';
import fullscreen from './reducers/fullscreen';
import loading from './reducers/loading';
import share from './reducers/share';
import cvaa from './reducers/cvaa';
import settings from './reducers/settings';
import overlayAction from './reducers/overlay-action';
import {middleware} from './middlewares';
import {createStore} from 'redux';

let store = null;

const reducer = combineReducers({
  app,
  config,
  engine,
  shell,
  seekbar,
  volume,
  fullscreen,
  loading,
  share,
  cvaa,
  settings,
  overlayAction
});

/**
 * Creates the redux store.
 * @param {*} player - The player.
 * @param {UIOptionsObject} config - The UI config.
 * @private
 * @returns {void}
 */
function getStore(player?: any, config?: UIOptionsObject) {
  if (!store && player && config) {
    store = createStore(
      reducer,
      window.devToolsExtension &&
        window.devToolsExtension({
          name: `playkit #${config.targetId}`,
          instanceId: config.targetId
        }),
      middleware(player, config)
    );
  }
  return store;
}

export {getStore};
