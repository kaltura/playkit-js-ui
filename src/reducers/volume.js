//@flow
export const types = {
  UPDATE_VOLUME_DRAGGING_STATUS: 'volume/UPDATE_VOLUME_DRAGGING_STATUS',
  UPDATE_HOVER: 'volume/UPDATE_HOVER'
};

export const initialState = {
  draggingActive: false,
  hover: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_VOLUME_DRAGGING_STATUS:
      return {
        ...state,
        draggingActive: action.draggingActive
      };

    case types.UPDATE_HOVER:
      return {
        ...state,
        hover: action.hover
      };

    default:
      return state;
  }
}

export const actions = {
  updateVolumeDraggingStatus: (draggingActive: boolean) => ({
    type: types.UPDATE_VOLUME_DRAGGING_STATUS,
    draggingActive
  }),
  updateVolumeHover: (hover: boolean) => ({type: types.UPDATE_HOVER, hover})
};
