//@flow
import {combineReducers} from 'redux';
import config from './reducers/config';
import engine from './reducers/engine';
import shell from './reducers/shell';
import seekbar from './reducers/seekbar';
import volume from './reducers/volume';
import loading from './reducers/loading';
import share from './reducers/share';
import cvaa from './reducers/cvaa';
import settings from './reducers/settings';
import overlayAction from './reducers/overlay-action';
import backdrop from './reducers/backdrop';
import playlist from 'reducers/playlist';

const reducer = combineReducers({
  config,
  engine,
  shell,
  seekbar,
  volume,
  loading,
  share,
  cvaa,
  settings,
  overlayAction,
  backdrop,
  playlist
});

export default reducer;
