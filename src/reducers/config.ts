/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {mergeDeep} from '../utils/merge-deep';
import {UIOptionsObject} from '../types';
import {ConfigState} from '../types/reducers/config';

export const types = {
  UPDATE: 'config/UPDATE',
  UPDATE_COMPONENT: 'config/UPDATE_COMPONENT',
  RESET: 'config/RESET'
};

export const initialState = {
  targetId: undefined as unknown as string,
  forceTouchUI: false,
  showCCButton: true,
  openMenuFromCCCButton: false,
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
    watermark: {} as any,
    seekbar: {} as any,
    vrStereo: {} as any,
    logo: {} as any,
    fullscreen: {} as any,
    sidePanels: {} as any
  }
};

export default (state: ConfigState = initialState, action: any) => {
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
          [action.componentAlias]: mergeDeep({}, state.components![action.componentAlias], action.config)
        }
      };
    }
    default:
      return state;
  }
};

export const actions = {
  updateConfig: (config: any) => ({type: types.UPDATE, config}),
  updateComponentConfig: (componentAlias: string, config: UIOptionsObject) => ({
    type: types.UPDATE_COMPONENT,
    componentAlias,
    config
  })
};
