export enum AUDIO_DESCRIPTION_TYPE {
  AUDIO_DESCRIPTION = 1,
  EXTENDED_AUDIO_DESCRIPTION = 2
}

export interface AudioDescriptionState {
  audioDescriptionLanguages: string[];
  advancedAudioDescriptionLanguages: string[];
  isEnabled: boolean;
  selectedType: AUDIO_DESCRIPTION_TYPE;
  selectionByLanguage: Map<string, [boolean, AUDIO_DESCRIPTION_TYPE]>;
  isUpdated: boolean; // TODO
}
