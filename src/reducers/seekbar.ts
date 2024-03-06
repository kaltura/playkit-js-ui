/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {SeekbarState} from '../types/reducers/seekbar';

const entityName = 'seekbar';

export const types = {
  UPDATE_SEEKBAR_DRAGGING_STATUS: `${entityName}/UPDATE_SEEKBAR_DRAGGING_STATUS`,
  UPDATE_SEEKBAR_HOVER_ACTIVE: `${entityName}/UPDATE_SEEKBAR_HOVER_ACTIVE`,
  UPDATE_SEEKBAR_PREVIEW_HOVER_ACTIVE: `${entityName}/UPDATE_SEEKBAR_PREVIEW_HOVER_ACTIVE`,
  UPDATE_SEEKBAR_CLIENT_RECT: `${entityName}/UPDATE_SEEKBAR_CLIENT_RECT`,
  UPDATE_HIDE_SEEKBAR_PREVIEW: `${entityName}/UPDATE_HIDE_SEEKBAR_PREVIEW`,
  UPDATE_HIDE_SEEKBAR_TIME_BUBBLE: `${entityName}/UPDATE_HIDE_SEEKBAR_TIME_BUBBLE`,
  UPDATE_CURRENT_TIME: `${entityName}/UPDATE_CURRENT_TIME`,
  UPDATE_VIRTUAL_TIME: `${entityName}/UPDATE_VIRTUAL_TIME`,
  UPDATE_HOVERED_SEGMENT: `${entityName}/UPDATE_HOVERED_SEGMENT`,
  UPDATE_SEEKBAR_SEGMENTS: `${entityName}/UPDATE_SEEKBAR_SEGMENTS`,
  UPDATE_SEGMENT_END_TIME: `${entityName}/UPDATE_SEGMENT_END_TIME`,
  ADD_SEEKBAR_CLASS: `${entityName}/ADD_SEEKBAR_CLASS`,
  REMOVE_SEEKBAR_CLASS: `${entityName}/REMOVE_SEEKBAR_CLASS`
};

export const initialState: SeekbarState = {
  currentTime: 0,
  virtualTime: 0,
  draggingActive: false,
  hoverActive: false,
  previewHoverActive: false,
  clientRect: {x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0},
  hidePreview: false,
  hideTimeBubble: false,
  segments: [],
  seekbarClasses: [],
};

export default (state: SeekbarState = initialState, action: any) => {
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

    case types.UPDATE_HOVERED_SEGMENT:
      return {
        ...state,
        segments: state.segments.map(segment => (segment.id === action.id ? {...segment, isHovered: action.isHovered} : segment))
      };

    case types.UPDATE_SEEKBAR_SEGMENTS:
      return {
        ...state,
        segments: action.segments
      };

    case types.UPDATE_SEGMENT_END_TIME:
      return {
        ...state,
        segments: state.segments.map(segment => (segment.id === action.id ? {...segment, endTime: action.endTime} : segment))
      };

    case types.ADD_SEEKBAR_CLASS:
      if (state.seekbarClasses.includes(action.className)) {
        return state;
      }
      return {
        ...state,
        seekbarClasses: [...state.seekbarClasses, action.className]
      };
    case types.REMOVE_SEEKBAR_CLASS:
      return {
        ...state,
        seekbarClasses: state.seekbarClasses.filter(c => c !== action.className)
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
  updateSeekbarClientRect: (clientRect: any) => ({type: types.UPDATE_SEEKBAR_CLIENT_RECT, clientRect}),
  updateHideSeekbarPreview: (hidePreview: boolean) => ({
    type: types.UPDATE_HIDE_SEEKBAR_PREVIEW,
    hidePreview
  }),
  updateHideSeekbarTimeBubble: (hideTimeBubble: boolean) => ({
    type: types.UPDATE_HIDE_SEEKBAR_TIME_BUBBLE,
    hideTimeBubble
  }),
  updateCurrentTime: (currentTime: number) => ({type: types.UPDATE_CURRENT_TIME, currentTime}),
  updateVirtualTime: (virtualTime: number) => ({type: types.UPDATE_VIRTUAL_TIME, virtualTime}),
  updateHoveredSegment: (id: string, isHovered: boolean) => ({type: types.UPDATE_HOVERED_SEGMENT, id, isHovered}),
  updateSegmentEndTime: (id: string, endTime: number) => ({type: types.UPDATE_SEGMENT_END_TIME, id, endTime}),
  updateSeekbarSegments: (segments: any[]) => ({type: types.UPDATE_SEEKBAR_SEGMENTS, segments}),
  addSeekbarClass: (className: string) => ({type: types.ADD_SEEKBAR_CLASS, className}),
  removeSeekbarClass: (className: string) => ({type: types.REMOVE_SEEKBAR_CLASS, className})
} as const;
