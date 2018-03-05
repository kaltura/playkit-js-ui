//@flow
import {Utils} from 'playkit-js';

export const types = {
  UPDATE: 'config/UPDATE',
  UPDATE_COMPONENT: 'config/UPDATE_COMPONENT',
  RESET: 'config/RESET'
};

export const initialState = {
  forceTouchUI: false,
  components: {
    watermark: {},
    seekbar: {},
    error: {}
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
        components: {
          ...state.components,
          [action.componentAlias]: Utils.Object.mergeDeep(state.components[action.componentAlias], action.config)
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
