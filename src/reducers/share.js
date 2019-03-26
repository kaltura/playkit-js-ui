//@flow
import {types as configReducerTypes} from './config';
import {getComponentStateFromComponentConfig, getComponentStateFromConfig} from '../utils/component-config';

const component = 'share';
export const types = {
  TOGGLE_SHARE_OVERLAY: 'share/TOGGLE_SHARE_OVERLAY'
};

export const initialState = {
  overlayOpen: false,
  config: {}
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case configReducerTypes.UPDATE:
      return getComponentStateFromConfig(component, state, action);

    case configReducerTypes.UPDATE_COMPONENT:
      return getComponentStateFromComponentConfig(component, state, action);

    case types.TOGGLE_SHARE_OVERLAY:
      return {
        ...state,
        overlayOpen: action.show
      };

    default:
      return state;
  }
};

export const actions = {
  toggleShareOverlay: (show: boolean) => ({type: types.TOGGLE_SHARE_OVERLAY, show})
};
