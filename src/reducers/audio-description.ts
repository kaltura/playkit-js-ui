/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {AUDIO_DESCRIPTION_ENABLED_STATE, AudioDescriptionState} from '../types/reducers/audio-description';

export const types = {
  UPDATE_AUDIO_DESCRIPTION_LANGUAGES: 'audio-description/UPDATE_AUDIO_DESCRIPTION_LANGUAGES',
  UPDATE_EXTENDED_AUDIO_DESCRIPTION_LANGUAGES: 'audio-description/UPDATE_EXTENDED_AUDIO_DESCRIPTION_LANGUAGES',
  UPDATE_AUDIO_DESCRIPTION_ENABLED: 'audio-description/UPDATE_AUDIO_DESCRIPTION'
};

export const initialState = {
  audioDescriptionLanguages: [],
  advancedAudioDescriptionLanguages: [],
  audioDescriptionEnabled: AUDIO_DESCRIPTION_ENABLED_STATE.DISABLE
};

export default (state: AudioDescriptionState = initialState, action: any) => {
  switch (action.type) {
    case types.UPDATE_AUDIO_DESCRIPTION_LANGUAGES:
      return {
        ...state,
        audioDescriptionLanguages: action.audioDescriptionLanguages
      };
    case types.UPDATE_EXTENDED_AUDIO_DESCRIPTION_LANGUAGES:
      return {
        ...state,
        advancedAudioDescriptionLanguages: action.advancedAudioDescriptionLanguages
      };
    case types.UPDATE_AUDIO_DESCRIPTION_ENABLED:
      return {
        ...state,
        audioDescriptionEnabled: action.audioDescriptionEnabled
      };
    default:
      return state;
  }
};

export const actions = {
  updateAudioDescriptionLanguages: (audioDescriptionLanguages: string[]) => ({
    type: types.UPDATE_AUDIO_DESCRIPTION_LANGUAGES,
    audioDescriptionLanguages
  }),
  updateAdvancedAudioDescriptionLanguages: (advancedAudioDescriptionLanguages: string[]) => ({
    type: types.UPDATE_EXTENDED_AUDIO_DESCRIPTION_LANGUAGES,
    advancedAudioDescriptionLanguages
  }),
  updateAudioDescriptionEnabled: (audioDescriptionEnabled: AUDIO_DESCRIPTION_ENABLED_STATE) => ({
    type: types.UPDATE_AUDIO_DESCRIPTION_ENABLED,
    audioDescriptionEnabled
  })
};
