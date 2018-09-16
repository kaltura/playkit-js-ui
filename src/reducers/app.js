//@flow
import en_translation from '../translations/en.json';
import {getComponentStateFromComponentConfig, getComponentStateFromConfig} from '../utils/component-config';
import {types as configReducerTypes} from './config';
import {mergeDeep} from '../utils/merge-deep';

/**
 * Fill in missing translation tokens in a dictionary with the english default tokens
 * @param {Object} translations - the new translations
 * @returns {Object} - the new translations dictionary
 */
const mergeMissingTokens = (translations: Object): Object => {
  const newTranslations = {};
  Object.entries(translations).forEach(([locale, translation]) => {
    //fallback to english for non existing keys
    newTranslations[locale] = mergeDeep({}, en_translation, translation);
  });
  return newTranslations;
};
export const types = {
  UPDATE_TRANSLATIONS: 'app/UPDATE_TRANSLATIONS',
  UPDATE_LOCALE: 'app/UPDATE_LOCALE',
  UPDATE_PLAYER_CONTAINER: 'app/UPDATE_PLAYER_CONTAINER'
};

export const initialState = {
  playerContainer: null,
  locale: 'en',
  translations: {en: en_translation}
};

const component = 'app';

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case configReducerTypes.UPDATE:
      if (action.translations) {
        action.translations = mergeMissingTokens(action.translations);
      }
      if (action.locale) {
        if (!action.translations[action.locale] && !state.translations[action.locale]) {
          action.locale = state.locale;
        }
      }
      return getComponentStateFromConfig(component, state, action);

    case configReducerTypes.UPDATE_COMPONENT:
      return getComponentStateFromComponentConfig(component, state, action);

    case types.UPDATE_PLAYER_CONTAINER:
      return {
        ...state,
        container: action.container
      };

    case types.UPDATE_TRANSLATIONS: {
      return {
        ...state,
        translations: mergeMissingTokens(action.translations)
      };
    }

    case types.UPDATE_LOCALE:
      if (state.translations[action.locale]) {
        return {
          ...state,
          locale: action.locale
        };
      } else {
        return state;
      }

    default:
      return state;
  }
};

export const actions = {
  updateTranslations: (translations: boolean) => ({
    type: types.UPDATE_TRANSLATIONS,
    translations
  }),
  upateLocale: (locale: string) => ({
    type: types.UPDATE_LOCALE,
    locale
  }),
  updatePlayerContainer: (container: string) => ({
    type: types.UPDATE_PLAYER_CONTAINER,
    container
  })
};
