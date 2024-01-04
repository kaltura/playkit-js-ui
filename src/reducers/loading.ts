/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {types as configReducerTypes} from './config';
import {getComponentStateFromConfig, getComponentStateFromComponentConfig} from '../utils/component-config';
import {LoadingState} from '../types/reducers/loading';

const component = 'loading';

export const types = {
  UPDATE_LOADING_SPINNER_STATE: `${component}/UPDATE_LOADING_SPINNER_STATE`
};

export const initialState = {
  show: false
};

export default (state: LoadingState = initialState, action: any) => {
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
