//@flow
export const types = {
  UPDATE_PLAYER_STATE: 'engine/UPDATE_PLAYER_STATE',
  UPDATE_IS_PLAYING: 'engine/UPDATE_IS_PLAYING',
  UPDATE_CURRENT_TIME: 'engine/UPDATE_CURRENT_TIME',
  UPDATE_DURATION: 'engine/UPDATE_DURATION',
  UPDATE_VOLUME: 'engine/UPDATE_VOLUME',
  UPDATE_MUTED: 'engine/UPDATE_MUTED'
}

export const initialState = {
	isPlaying: false,
  playerState: {
    previousState: '',
    currentState: ''
  },
  currentTime: 0,
  duration: 0,
  volume: 1,
  muted: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_PLAYER_STATE:
      return {
        ...state,
        playerState: action.playerState
      }

    case types.UPDATE_IS_PLAYING:
      return {
        ...state,
        isPlaying: action.isPlaying
      }

    case types.UPDATE_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.currentTime
      }

    case types.UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration
      }

    case types.UPDATE_VOLUME:
      return {
        ...state,
        volume: action.volume
      }

    case types.UPDATE_MUTED:
      return {
        ...state,
        muted: action.muted
      }

    default:
      return state;
  }
}

export const actions = {
  updatePlayerState: (prevoiusState: string, currentState: string) => ({ type: types.UPDATE_PLAYER_STATE, obj: {prevoiusState, currentState} }),
  updateIsPlaying: (isPlaying: boolean) => ({ type: types.UPDATE_IS_PLAYING, isPlaying }),
  updateCurrentTime: (currentTime: number) => ({ type: types.UPDATE_CURRENT_TIME, currentTime }),
  updateDuration: (duration: number) => ({ type: types.UPDATE_DURATION, duration }),
  updateVolume: (volume: number) => ({ type: types.UPDATE_VOLUME, volume }),
  updateMuted: (muted: boolean) => ({ type: types.UPDATE_MUTED, muted })
}
