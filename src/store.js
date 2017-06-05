//@flow
import {createStore} from 'redux';

let ACTIONS = {

  UPDATE_PLAYER_STATE: ({ ...state }, playerState) => ({
		...state,
    playerState,
	}),

  UPDATE_IS_PLAYING: ({ ...state }, { isPlaying }) => ({
		...state,
    isPlaying
	}),

  UPDATE_CURRENT_TIME: ({ ...state }, { currentTime }) => ({
		...state,
    currentTime
	}),

  UPDATE_SEEKBAR_DRAGGING_STATUS: ({ ...state }, { draggingActive }) => ({
		...state,
    seekBar: {
      ...state.seekBar,
      draggingActive
    }
	}),

  UPDATE_SEEKBAR_VIRTUAL_PROGRESS: ({ ...state }, { virtualTime }) => ({
		...state,
    seekBar: {
      ...state.seekBar,
      virtualTime
    }
	}),

  UPDATE_DURATION: ({ ...state }, { duration }) => ({
		...state,
    duration
	}),

  UPDATE_VOLUME: ({ ...state }, { volume }) => ({
		...state,
    volume
	}),

  UPDATE_VOLUME_DRAGGING_STATUS: ({ ...state }, { draggingActive }) => ({
		...state,
    volumeControl: {
      ...state.volumeControl,
      draggingActive
    }
	}),

  UPDATE_MUTED: ({ ...state }, { muted }) => ({
		...state,
    muted
	}),

  UPDATE_FULLSCREEN: ({ ...state }, { fullscreen }) => ({
		...state,
    fullscreen
	}),

  UPDATE_LOADING_SPINNER_STATE: ({ ...state }, { showLoadingSpinner }) => ({
		...state,
    showLoadingSpinner
	}),

  ADD_PLAYER_CLASS: ({ ...state }, { className }) => ({
		...state,
    playerClasses: state.playerClasses.push(className)
	}),

  REMOVE_PLAYER_CLASS: ({ ...state }, { className }) => ({
		...state,
    playerClasses: state.playerClasses.filter(c => c !== className)
	})

};

const INITIAL = {
	isPlaying: false,
  playerState: {
    previousState: '',
    currentState: ''
  },
  currentTime: 0,
  duration: 0,
  volume: 1,
  muted: false,
  fullscreen: false,

  seekBar: {
    draggingActive: false,
    virtualTime: 0
  },
  volumeControl: {
    draggingActive: false
  },
  showLoadingSpinner: false,
  playerClasses: []
};

export default createStore( (state, action) => (
	action && ACTIONS[action.type] ? ACTIONS[action.type](state, action) : state
), INITIAL, window.devToolsExtension && window.devToolsExtension());
