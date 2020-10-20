//@flow
export const types = {
  UPDATE_BOTTOM_BAR_SIZE: 'top-bar/UPDATE_BOTTOM_BAR_SIZE'
};

export const initialState = {
  bottomBarSize: 0
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_BOTTOM_BAR_SIZE:
      return {
        ...state,
        bottomBarSize: action.bottomBarSize
      };

    default:
      return state;
  }
};

export const actions = {
  updateBottomBarSize: (bottomBarSize: boolean) => ({
    type: types.UPDATE_BOTTOM_BAR_SIZE,
    bottomBarSize
  })
};
