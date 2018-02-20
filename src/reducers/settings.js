//@flow
export const types = {
  UPDATE_QUALITY: 'settings/UPDATE_QUALITY',
  UPDATE_SPEED: 'settings/UPDATE_SPEED',
  UPDATE_MENU_OPEN: 'settings/UPDATE_MENU_OPEN'
};

export const initialState = {
  quality: 1,
  speed: 2,
  menuOpen: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_QUALITY:
      return {
        ...state,
        quality: action.quality
      };

    case types.UPDATE_SPEED:
      return {
        ...state,
        speed: action.speed
      };

    case types.UPDATE_MENU_OPEN:
      return {
        ...state,
        menuOpen: action.menuOpen
      };

    default:
      return state;
  }
}

export const actions = {
  updateQuality: (quality: string) => ({type: types.UPDATE_QUALITY, quality}),
  updateSpeed: (speed: string) => ({type: types.UPDATE_SPEED, speed}),
  updateSettingsMenuOpen: (menuOpen: boolean) => ({type: types.UPDATE_MENU_OPEN, menuOpen})
};
