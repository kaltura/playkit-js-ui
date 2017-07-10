//@flow

export const types = {
  ADD_PLAYER_CLASS: 'shell/ADD_PLAYER_CLASS',
  REMOVE_PLAYER_CLASS: 'shell/REMOVE_PLAYER_CLASS',
  UPDATE_IS_MOBILE: 'shell/UPDATE_IS_MOBILE',
  UPDATE_PRE_PLAYBACK: 'shell/UPDATE_PRE_PLAYBACK',
  UPDATE_IS_AD: 'shell/UPDATE_IS_AD'
}

export const initialState = {
  playerClasses: [],
  prePlayback: true,
  is_ad: true
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.ADD_PLAYER_CLASS:
      if (state.playerClasses.includes(action.className)) return state;
      return {
        ...state,
        playerClasses: [...state.playerClasses, action.className]
      }

    case types.REMOVE_PLAYER_CLASS:
      return {
        ...state,
        playerClasses: state.playerClasses.filter(c => c !== action.className)
      }

    case types.UPDATE_IS_MOBILE:
      return {
        ...state,
        isMobile: action.isMobile
      }

    case types.UPDATE_PRE_PLAYBACK:
      return {
        ...state,
        prePlayback: action.prePlayback
      }

    case types.UPDATE_IS_AD:
      return {
        ...state,
        isAd: action.isAd
      }

    default:
      return state;
  }
}

export const actions = {
  addPlayerClass: (className: string) => ({ type: types.ADD_PLAYER_CLASS, className }),
  removePlayerClass: (className: string) => ({ type: types.REMOVE_PLAYER_CLASS, className }),
  updateIsMobile: (isMobile: boolean) => ({ type: types.UPDATE_IS_MOBILE, isMobile }),
  updatePrePlayback: (prePlayback: boolean) => ({ type: types.UPDATE_PRE_PLAYBACK, prePlayback }),
  updateIsAd: (isAd: boolean) => ({ type: types.UPDATE_IS_AD, isAd })
}
