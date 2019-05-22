//@flow
import {mergeDeep} from '../utils/merge-deep';

export const types = {
  UPDATE: 'config/UPDATE',
  ADD_EXTERNAL_PRESET_COMPONENT: 'config/ADD_EXTERNAL_PRESET_COMPONENT',
  UPDATE_COMPONENT: 'config/UPDATE_COMPONENT',
  RESET: 'config/RESET'
};

export const initialState = {
  forceTouchUI: false,
  components: {
    watermark: {},
    seekbar: {},
    vrStereo: {},
    share: {}
  },
  externalPresetComponents: []
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE: {
      const config = mergeDeep({}, state, action.config);
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
          [action.componentAlias]: mergeDeep({}, state.components[action.componentAlias], action.config)
        }
      };
    }
    case types.ADD_EXTERNAL_PRESET_COMPONENT: {
      return {
        ...state,
        externalPresetComponents: [...state.externalPresetComponents, action.externalPresetComponent]
      };
    }
    default:
      return state;
  }
};

export const actions = {
  addExternalPresetComponent: (externalPresetComponent: ExternalPresetComponent) => ({
    type: types.ADD_EXTERNAL_PRESET_COMPONENT,
    externalPresetComponent
  }),
  updateConfig: (config: Object) => ({type: types.UPDATE, config}),
  updateComponentConfig: (componentAlias: string, config: Object) => ({
    type: types.UPDATE_COMPONENT,
    componentAlias,
    config
  })
};
