//@flow
export const types = {
  ADD_PLAYER_CLASS: 'shell/ADD_PLAYER_CLASS',
  REMOVE_PLAYER_CLASS: 'shell/REMOVE_PLAYER_CLASS',
  UPDATE_IS_MOBILE: 'shell/UPDATE_IS_MOBILE',
  UPDATE_PLAYER_SIZE: 'shell/UPDATE_PLAYER_SIZE',
  UPDATE_PLAYER_CLIENT_RECT: 'shell/UPDATE_PLAYER_CLIENT_RECT',
  UPDATE_DOCUMENT_WIDTH: 'shell/UPDATE_DOCUMENT_WIDTH',
  UPDATE_PLAYER_HOVER_STATE: 'shell/UPDATE_PLAYER_HOVER_STATE',
  UPDATE_PLAYER_NAV_STATE: 'shell/UPDATE_PLAYER_NAV_STATE',
  UPDATE_BOTTOM_BAR_HOVER_ACTIVE: 'shell/UPDATE_BOTTOM_BAR_HOVER_ACTIVE',
  UPDATE_SMART_CONTAINER_OPEN: 'shell/UPDATE_SMART_CONTAINER_OPEN',
  UPDATE_PRESET_NAME: 'shell/UPDATE_PRESET_NAME'
};

export const initialState = {
  playerClasses: [],
  playerHover: false,
  playerNav: false,
  smartContainerOpen: false,
  presetName: ''
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.ADD_PLAYER_CLASS:
      if (state.playerClasses.includes(action.className)) return state;
      return {
        ...state,
        playerClasses: [...state.playerClasses, action.className]
      };

    case types.REMOVE_PLAYER_CLASS:
      return {
        ...state,
        playerClasses: state.playerClasses.filter(c => c !== action.className)
      };

    case types.UPDATE_IS_MOBILE:
      return {
        ...state,
        isMobile: action.isMobile
      };

    case types.UPDATE_PLAYER_SIZE:
      return {
        ...state,
        playerSize: action.playerSize
      };

    case types.UPDATE_PLAYER_CLIENT_RECT:
      return {
        ...state,
        playerClientRect: action.playerClientRect
      };

    case types.UPDATE_DOCUMENT_WIDTH:
      return {
        ...state,
        documentWidth: action.documentWidth
      };

    case types.UPDATE_PLAYER_HOVER_STATE:
      return {
        ...state,
        playerHover: action.hover
      };

    case types.UPDATE_PLAYER_NAV_STATE:
      return {
        ...state,
        playerNav: action.nav
      };

    case types.UPDATE_BOTTOM_BAR_HOVER_ACTIVE:
      return {
        ...state,
        bottomBarHoverActive: action.active
      };

    case types.UPDATE_SMART_CONTAINER_OPEN:
      return {
        ...state,
        smartContainerOpen: action.open
      };

    case types.UPDATE_PRESET_NAME:
      return {
        ...state,
        presetName: action.presetName
      };

    default:
      return state;
  }
};

export const actions = {
  addPlayerClass: (className: string) => ({type: types.ADD_PLAYER_CLASS, className}),
  removePlayerClass: (className: string) => ({type: types.REMOVE_PLAYER_CLASS, className}),
  updateIsMobile: (isMobile: boolean) => ({type: types.UPDATE_IS_MOBILE, isMobile}),
  updatePlayerSize: (playerSize: string) => ({type: types.UPDATE_PLAYER_SIZE, playerSize}),
  updatePlayerClientRect: (playerClientRect: Object) => ({type: types.UPDATE_PLAYER_CLIENT_RECT, playerClientRect}),
  updateDocumentWidth: (documentWidth: number) => ({type: types.UPDATE_DOCUMENT_WIDTH, documentWidth}),
  updatePlayerHoverState: (hover: boolean) => ({type: types.UPDATE_PLAYER_HOVER_STATE, hover}),
  updatePlayerNavState: (nav: boolean) => ({type: types.UPDATE_PLAYER_NAV_STATE, nav}),
  updateBottomBarHoverActive: (active: boolean) => ({type: types.UPDATE_BOTTOM_BAR_HOVER_ACTIVE, active}),
  updateSmartContainerOpen: (open: boolean) => ({type: types.UPDATE_SMART_CONTAINER_OPEN, open}),
  updatePresetName: (presetName: string) => ({type: types.UPDATE_PRESET_NAME, presetName})
};
