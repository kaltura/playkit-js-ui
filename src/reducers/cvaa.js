//@flow

export const types = {
  TOGGLE_CVAA_OVERLAY: 'share/TOGGLE_CVAA_OVERLAY'
}

export const initialState = {
  overlayOpen: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_CVAA_OVERLAY:
      return {
        ...state,
        overlayOpen: action.show
      }

    default:
      return state;
  }
}

export const actions = {
  toggleCVAAOverlay: (show: boolean) => ({ type: types.TOGGLE_CVAA_OVERLAY, show })
}
