//@flow
import {Utils} from 'playkit-js';

export const types = {
  UPDATE: 'config/UPDATE',
  UPDATE_COMPONENT: 'config/UPDATE_COMPONENT',
  RESET: 'config/RESET'
};

export const initialState = {
  ui: {
    seekbar: {},
    shell: {},
    errorOverlay: {}
  }
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE: {
      const config = Utils.Object.mergeDeep(state, action.config);
      return {
        ...state,
        ...config
      };
    }
    case types.UPDATE_COMPONENT: {
      return {
        ...state,
        ui: {
          ...state.ui,
          [action.componentAlias]: Utils.Object.mergeDeep(state.ui[action.componentAlias], action.config)
        }
      };
    }
    default:
      return state;
  }
}

export const actions = {
  updateConfig: (config: Object) => ({type: types.UPDATE, config}),
  updateComponentConfig: (componentAlias: string, config: Object) => ({
    type: types.UPDATE_COMPONENT,
    componentAlias,
    config
  })
};
