/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {AUDIO_DESCRIPTION_TYPE, AudioDescriptionState} from '../types/reducers/audio-description';

export const types = {
  UPDATE_AUDIO_DESCRIPTION_LANGUAGES: 'audio-description/UPDATE_AUDIO_DESCRIPTION_LANGUAGES',
  UPDATE_EXTENDED_AUDIO_DESCRIPTION_LANGUAGES: 'audio-description/UPDATE_EXTENDED_AUDIO_DESCRIPTION_LANGUAGES',
  UPDATE_AUDIO_DESCRIPTION_ENABLED: 'audio-description/UPDATE_AUDIO_DESCRIPTION',
  UPDATE_AUDIO_DESCRIPTION_TYPE: 'audio-description/UPDATE_AUDIO_DESCRIPTION_TYPE',
  UPDATE_AUDIO_DESCRIPTION_IS_UPDATED: 'audio-description/UPDATE_AUDIO_DESCRIPTION_IS_UPDATED'
};

export const initialState = {
  audioDescriptionLanguages: [],
  advancedAudioDescriptionLanguages: [],
  isEnabled: false,
  selectedType: AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION,
  isUpdated: false
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
        isEnabled: action.isEnabled
      };
    case types.UPDATE_AUDIO_DESCRIPTION_TYPE:
      return {
        ...state,
        selectedType: action.selectedType
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
  updateAudioDescriptionEnabled: (isEnabled: boolean) => ({
    type: types.UPDATE_AUDIO_DESCRIPTION_ENABLED,
    isEnabled
  }),
  updateAudioDescriptionType: (selectedType: AUDIO_DESCRIPTION_TYPE) => ({
    type: types.UPDATE_AUDIO_DESCRIPTION_TYPE,
    selectedType
  }),
  updateAudioDescriptionIsUpdated: (isUpdated: boolean) => ({
    type: types.UPDATE_AUDIO_DESCRIPTION_IS_UPDATED,
    isUpdated
  })
};
