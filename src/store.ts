import {combineReducers} from 'redux';
import config from './reducers/config';
import engine from './reducers/engine';
import shell from './reducers/shell';
import seekbar from './reducers/seekbar';
import volume from './reducers/volume';
import loading from './reducers/loading';
import cvaa from './reducers/cvaa';
import settings from './reducers/settings';
import overlayAction from './reducers/overlay-action';
import playlist from './reducers/playlist';
import overlay from './reducers/overlay';
import bottomBar from './reducers/bottom-bar';
import {RootState} from './types';

const reducer = combineReducers<RootState>({
  config,
  engine,
  shell,
  seekbar,
  volume,
  loading,
  cvaa,
  settings,
  overlayAction,
  playlist,
  overlay,
  bottomBar
});

export default reducer;
