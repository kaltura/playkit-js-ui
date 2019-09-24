//@flow
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {IntlProvider} from 'preact-i18n';
import {createStore} from 'redux';
import {copyDeep} from './utils/copy-deep';
import {mergeDeep} from './utils/merge-deep';
import {LogLevel, getLogLevel, setLogLevel, setLogHandler} from './utils/logger';
import {EventType} from './event/event-type';
import {setEnv} from './utils/key-map';
import {ContainerProvider} from './components/container';
import reducer from './store';
import en_translations from './translations/en.json';
import {actions as configActions} from './reducers/config';

// core components for the UI
import {EngineConnector} from './components/engine-connector';
import {Shell} from './components/shell';
import {PlayerProvider} from './components/player';
import {VideoPlayer} from './components/video-player';
import {PlayerGUI} from './player-gui';
// ui presets
import * as presets from './ui-presets';

import {middleware} from './middlewares';

import './styles/style.scss';
import {EventDispatcherProvider} from 'components/event-dispatcher';

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
  root: React$Component<any, any, any>;
  _translations: {[langKey: string]: Object} = {en: en_translations};
  _locale: string = 'en';
  _uiComponents: Array<PKUIComponent>;

  /**
   * Creates an instance of UIManager.
   * @param {Object} player - player instance
   * @param {UIOptionsObject} config - ui config
   * @memberof UIManager
   */
  constructor(player: Object, config: UIOptionsObject) {
    if (config.log && config.log.level && this.LogLevel[config.log.level]) {
      setLogLevel(this.LogLevel[config.log.level]);
    }
    if (config.log && typeof config.log.handler === 'function') {
      setLogHandler(config.log.handler);
    }

    this._uiComponents = [...(config.uiComponents || [])];
    this.player = player;
    this.targetId = config.targetId;
    this._createStore(config);
    this.setConfig(config);
    this._setLocaleTranslations(config);
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
    this.store = createStore(
      reducer,
      window.devToolsExtension &&
        window.devToolsExtension({
          name: `playkit #${this.targetId}`,
          instanceId: this.targetId
        }),
      middleware(this.player, config)
    );
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
          <ContainerProvider uiComponents={this._uiComponents}>
            <IntlProvider definition={this._translations[this._locale]}>
              <PlayerProvider player={this.player}>
                <EventDispatcherProvider player={this.player} store={this.store}>
                  <Shell>
                    <EngineConnector />
                    <VideoPlayer />
                    <PlayerGUI uis={uis} playerContainer={this.container} />
                  </Shell>
                </EventDispatcherProvider>
              </PlayerProvider>
            </IntlProvider>
          </ContainerProvider>
        </Provider>
      );

      // render the player
      this.root = render(template, this.container, this.root);
    }
  }

  /**
   * Destroy the ui manager.
   * @returns {void}
   */
  destroy(): void {
    if (this.container) {
      this.container.prepend(this.player.getView());
      render('', this.container, this.root);
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
   * @returns {Object} - The log levels of the player.
   * @public
   */
  get LogLevel(): {[level: string]: Object} {
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
