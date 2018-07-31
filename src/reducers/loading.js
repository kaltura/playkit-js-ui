//@flow
import {types as configReducerTypes} from './config';
import {getComponentStateFromConfig, getComponentStateFromComponentConfig} from '../utils/component-config';

const component = 'loading';

export const types = {
  UPDATE_LOADING_SPINNER_STATE: `${component}/UPDATE_LOADING_SPINNER_STATE`
};

export const initialState = {
  show: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case configReducerTypes.UPDATE:
      return getComponentStateFromConfig(component, state, action);

    case configReducerTypes.UPDATE_COMPONENT:
      return getComponentStateFromComponentConfig(component, state, action);

    case types.UPDATE_LOADING_SPINNER_STATE:
      return {
        ...state,
        show: action.show
      };

    default:
      return state;
  }
};

export const actions = {
  updateLoadingSpinnerState: (show: boolean) => ({type: types.UPDATE_LOADING_SPINNER_STATE, show})
};
