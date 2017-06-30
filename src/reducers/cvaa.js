//@flow

export const types = {
  TOGGLE_CVAA_OVERLAY: 'cvaa/TOGGLE_CVAA_OVERLAY',
  UPDATE_CAPTIONS_STYLE: 'cvaa/UPDATE_CAPTIONS_STYLE'
}

export const initialState = {
  overlayOpen: false,
  style: 'default'
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.TOGGLE_CVAA_OVERLAY:
      return {
        ...state,
        overlayOpen: action.show
      }

    case types.UPDATE_CAPTIONS_STYLE:
      return {
        ...state,
        style: action.style
      }

    default:
      return state;
  }
}

export const actions = {
  toggleCVAAOverlay: (show: boolean) => ({ type: types.TOGGLE_CVAA_OVERLAY, show }),
  updateCaptionsStyle: (style: string) => ({ type: types.UPDATE_CAPTIONS_STYLE, style })
}
