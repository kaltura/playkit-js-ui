/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {SettingsState} from '../types/reducers/settings';

export const types = {
  UPDATE_QUALITY: 'settings/UPDATE_QUALITY',
  UPDATE_SPEED: 'settings/UPDATE_SPEED',
  UPDATE_AUDIO: 'settings/UPDATE_AUDIO',
  UPDATE_ADVANCED_AUDIO_DESC: 'settings/UPDATE_ADVANCED_AUDIO_DESC'
};

export const initialState = {
  quality: 1,
  speed: 2,
  advancedAudioDesc: false
};

export default (state: SettingsState = initialState, action: any) => {
  switch (action.type) {
  case types.UPDATE_QUALITY:
    return {
      ...state,
      quality: action.quality
    };

  case types.UPDATE_SPEED:
    return {
      ...state,
      speed: action.speed
    };

  case types.UPDATE_AUDIO:
    return {
      ...state,
      audio: action.audio
    };

  case types.UPDATE_ADVANCED_AUDIO_DESC:
    return {
      ...state,
      advancedAudioDesc: action.isChecked
    };

  default:
    return state;
  }
};

export const actions = {
  updateQuality: (quality: string) => ({type: types.UPDATE_QUALITY, quality}),
  updateSpeed: (speed: string) => ({type: types.UPDATE_SPEED, speed}),
  updateAudio: (audio: string) => ({type: types.UPDATE_AUDIO, audio}),
  updateAdvancedAudioDesc: (isChecked: boolean) => ({type: types.UPDATE_ADVANCED_AUDIO_DESC, isChecked})
};
