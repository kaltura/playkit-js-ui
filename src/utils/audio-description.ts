import {KalturaPlayer} from '@playkit-js/kaltura-player-js';

const AUDIO_DESCRIPTION_PREFIX = 'ad-';
const AUDIO_DESCRIPTION_STORAGE_KEY = 'audioDescription';

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

export function getActiveAudioLanguage(player: KalturaPlayer) {
  return getAudioLanguageKey(player.getActiveTracks()['audio']?.language || '');
}

export function getAudioDescriptionStateFromStorage() {
  return (window as any).KalturaPlayer?.LocalStorageManager?.getItem(AUDIO_DESCRIPTION_STORAGE_KEY) || null;
}
//dummy
