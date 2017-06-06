// //@flow

// export const types = {
//   // engine
//   UPDATE_PLAYER_STATE: 'engine/UPDATE_PLAYER_STATE',
//   UPDATE_IS_PLAYING: 'engine/UPDATE_IS_PLAYING',
//   UPDATE_CURRENT_TIME: 'engine/UPDATE_CURRENT_TIME',
//   UPDATE_DURATION: 'engine/UPDATE_DURATION',

//   // seekbar
//   UPDATE_SEEKBAR_DRAGGING_STATUS: 'seekbar/UPDATE_SEEKBAR_DRAGGING_STATUS',
//   UPDATE_SEEKBAR_VIRTUAL_PROGRESS: 'seekbar/UPDATE_SEEKBAR_VIRTUAL_PROGRESS',

//   // volume
//   UPDATE_VOLUME: 'volume/UPDATE_VOLUME',
//   UPDATE_VOLUME_DRAGGING_STATUS: 'volume/UPDATE_VOLUME_DRAGGING_STATUS',
//   UPDATE_MUTED: 'volume/UPDATE_MUTED',

//   // fullscreen
//   UPDATE_FULLSCREEN: 'fullscreen/UPDATE_FULLSCREEN',

//   // loading
//   UPDATE_LOADING_SPINNER_STATE: 'loading/UPDATE_LOADING_SPINNER_STATE',

//   // shell
//   ADD_PLAYER_CLASS: 'shell/ADD_PLAYER_CLASS',
//   REMOVE_PLAYER_CLASS: 'shell/REMOVE_PLAYER_CLASS'
// }

// export const initialState = {
// 	isPlaying: false,
//   playerState: {
//     previousState: '',
//     currentState: ''
//   },
//   currentTime: 0,
//   duration: 0,
//   volume: 1,
//   muted: false,
//   fullscreen: false,

//   seekBar: {
//     draggingActive: false,
//     virtualTime: 0
//   },
//   volumeControl: {
//     draggingActive: false
//   },
//   showLoadingSpinner: false,
//   playerClasses: []
// };

// export default (state = initialState, action) => {
//   switch (action.type) {
//     case types.UPDATE_PLAYER_STATE:
//       return {
//         ...state,
//         playerState: action.playerState
//       }

//     case types.UPDATE_IS_PLAYING:
//       return {
//         ...state,
//         isPlaying: action.isPlaying
//       }

//     case types.UPDATE_CURRENT_TIME:
//       return {
//         ...state,
//         currentTime: action.currentTime
//       }

//     case types.UPDATE_SEEKBAR_DRAGGING_STATUS:
//       return {
//         ...state,
//         seekBar: {
//           ...state.seekBar,
//           draggingActive: action.draggingActive
//         }
//       }

//     case types.UPDATE_SEEKBAR_VIRTUAL_PROGRESS:
//       return {
//         ...state,
//         seekBar: {
//           ...state.seekBar,
//           virtualTime: action.virtualTime
//         }
//       }

//     case types.UPDATE_DURATION:
//       return {
//         ...state,
//         duration: action.duration
//       }

//     case types.UPDATE_VOLUME:
//       return {
//         ...state,
//         volume: action.volume
//       }

//     case types.UPDATE_VOLUME_DRAGGING_STATUS:
//       return {
//         ...state,
//         volumeControl: {
//           ...state.volumeControl,
//           draggingActive: action.draggingActive
//         }
//       }

//     case types.UPDATE_MUTED:
//       return {
//         ...state,
//         muted: action.muted
//       }

//     case types.UPDATE_FULLSCREEN:
//       return {
//         ...state,
//         fullscreen: action.fullscreen
//       }

//     case types.UPDATE_LOADING_SPINNER_STATE:
//       return {
//         ...state,
//         showLoadingSpinner: action.showLoadingSpinner
//       }

//     case types.ADD_PLAYER_CLASS:
//       return {
//         ...state,
//         playerClasses: state.playerClasses.push(action.className)
//       }

//     case types.REMOVE_PLAYER_CLASS:
//       return {
//         ...state,
//         playerClasses: state.playerClasses.filter(c => c !== action.className)
//       }
//     default:
//       return state;
//   }
// }

// export const actions = {
//   // engine
//   updatePlayerState: (prevoiusState: string, currentState: string) => ({ type: types.UPDATE_PLAYER_STATE, obj: {prevoiusState, currentState} }),
//   updateIsPlaying: (isPlaying: boolean) => ({ type: types.UPDATE_IS_PLAYING, isPlaying }),
//   updateCurrentTime: (currentTime: number) => ({ type: types.UPDATE_CURRENT_TIME, currentTime }),
//   updateVirtualTime: (virtualTime: number) => ({ type: types.UPDATE_SEEKBAR_VIRTUAL_PROGRESS, virtualTime }),

//   // seekbar
//   updateSeekbarDraggingStatus: (draggingActive: boolean) => ({ type: types.UPDATE_SEEKBAR_DRAGGING_STATUS, draggingActive }),
//   updateDuration: (duration: number) => ({ type: types.UPDATE_DURATION, duration }),

//   // volume
//   updateVolume: (volume: number) => ({ type: types.UPDATE_VOLUME, volume }),
//   updateVolumeDraggingStatus: (draggingActive: boolean) => ({ type: types.UPDATE_VOLUME_DRAGGING_STATUS, draggingActive }),
//   updateMuted: (muted: boolean) => ({ type: types.UPDATE_MUTED, muted }),

//   // fullscreen
//   updateFullscreen: (fullscreen: boolean) => ({ type: types.UPDATE_FULLSCREEN, fullscreen }),

//   // loading
//   updateLoadingSpinnerState: (showLoadingSpinner: boolean) => ({ type: types.UPDATE_LOADING_SPINNER_STATE, showLoadingSpinner }),

//   // shell
//   addPlayerClass: (className: string) => ({ type: types.ADD_PLAYER_CLASS, className }),
//   removePlayerClass: (className: string) => ({ type: types.REMOVE_PLAYER_CLASS, className })
// }
