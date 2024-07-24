/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {BottomBarState} from '../types/reducers/bottom-bar';

export const types = {
  UPDATE_CONTROLS_TO_MOVE: 'bottom-bar/UPDATE_CONTROLS_TO_MOVE'
};

export const initialState = {
  controlsToMove: []
};

export default (state: BottomBarState = initialState, action: any) => {
  switch (action.type) {
    case types.UPDATE_CONTROLS_TO_MOVE:
      return {
        ...state,
        controlsToMove: action.controlsToMove
      };

    default:
      return state;
  }
};

export const actions = {
  updateControlsToMove: (controlsToMove: string[]) => ({type: types.UPDATE_CONTROLS_TO_MOVE, controlsToMove})
};
