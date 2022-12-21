//@flow
/* eslint-disable no-unused-vars */
import {h, render} from 'preact';
import {Provider} from 'react-redux';
import {IntlProvider} from 'preact-i18n';
import {createStore, compose} from 'redux';
import {copyDeep} from './utils/copy-deep';
import {mergeDeep} from './utils/merge-deep';
import {getLogLevel, setLogLevel, setLogger, type LogLevelType, LogLevel} from './utils/logger';
import {EventType} from './event/event-type';
import {setEnv} from './utils/key-map';
import {PlayerAreaProvider} from './components/player-area';
import reducer from './store';
import en_translations from '../translations/en.i18n.json';
import {actions as configActions} from './reducers/config';

// core components for the UI
import {EngineConnector} from './components/engine-connector';
import {Shell} from './components/shell';
import {PlayerProvider} from './components/player';
import {VideoPlayer} from './components/video-player';
import {PlayerGUI} from './components/player-gui';
// ui presets
import * as presets from './ui-presets';

import {middleware} from './middlewares';

import './styles/style.scss';
import {EventDispatcherProvider} from 'components/event-dispatcher';
import {KeyboardEventProvider} from 'components/keyboard/keyboard-event-provider';
import {ThemesManager} from 'utils/themes-manager';

/**
 * API used for building UIs based on state conditions
 *
 * @class UIManager
 */
class UIManager {
  player: Object;
  targetId: string;
  store: any;
  container: ?HTMLElement;
  _translations: {[langKey: string]: Object} = {en: en_translations['en']};
  _locale: string = 'en';
  _uiComponents: Array<KPUIComponent>;
  addComponent: (component: KPUIComponent) => Function;
  _themesManager: ThemesManager;

  /**
   * Creates an instance of UIManager.
   * @param {Object} player - player instance
   * @param {UIOptionsObject} config - ui config
   * @memberof UIManager
   */
  constructor(player: Object, config: UIOptionsObject) {
    setLogger(config.logger);
    this._uiComponents = [...(config.uiComponents || [])];
    this.player = player;
    this.targetId = config.targetId;
    this._createStore(config);
    this.setConfig(config);
    this._setLocaleTranslations(config);
    this._themesManager = new ThemesManager(player, config.userTheme);
    setEnv(this.player.env);
  }

  /**
   * Gets the updated state from the config reducer.
   * @public
   * @returns {UIOptionsObject} - The UI manager config.
   */
  get config(): UIOptionsObject {
    return copyDeep(this.store.getState().config);
  }

  /**
   * sets the player and ui config in the store
   *
   * @param {Object} config - new config object
   * @param {string} componentAlias - component alias (optional)
   * @returns {void}
   * @memberof UIManager
   */
  setConfig(config: Object, componentAlias?: string): void {
    if (componentAlias) {
      this.store.dispatch(configActions.updateComponentConfig(componentAlias, config));
    } else {
      this.store.dispatch(configActions.updateConfig(config));
    }
  }

  /**
   * Add a component dynamically
   *
   * @param {KPUIComponent} component - The component to add
   * @returns {Function} - Removal function
   * @memberof UIManager
   */
  addComponent(component: KPUIComponent): Function {
    return () => {};
  }

  /**
   * build default UIs
   *
   * @returns {void}
   * @memberof UIManager
   */
  buildDefaultUI(): void {
    const uis = [
      {template: props => presets.idleUI(props), condition: state => state.engine.isIdle},
      {template: props => presets.errorUI(props), condition: state => state.engine.hasError},
      {template: props => presets.adsUI(props), condition: state => state.engine.adBreak},
      {template: props => presets.liveUI(props), condition: state => state.engine.isLive},
      {template: props => presets.playbackUI(props)}
    ];
    this._buildUI(uis);
    this._themesManager.applyUserTheme();
  }

  /**
   * build custom UIs
   *
   * @param {Array<UIPreset>} uis - UIs array with conditions based on state
   * @returns {void}
   * @memberof UIManager
   */
  buildCustomUI(uis: Array<UIPreset>): void {
    if (uis.length > 0) {
      this._buildUI(uis);
    } else {
      let fallbackUIs = [{template: props => presets.playbackUI(props)}];
      this._buildUI(fallbackUIs);
    }
  }

  /**
   * set the language translations
   * @param {UIOptionsObject} config - config
   * @private
   * @returns {void}
   */
  _setLocaleTranslations(config: UIOptionsObject): void {
    if (config.translations) {
      Object.entries(config.translations).forEach(([locale, translation]) => {
        //fallback to english for non existing keys
        translation = mergeDeep({}, this._translations['en'], translation);
        this._translations[locale] = translation;
      });
    }
    if (config.locale && this._translations[config.locale]) {
      this._locale = config.locale;
    }
  }

  /**
   * Creates the redux store.
   * @param {UIOptionsObject} config - The UI config.
   * @private
   * @returns {void}
   */
  _createStore(config: UIOptionsObject): void {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this.store = createStore(reducer, composeEnhancers(middleware(this.player, config)));
  }

  /**
   * build the UI and render to targetId configured in player config
   *
   * @param {Array<UIPreset>} [uis] - UI array with conditions
   * @returns {void}
   * @memberof UIManager
   */
  _buildUI(uis?: Array<UIPreset>): void {
    if (!this.player) return;
    this.container = document.getElementById(this.targetId);
    if (this.container) {
      // i18n, redux and initial player-to-store connector setup
      const template = (
        <Provider store={this.store}>
          <PlayerAreaProvider
            uiComponents={this._uiComponents}
            setApi={api => {
              if (api) {
                this.addComponent = api;
              }
            }}>
            <IntlProvider definition={this._translations[this._locale]}>
              <PlayerProvider player={this.player}>
                <EventDispatcherProvider player={this.player} store={this.store}>
                  <KeyboardEventProvider playerContainer={this.container}>
                    <Shell>
                      <EngineConnector />
                      <VideoPlayer />
                      <PlayerGUI uis={uis} playerContainer={this.container} />
                    </Shell>
                  </KeyboardEventProvider>
                </EventDispatcherProvider>
              </PlayerProvider>
            </IntlProvider>
          </PlayerAreaProvider>
        </Provider>
      );

      // render the player
      render(template, this.container);
    }
  }

  /**
   * Destroy the ui manager.
   * @returns {void}
   */
  destroy(): void {
    if (this.container) {
      this.container.prepend(this.player.getView());
      render('', this.container);
    }
  }

  /**
   * get the log level
   * @param {?string} name - the logger name
   * @returns {Object} - the log level
   */
  getLogLevel(name?: string): Object {
    return getLogLevel(name);
  }

  /**
   * sets the logger level
   * @param {Object} level - the log level
   * @param {?string} name - the logger name
   * @returns {void}
   */
  setLogLevel(level: Object, name?: string) {
    setLogLevel(level, name);
  }

  /**
   * Get the ui manager log level.
   * @returns {LogLevelType} - The log levels of the player.
   * @public
   */
  get LogLevel(): LogLevelType {
    return LogLevel;
  }

  /**
   * Gets the ui manager event enums.
   * @returns {Object} - The ui manager event enums.
   * @public
   */
  get Event(): {[event: string]: string} {
    return EventType;
  }
}

export {UIManager};
