//@flow

export const types = {
  ADD_PLAYER_CLASS: 'shell/ADD_PLAYER_CLASS',
  REMOVE_PLAYER_CLASS: 'shell/REMOVE_PLAYER_CLASS',
  UPDATE_IS_MOBILE: 'shell/UPDATE_IS_MOBILE',
  UPDATE_PRE_PLAYBACK: 'shell/UPDATE_PRE_PLAYBACK',
  UPDATE_PLAYER_WIDTH: 'shell/UPDATE_PLAYER_WIDTH',
  UPDATE_DOCUMENT_WIDTH: 'shell/UPDATE_DOCUMENT_WIDTH',
  UPDATE_PLAYER_HOVER_STATE: 'shell/UPDATE_PLAYER_HOVER_STATE'
}

export const initialState = {
  playerClasses: [],
  prePlayback: true,
  is_ad: true,
  playerHover: false
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

    case types.UPDATE_PLAYER_WIDTH:
      return {
        ...state,
        playerWidth: action.playerWidth
      }

    case types.UPDATE_DOCUMENT_WIDTH:
      return {
        ...state,
        documentWidth: action.documentWidth
      }

    case types.UPDATE_PLAYER_HOVER_STATE:
      return {
        ...state,
        playerHover: action.hover
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
  updatePlayerWidth: (playerWidth: number) => ({ type: types.UPDATE_PLAYER_WIDTH, playerWidth }),
  updateDocumentWidth: (documentWidth: number) => ({ type: types.UPDATE_DOCUMENT_WIDTH, documentWidth }),
  updatePlayerHoverState: (hover: boolean) => ({ type: types.UPDATE_PLAYER_HOVER_STATE, hover })
}
