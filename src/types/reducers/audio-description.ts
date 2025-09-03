export enum AUDIO_DESCRIPTION_STATE {
  ENABLE_AUDIO_DESCRIPTION,
  ENABLE_EXTENDED_AUDIO_DESCRIPTION,
  DISABLE
}

export interface AudioDescriptionState {
  audioDescriptionLanguages: string[];
  advancedAudioDescriptionLanguages: string[];
  audioDescriptionEnabled: AUDIO_DESCRIPTION_STATE;
}
