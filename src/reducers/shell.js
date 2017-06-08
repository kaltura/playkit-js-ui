//@flow

export const types = {
  ADD_PLAYER_CLASS: 'shell/ADD_PLAYER_CLASS',
  REMOVE_PLAYER_CLASS: 'shell/REMOVE_PLAYER_CLASS'
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
    default:
      return state;
  }
}

export const actions = {
  addPlayerClass: (className: string) => ({ type: types.ADD_PLAYER_CLASS, className }),
  removePlayerClass: (className: string) => ({ type: types.REMOVE_PLAYER_CLASS, className })
}
