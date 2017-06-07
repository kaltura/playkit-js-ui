//@flow

export const types = {
  UPDATE_SEEKBAR_DRAGGING_STATUS: 'seekbar/UPDATE_SEEKBAR_DRAGGING_STATUS',
  UPDATE_SEEKBAR_VIRTUAL_PROGRESS: 'seekbar/UPDATE_SEEKBAR_VIRTUAL_PROGRESS',
  UPDATE_CURRENT_TIME: 'seekbar/UPDATE_CURRENT_TIME',
  UPDATE_DURATION: 'seekbar/UPDATE_DURATION'
}

export const initialState = {
	currentTime: 0,
  virtualTime: 0,
  duration: 0,
  draggingActive: false
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

    case types.UPDATE_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.currentTime
      }

    case types.UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration
      }

    default:
      return state;
  }
}

export const actions = {
  updateSeekbarDraggingStatus: (draggingActive: boolean) => ({ type: types.UPDATE_SEEKBAR_DRAGGING_STATUS, draggingActive }),
  updateDuration: (duration: number) => ({ type: types.UPDATE_DURATION, duration }),
  updateVirtualTime: (virtualTime: number) => ({ type: types.UPDATE_SEEKBAR_VIRTUAL_PROGRESS, virtualTime }),
  updateCurrentTime: (currentTime: number) => ({ type: types.UPDATE_CURRENT_TIME, currentTime })
}
