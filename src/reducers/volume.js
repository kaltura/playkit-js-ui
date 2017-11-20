//@flow
export const types = {
  UPDATE_VOLUME: 'volume/UPDATE_VOLUME',
  UPDATE_VOLUME_DRAGGING_STATUS: 'volume/UPDATE_VOLUME_DRAGGING_STATUS',
  UPDATE_MUTED: 'volume/UPDATE_MUTED'
};

export const initialState = {
  draggingActive: false,
  volume: 1,
  muted: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_VOLUME:
      return {
        ...state,
        volume: action.volume
      };

    case types.UPDATE_VOLUME_DRAGGING_STATUS:
      return {
        ...state,
        draggingActive: action.draggingActive
      };

    case types.UPDATE_MUTED:
      return {
        ...state,
        muted: action.muted
      };

    default:
      return state;
  }
}

export const actions = {
  updateVolume: (volume: number) => ({type: types.UPDATE_VOLUME, volume}),
  updateVolumeDraggingStatus: (draggingActive: boolean) => ({
    type: types.UPDATE_VOLUME_DRAGGING_STATUS,
    draggingActive
  }),
  updateMuted: (muted: boolean) => ({type: types.UPDATE_MUTED, muted})
};
