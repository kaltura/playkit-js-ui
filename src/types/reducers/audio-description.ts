export enum AUDIO_DESCRIPTION_ENABLED_STATE {
  DISABLE,
  ENABLE_AUDIO_DESCRIPTION,
  ENABLE_EXTENDED_AUDIO_DESCRIPTION
}

export interface AudioDescriptionState {
  audioDescriptionLanguages: string[];
  advancedAudioDescriptionLanguages: string[];
  audioDescriptionEnabled: AUDIO_DESCRIPTION_ENABLED_STATE;
}
