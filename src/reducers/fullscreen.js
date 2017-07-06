//@flow
export const types = {
  UPDATE_FULLSCREEN: 'fullscreen/UPDATE_FULLSCREEN'
}

export const initialState = {
  fullscreen: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_FULLSCREEN:
      return {
        ...state,
        fullscreen: action.fullscreen
      }
    default:
      return state;
  }
}

export const actions = {
  updateFullscreen: (fullscreen: boolean) => ({ type: types.UPDATE_FULLSCREEN, fullscreen })
}
