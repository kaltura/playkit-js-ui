//@flow
export const types = {
  UPDATE_MENU_OPEN: 'language/UPDATE_MENU_OPEN'
};

export const initialState = {
  menuOpen: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
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
  updateLanguageMenuOpen: (menuOpen: boolean) => ({type: types.UPDATE_MENU_OPEN, menuOpen})
};
