//@flow
export const types = {
  UPDATE_BOTTOM_BAR_HEIGHT: 'top-bar/UPDATE_BOTTOM_BAR_HEIGHT'
};

export const initialState = {
  bottomBarHeight: 0
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_BOTTOM_BAR_HEIGHT:
      return {
        ...state,
        bottomBarHeight: action.bottomBarHeight
      };

    default:
      return state;
  }
};

export const actions = {
  updateBottomBarHeight: (bottomBarHeight: boolean) => ({
    type: types.UPDATE_BOTTOM_BAR_HEIGHT,
    bottomBarHeight
  })
};
