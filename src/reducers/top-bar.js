//@flow
export const types = {
  UPDATE_TOP_BAR_HEIGHT: 'top-bar/UPDATE_TOP_BAR_HEIGHT'
};

export const initialState = {
  topBarHeight: 0
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_TOP_BAR_HEIGHT:
      return {
        ...state,
        topBarHeight: action.topBarHeight
      };

    default:
      return state;
  }
};

export const actions = {
  updateTopBarHeight: (topBarHeight: boolean) => ({
    type: types.UPDATE_TOP_BAR_HEIGHT,
    topBarHeight
  })
};
