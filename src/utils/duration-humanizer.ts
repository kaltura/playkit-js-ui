import * as humanizeDuration from 'humanize-duration';

const getTimeInText = (seconds: number, uiConfig: any, round: boolean = false): string => {
  try {
    const durationHumanizer = getDurationHumanizer(uiConfig);
    if (durationHumanizer) {
      try {
        return seconds ? durationHumanizer(seconds * 1000, {round: round}) : '0';
      } catch (e: any) {
        return `${seconds}`;
      }
    }
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
};

const getDurationHumanizer = ({locale}: any): any => {
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

export {getTimeInText};
