/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {VolumeState} from '../types/reducers/voluem';

export const types = {
  UPDATE_VOLUME_DRAGGING_STATUS: 'volume/UPDATE_VOLUME_DRAGGING_STATUS',
  UPDATE_HOVER: 'volume/UPDATE_HOVER'
};

export const initialState = {
  draggingActive: false,
  hover: false
};

export default (state: VolumeState = initialState, action: any) => {
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
};

export const actions = {
  updateVolumeDraggingStatus: (draggingActive: boolean): any => ({
    type: types.UPDATE_VOLUME_DRAGGING_STATUS,
    draggingActive
  }),
  updateVolumeHover: (hover: boolean): any => ({type: types.UPDATE_HOVER, hover})
};
