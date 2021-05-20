//@flow

export const types = {
  UPDATE_CAPTIONS_STYLE: 'cvaa/UPDATE_CAPTIONS_STYLE'
};

export const initialState = {
  style: 'default'
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_CAPTIONS_STYLE:
      return {
        ...state,
        style: action.style
      };

    default:
      return state;
  }
};

export const actions = {
  updateCaptionsStyle: (style: string) => ({type: types.UPDATE_CAPTIONS_STYLE, style})
};
