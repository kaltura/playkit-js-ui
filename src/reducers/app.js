//@flow
import en_translations from '../translations/en.json';
import {getComponentStateFromComponentConfig, getComponentStateFromConfig} from '../utils/component-config';
import {types as configReducerTypes} from './config';

export const types = {
  UPDATE_TRANSLATIONS: 'app/UPDATE_TRANSLATIONS',
  UPDATE_LOCALE: 'app/UPDATE_LOCALE',
  UPDATE_PLAYER_CONTAINER: 'app/UPDATE_PLAYER_CONTAINER'
};

export const initialState = {
  playerContainer: null,
  locale: 'en',
  translations: {en: en_translations}
};

const component = 'app';

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case configReducerTypes.UPDATE:
      return getComponentStateFromConfig(component, state, action);

    case configReducerTypes.UPDATE_COMPONENT:
      return getComponentStateFromComponentConfig(component, state, action);

    case types.UPDATE_PLAYER_CONTAINER:
      return {
        ...state,
        container: action.container
      };

    case types.UPDATE_TRANSLATIONS:
      return {
        ...state,
        translations: action.translations
      };

    case types.UPDATE_LOCALE:
      return {
        ...state,
        locale: action.locale
      };

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
