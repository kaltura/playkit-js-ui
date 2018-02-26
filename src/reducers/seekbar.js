//@flow
export const types = {
  UPDATE_SEEKBAR_DRAGGING_STATUS: 'seekbar/UPDATE_SEEKBAR_DRAGGING_STATUS',
  UPDATE_SEEKBAR_HOVER_ACTIVE: 'seekbar/UPDATE_SEEKBAR_HOVER_ACTIVE',
  UPDATE_CURRENT_TIME: 'seekbar/UPDATE_CURRENT_TIME',
  UPDATE_DURATION: 'seekbar/UPDATE_DURATION',
};

export const initialState = {
  currentTime: 0,
  duration: 0,
  draggingActive: false,
  hoverActive: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_SEEKBAR_DRAGGING_STATUS:
      return {
        ...state,
        draggingActive: action.draggingActive
      };

    case types.UPDATE_SEEKBAR_HOVER_ACTIVE:
      return {
        ...state,
        hoverActive: action.hoverActive
      };

    case types.UPDATE_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.currentTime
      };

    case types.UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration
      };

    default:
      return state;
  }
}

export const actions = {
  updateSeekbarDraggingStatus: (draggingActive: boolean) => ({
    type: types.UPDATE_SEEKBAR_DRAGGING_STATUS,
    draggingActive
  }),
  updateSeekbarHoverActive: (hoverActive: boolean) => ({
    type: types.UPDATE_SEEKBAR_HOVER_ACTIVE,
    hoverActive
  }),
  updateDuration: (duration: number) => ({type: types.UPDATE_DURATION, duration}),
  updateCurrentTime: (currentTime: number) => ({type: types.UPDATE_CURRENT_TIME, currentTime})
};
