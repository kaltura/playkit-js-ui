//@flow

import {getComponentStateFromComponentConfig, getComponentStateFromConfig} from "../utils/component-config";
import {types as configReducerTypes} from "./config";

const component = 'stereo';

export const types = {
  UPDATE_STEREO_MODE: `${component}/UPDATE_STEREO_MODE`
};

export const initialState = {
  stereoMode: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case configReducerTypes.UPDATE:
      return getComponentStateFromConfig(component, state, action);

    case configReducerTypes.UPDATE_COMPONENT:
      return getComponentStateFromComponentConfig(component, state, action);

    case types.UPDATE_STEREO_MODE:
      return {
        ...state,
        stereoMode: action.stereoMode
      };

    default:
      return state;
  }
}

export const actions = {
  updateStereoMode: (stereoMode: boolean) => ({type: types.UPDATE_STEREO_MODE, stereoMode})
};
