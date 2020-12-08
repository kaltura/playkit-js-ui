//@flow
export const types = {
  UPDATE_SEEKBAR_DRAGGING_STATUS: 'seekbar/UPDATE_SEEKBAR_DRAGGING_STATUS',
  UPDATE_SEEKBAR_HOVER_ACTIVE: 'seekbar/UPDATE_SEEKBAR_HOVER_ACTIVE',
  UPDATE_SEEKBAR_PREVIEW_HOVER_ACTIVE: 'seekbar/UPDATE_SEEKBAR_PREVIEW_HOVER_ACTIVE',
  UPDATE_SEEKBAR_CLIENT_RECT: 'seekbar/UPDATE_SEEKBAR_CLIENT_RECT',
  UPDATE_HIDE_SEEKBAR_PREVIEW: 'seekbar/UPDATE_HIDE_SEEKBAR_PREVIEW',
  UPDATE_HIDE_SEEKBAR_TIME_BUBBLE: 'seekbar/UPDATE_HIDE_SEEKBAR_TIME_BUBBLE',
  UPDATE_CURRENT_TIME: 'seekbar/UPDATE_CURRENT_TIME',
  UPDATE_VIRTUAL_TIME: 'seekbar/UPDATE_VIRTUAL_TIME',
  UPDATE_DURATION: 'seekbar/UPDATE_DURATION'
};

export const initialState = {
  currentTime: 0,
  virtualTime: 0,
  duration: 0,
  draggingActive: false,
  hoverActive: false,
  previewHoverActive: false,
  clientRect: {x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0},
  hidePreview: false,
  hideTimeBubble: false
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

    case types.UPDATE_SEEKBAR_PREVIEW_HOVER_ACTIVE:
      return {
        ...state,
        previewHoverActive: action.previewHoverActive
      };

    case types.UPDATE_SEEKBAR_CLIENT_RECT:
      return {
        ...state,
        clientRect: action.clientRect
      };

    case types.UPDATE_HIDE_SEEKBAR_PREVIEW:
      return {
        ...state,
        hidePreview: action.hidePreview
      };

    case types.UPDATE_HIDE_SEEKBAR_TIME_BUBBLE:
      return {
        ...state,
        hideTimeBubble: action.hideTimeBubble
      };

    case types.UPDATE_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.currentTime
      };

    case types.UPDATE_VIRTUAL_TIME:
      return {
        ...state,
        virtualTime: action.virtualTime
      };

    case types.UPDATE_DURATION:
      return {
        ...state,
        duration: action.duration
      };

    default:
      return state;
  }
};

export const actions = {
  updateSeekbarDraggingStatus: (draggingActive: boolean) => ({
    type: types.UPDATE_SEEKBAR_DRAGGING_STATUS,
    draggingActive
  }),
  updateSeekbarHoverActive: (hoverActive: boolean) => ({
    type: types.UPDATE_SEEKBAR_HOVER_ACTIVE,
    hoverActive
  }),
  updateSeekbarPreviewHoverActive: (previewHoverActive: boolean) => ({
    type: types.UPDATE_SEEKBAR_PREVIEW_HOVER_ACTIVE,
    previewHoverActive
  }),
  updateSeekbarClientRect: (clientRect: Object) => ({type: types.UPDATE_SEEKBAR_CLIENT_RECT, clientRect}),
  updateHideSeekbarPreview: (hidePreview: boolean) => ({
    type: types.UPDATE_HIDE_SEEKBAR_PREVIEW,
    hidePreview
  }),
  updateHideSeekbarTimeBubble: (hideTimeBubble: boolean) => ({
    type: types.UPDATE_HIDE_SEEKBAR_TIME_BUBBLE,
    hideTimeBubble
  }),
  updateDuration: (duration: number) => ({type: types.UPDATE_DURATION, duration}),
  updateCurrentTime: (currentTime: number) => ({type: types.UPDATE_CURRENT_TIME, currentTime}),
  updateVirtualTime: (virtualTime: number) => ({type: types.UPDATE_VIRTUAL_TIME, virtualTime})
};
