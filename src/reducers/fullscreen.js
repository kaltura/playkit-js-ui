//@flow
export const types = {
  UPDATE_FULLSCREEN: 'fullscreen/UPDATE_FULLSCREEN',
  UPDATE_IOS_FULLSCREEN: 'fullscreen/UPDATE_IOS_FULLSCREEN'
};

export const initialState = {
  fullscreen: false,
  iOSFullscreen: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_FULLSCREEN:
      return {
        ...state,
        fullscreen: action.fullscreen
      };
    case types.UPDATE_IOS_FULLSCREEN:
      return {
        ...state,
        iOSFullscreen: action.iOSFullscreen
      };
    default:
      return state;
  }
}

export const actions = {
  updateFullscreen: (fullscreen: boolean) => ({type: types.UPDATE_FULLSCREEN, fullscreen}),
  updateIosFullscreen: (iOSFullscreen: boolean) => ({type: types.UPDATE_IOS_FULLSCREEN, iOSFullscreen})
};
