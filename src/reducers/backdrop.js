//@flow
export const types = {
  UPDATE_BACKDROP_VISIBILITY: 'backdrop/UPDATE_BACKDROP_VISIBILITY',
};

export const initialState = {
  show: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_BACKDROP_VISIBILITY:
      return {
        ...state,
        show: action.show
      };

    default:
      return state;
  }
}

export const actions = {
  updateBackdropVisibility: (show: boolean) => ({type: types.UPDATE_BACKDROP_VISIBILITY, show})
};
