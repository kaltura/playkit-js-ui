//@flow
import {combineReducers} from 'redux';
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
import backdrop from './reducers/backdrop';

const reducer = combineReducers({
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
  overlayAction,
  backdrop
});

export default reducer;
