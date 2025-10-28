/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import {AUDIO_DESCRIPTION_TYPE, AudioDescriptionState} from '../types/reducers/audio-description';

export const types = {
  UPDATE_AUDIO_DESCRIPTION_LANGUAGES: 'audio-description/UPDATE_AUDIO_DESCRIPTION_LANGUAGES',
  UPDATE_EXTENDED_AUDIO_DESCRIPTION_LANGUAGES: 'audio-description/UPDATE_EXTENDED_AUDIO_DESCRIPTION_LANGUAGES',
  UPDATE_AUDIO_DESCRIPTION_ENABLED: 'audio-description/UPDATE_AUDIO_DESCRIPTION',
  UPDATE_AUDIO_DESCRIPTION_TYPE: 'audio-description/UPDATE_AUDIO_DESCRIPTION_TYPE',
  UPDATE_SELECTION_BY_LANGUAGE: 'audio-description/UPDATE_SELECTION_BY_LANGUAGE',
  RESET_SELECTION_BY_LANGUAGE: 'audio-description/RESET_SELECTION_BY_LANGUAGE',
  UPDATE_DEFAULT_VALUE_SET: 'audio-description/UPDATE_DEFAULT_VALUE_SET'
};

export const initialState = {
  audioDescriptionLanguages: [],
  advancedAudioDescriptionLanguages: [],
  isEnabled: false,
  selectedType: AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION,
  selectionByLanguage: new Map<string, [boolean, AUDIO_DESCRIPTION_TYPE]>(),
  isDefaultValueSet: false
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
    case types.UPDATE_SELECTION_BY_LANGUAGE:
      const language = action.language;
      const isEnabled = action.isEnabled;
      const selectedType = action.selectedType;

      return {
        ...state,
        selectionByLanguage: new Map(state.selectionByLanguage).set(language, [isEnabled, selectedType])
      };
    case types.RESET_SELECTION_BY_LANGUAGE:
      return {
        ...state,
        selectionByLanguage: new Map<string, [boolean, AUDIO_DESCRIPTION_TYPE]>()
      };
    case types.UPDATE_DEFAULT_VALUE_SET:
      return {
        ...state,
        isDefaultValueSet: action.isDefaultValueSet
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
  updateSelectionByLanguage: (language: string, isEnabled: boolean, selectedType: AUDIO_DESCRIPTION_TYPE) => ({
    type: types.UPDATE_SELECTION_BY_LANGUAGE,
    language,
    isEnabled,
    selectedType
  }),
  resetSelectionByLanguage: () => ({
    type: types.RESET_SELECTION_BY_LANGUAGE
  }),
  updateDefaultValueSet: (isDefaultValueSet: boolean) => ({
    type: types.UPDATE_DEFAULT_VALUE_SET,
    isDefaultValueSet
  })
};
