//@flow
export const types = {
  TOGGLE_SHARE_OVERLAY: 'share/TOGGLE_SHARE_OVERLAY'
};

export const initialState = {
  overlayOpen: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.TOGGLE_SHARE_OVERLAY:
      return {
        ...state,
        overlayOpen: action.show
      };

    default:
      return state;
  }
}

export const actions = {
  toggleShareOverlay: (show: boolean) => ({type: types.TOGGLE_SHARE_OVERLAY, show})
};
