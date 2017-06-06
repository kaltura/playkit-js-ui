//@flow
import { createStore, combineReducers } from 'redux';
import engine from './reducers/engine';
import shell from './reducers/shell';
import seekbar from './reducers/seekbar';
import volume from './reducers/volume';
import fullscreen from './reducers/fullscreen';
import loading from './reducers/loading';

const reducer = combineReducers({
  engine,
  shell,
  seekbar,
  volume,
  fullscreen,
  loading
});


// let storeStructure: {
//   engine: engineReducer,
//   shell: shellReducer,
//   playPause: playPause,
//   seekBar: seekBar,
//   volume: volume,
//   fullscreen: fullscreen,
//   plugins: pluginsReducers
// }

const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

export default store;
