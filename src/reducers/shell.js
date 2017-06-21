//@flow

export const types = {
  ADD_PLAYER_CLASS: 'shell/ADD_PLAYER_CLASS',
  REMOVE_PLAYER_CLASS: 'shell/REMOVE_PLAYER_CLASS',
  UPDATE_IS_MOBILE: 'shell/UPDATE_IS_MOBILE'
}

export const initialState = {
  playerClasses: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_PLAYER_CLASS:
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

    default:
      return state;
  }
}

export const actions = {
  addPlayerClass: (className: string) => ({ type: types.ADD_PLAYER_CLASS, className }),
  removePlayerClass: (className: string) => ({ type: types.REMOVE_PLAYER_CLASS, className }),
  updateIsMobile: (isMobile: boolean) => ({ type: types.UPDATE_IS_MOBILE, isMobile })
}
