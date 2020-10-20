//@flow
export const types = {
  UPDATE_TOP_BAR_SIZE: 'top-bar/UPDATE_TOP_BAR_SIZE'
};

export const initialState = {
  topBarSize: 0
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_TOP_BAR_SIZE:
      return {
        ...state,
        topBarSize: action.topBarSize
      };

    default:
      return state;
  }
};

export const actions = {
  updateTopBarSize: (topBarSize: boolean) => ({
    type: types.UPDATE_TOP_BAR_SIZE,
    topBarSize
  })
};
