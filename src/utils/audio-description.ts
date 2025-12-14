import {KalturaPlayer} from '@playkit-js/kaltura-player-js';
import {audioLanguageMapping} from './audio-language-mapping';

const AUDIO_DESCRIPTION_PREFIX = 'ad-';
const AUDIO_DESCRIPTION_STORAGE_KEY = 'audioDescription';
const UNKNOWN_LANGUAGE_KEY = 'un';

export function isAudioDescriptionLanguageKey(languageKey: any) {
  return languageKey?.startsWith(AUDIO_DESCRIPTION_PREFIX);
}

export function getAudioDescriptionLanguageKey(languageKey: string) {
  return AUDIO_DESCRIPTION_PREFIX + languageKey;
}

export function getAudioLanguageKey(audioTrack?: any) {
  if (audioTrack?.language === UNKNOWN_LANGUAGE_KEY) {
    return audioLanguageMapping[audioTrack?.label] || '';
  }

  if (audioTrack?.language.indexOf(AUDIO_DESCRIPTION_PREFIX) === -1) {
    return audioTrack.language;
  }

  return audioTrack?.language.substring(AUDIO_DESCRIPTION_PREFIX.length);
}

export function getAudioLanguageByAudioLabel(audioLabel: string) {
  return audioLanguageMapping[audioLabel] || '';
}

export function getAudioLabelByAudioLanguage(audioLanguage: string) {
  const entry = Object.entries(audioLanguageMapping).find(([label, lang]) => lang === audioLanguage);
  return entry ? entry[0] : '';
}

export function getActiveAudioLanguage(player: KalturaPlayer) {
  return getAudioLanguageKey(player.getActiveTracks()['audio']);
}

export function getActiveAudioLabel(player: KalturaPlayer) {
  const activeAudioTrack = player.getActiveTracks()['audio'];
  return activeAudioTrack?.label || '';
}

export function getAudioDescriptionStateFromStorage() {
  return (window as any).KalturaPlayer?.LocalStorageManager?.getItem(AUDIO_DESCRIPTION_STORAGE_KEY) || null;
}
