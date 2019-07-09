//@flow
export const types = {
  UPDATE_ACTION_ICON: 'overlay-action/UPDATE_ACTION_ICON'
};

export const initialState = {
  iconType: null
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_ACTION_ICON:
      return {
        ...state,
        iconType: action.iconType
      };

    default:
      return state;
  }
};

export const actions = {
  updateOverlayActionIcon: (iconType: string | Array<string>) => ({type: types.UPDATE_ACTION_ICON, iconType})
};
