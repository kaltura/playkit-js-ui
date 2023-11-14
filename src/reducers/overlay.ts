export const types = {
  UPDATE_OVERLAY: 'overlay/UPDATE_OVERLAY'
};

export const initialState = {
  isOpen: false
};

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case types.UPDATE_OVERLAY:
      return {
        ...state,
        isOpen: action.isOpen
      };

    default:
      return state;
  }
};

export const actions = {
  updateOverlay: (isOpen: boolean) => ({type: types.UPDATE_OVERLAY, isOpen})
};
