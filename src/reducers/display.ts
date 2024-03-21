import { BottomBarControls, DisplayState } from "../types/reducers/display";

export const types = {
  UPDATE_BOTTOM_BAR_CONTROLS_DISPLAY_STATUS: 'config/UPDATE_BOTTOM_BAR_CONTROLS_DISPLAY_STATUS'
};

export const initialState = {
  bottomBarControls: {
    leftControls: {} as {[controlName: string]: boolean},
    rightControls: {AdvancedAudioDesc: false}
  }
};

export default (state: DisplayState = initialState, action: any) => {
  switch (action.type) {
    case types.UPDATE_BOTTOM_BAR_CONTROLS_DISPLAY_STATUS: {
      return {
        ...state,
        bottomBarControls: {
          ...action.bottomBarControls
        }
      };
    }
    default:
      return state;
  }
};

export const actions = {
  updateBottomBarDisplayStatus: (bottomBarControls: BottomBarControls) => ({type: types.UPDATE_BOTTOM_BAR_CONTROLS_DISPLAY_STATUS, bottomBarControls})
};
