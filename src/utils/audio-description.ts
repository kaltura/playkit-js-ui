const AUDIO_DESCRIPTION_PREFIX = 'ad-';

export function isAudioDescriptionLanguageKey(languageKey: any) {
  return languageKey?.startsWith(AUDIO_DESCRIPTION_PREFIX);
}

export function getAudioDescriptionLanguageKey(languageKey: string) {
  return AUDIO_DESCRIPTION_PREFIX + languageKey;
}

export function getAudioLanguageKey(languageKey: string) {
  if (languageKey.indexOf(AUDIO_DESCRIPTION_PREFIX) === -1) {
    return languageKey;
  }

  return languageKey?.substring(AUDIO_DESCRIPTION_PREFIX.length);
}
