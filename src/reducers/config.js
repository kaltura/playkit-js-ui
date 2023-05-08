//@flow
import {mergeDeep} from '../utils/merge-deep';

export const types = {
  UPDATE: 'config/UPDATE',
  UPDATE_COMPONENT: 'config/UPDATE_COMPONENT',
  RESET: 'config/RESET'
};

export const initialState = {
  forceTouchUI: false,
  showCCButton: true,
  settings: {
    showAudioMenu: true,
    showCaptionsMenu: true,
    showQualityMenu: true,
    showSpeedMenu: true,
    showAdvancedAudioDescToggle: false,
    showAdvancedCaptionsMenu: true
  },
  hoverTimeout: 3000,
  components: {
    watermark: {},
    seekbar: {},
    vrStereo: {},
    logo: {},
    fullscreen: {},
    sidePanels: {}
  }
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
    default:
      return state;
  }
};

export const actions = {
  updateConfig: (config: Object) => ({type: types.UPDATE, config}),
  updateComponentConfig: (componentAlias: string, config: Object) => ({
    type: types.UPDATE_COMPONENT,
    componentAlias,
    config
  })
};
