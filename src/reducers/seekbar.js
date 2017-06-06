//@flow

export const types = {
  UPDATE_SEEKBAR_DRAGGING_STATUS: 'seekbar/UPDATE_SEEKBAR_DRAGGING_STATUS',
  UPDATE_SEEKBAR_VIRTUAL_PROGRESS: 'seekbar/UPDATE_SEEKBAR_VIRTUAL_PROGRESS'
}

export const initialState = {
	draggingActive: false,
  virtualTime: 0
}

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_SEEKBAR_DRAGGING_STATUS:
      return {
        ...state,
        draggingActive: action.draggingActive
      }

    case types.UPDATE_SEEKBAR_VIRTUAL_PROGRESS:
      return {
        ...state,
        virtualTime: action.virtualTime
      }

    default:
      return state;
  }
}

export const actions = {
  updateSeekbarDraggingStatus: (draggingActive: boolean) => ({ type: types.UPDATE_SEEKBAR_DRAGGING_STATUS, draggingActive }),
  updateDuration: (duration: number) => ({ type: types.UPDATE_DURATION, duration }),
  updateVirtualTime: (virtualTime: number) => ({ type: types.UPDATE_SEEKBAR_VIRTUAL_PROGRESS, virtualTime })
}
