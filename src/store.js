//@flow
import { createStore, combineReducers } from 'redux';
import engine from './reducers/engine';
import shell from './reducers/shell';
import playPause from './reducers/play-pause';
import seekbar from './reducers/seekbar';
import volume from './reducers/volume';
import fullscreen from './reducers/fullscreen';
import loading from './reducers/loading';
import share from './reducers/share';
import settings from './reducers/settings';

const reducer = combineReducers({
  engine,
  shell,
  seekbar,
  volume,
  fullscreen,
  loading,
  playPause,
  share,
  settings
});

const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

export default store;
