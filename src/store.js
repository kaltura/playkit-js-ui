//@flow
import {combineReducers} from 'redux';
import config from './reducers/config';
import engine from './reducers/engine';
import shell from './reducers/shell';
import playPause from './reducers/play-pause';
import seekbar from './reducers/seekbar';
import volume from './reducers/volume';
import fullscreen from './reducers/fullscreen';
import loading from './reducers/loading';
import share from './reducers/share';
import cvaa from './reducers/cvaa';
import settings from './reducers/settings';
import overlayAction from './reducers/overlay-action';

const reducer = combineReducers({
  config,
  engine,
  shell,
  seekbar,
  volume,
  fullscreen,
  loading,
  playPause,
  share,
  cvaa,
  settings,
  overlayAction
});

export default reducer;
