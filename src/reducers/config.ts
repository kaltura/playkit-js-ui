/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {mergeDeep} from '../utils/merge-deep';
import {UIOptionsObject} from '../types';
import {ConfigState} from '../types/reducers/config';
import {MediaInfoDetailsMode, MediaInfoPosition} from '../types';

export const types = {
  UPDATE: 'config/UPDATE',
  UPDATE_COMPONENT: 'config/UPDATE_COMPONENT',
  RESET: 'config/RESET'
};

export const initialState = {
  targetId: undefined as unknown as string,
  forceTouchUI: false,
  allowPlayPause: true,
  allowLivePlayPause: true,
  showCCButton: true,
  showTitleOnUpperBar: false,
  showAudioButton: true,
  showAudioDescriptionButton: true,
  showSpeedButton: false,
  showQualityButton: false,
  openMenuFromCCButton: false,
  openMenuFromAudioDescriptionButton: true,
  settings: {
    showAudioMenu: false,
    showCaptionsMenu: true,
    showQualityMenu: true,
    showSpeedMenu: true,
    showAdvancedCaptionsMenu: true,
    showAudioDescriptionMenu: false
  },
  seekSeconds: 10,
  hoverTimeout: 3000,
  tinySizeDisabled: false,
  showMediaInfo: {
    showDuration: false,
    detailsMode: MediaInfoDetailsMode.None,
    position: MediaInfoPosition.Bottom
  },
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
