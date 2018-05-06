//@flow
import {types as configReducerTypes} from './config';
import {getComponentStateFromConfig} from '../utils/component-config';
import {getComponentStateFromComponentConfig} from '../utils/component-config';

const component = 'fullscreen';

export const types = {
  UPDATE_FULLSCREEN: `${component}/UPDATE_FULLSCREEN`
};

export const initialState = {
  fullscreen: false,
  inBrowserFullscreenForIOS: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case configReducerTypes.UPDATE:
      return getComponentStateFromConfig(component, state, action);

    case configReducerTypes.UPDATE_COMPONENT:
      return getComponentStateFromComponentConfig(component, state, action);

    case types.UPDATE_FULLSCREEN:
      return {
        ...state,
        fullscreen: action.fullscreen
      };

    default:
      return state;
  }
}

export const actions = {
  updateFullscreen: (fullscreen: boolean) => ({type: types.UPDATE_FULLSCREEN, fullscreen})
};
