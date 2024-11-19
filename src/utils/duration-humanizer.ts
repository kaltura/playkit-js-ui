import * as humanizeDuration from 'humanize-duration';
import getLogger from './logger';

const getDurationAsText = (seconds: number, locale: string, round: boolean = false): string | undefined => {
  const logger = getLogger('DurationHumanizer');
  try {
    const durationHumanizer = getDurationHumanizer(locale);
    if (durationHumanizer) {
      try {
        return seconds ? durationHumanizer(seconds * 1000, {round: round}) : '0';
      } catch (e: any) {
        return `${seconds}`;
      }
    }
  } catch (e: any) {
    logger.log(e);
  }
};

const getDurationHumanizer = (locale: string): any => {
  const languages = ['en'];
  if (locale) {
    if (locale.match('_')) {
      languages.unshift(locale.split('_')[0]);
    }
    languages.unshift(locale);
  }

  const supportedLanguages = new Map(humanizeDuration.getSupportedLanguages().map((language: string) => [language.toLowerCase(), language]));
  for (const language of languages) {
    try {
      if (supportedLanguages.has(language)) {
        return humanizeDuration.humanizer({language: supportedLanguages.get(language)});
      }
    } catch (e: any) {}
  }

  return null;
};

export {getDurationAsText};
