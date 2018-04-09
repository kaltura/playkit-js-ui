//@flow
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {IntlProvider} from 'preact-i18n';
import {createStore} from 'redux';
import {copyDeep} from './utils/copy-deep';
import {LogLevel, getLogLevel, setLogLevel} from './utils/logger'


import reducer from './store';
import definition from './fr.json';

import {actions} from './reducers/config';

import {Player} from 'playkit-js';

// core components for the UI
import EngineConnector from './components/engine-connector';
import Shell from './components/shell';
import VideoPlayer from './components/video-player';
import PlayerGUI from './player-gui';

// ui presets
import adsUI from './ui-presets/ads';
import playbackUI from './ui-presets/playback';
import liveUI from './ui-presets/live';
import errorUI from './ui-presets/error';
import idleUI from './ui-presets/idle'

import './styles/style.scss';

type UIPreset = {
  template: (props: Object) => any;
  condition?: (state: Object) => boolean;
}

/**
 * API used for building UIs based on state conditions
 *
 * @class UIManager
 */
export default class UIManager {
  player: Player;
  targetId: string;
  store: any;

  /**
   * Creates an instance of UIManager.
   * @param {Player} player - player instance
   * @param {UIOptionsObject} config - ui config
   * @memberof UIManager
   */
  constructor(player: Player, config: UIOptionsObject) {
    if (config.logLevel && this.LogLevel[config.logLevel]) {
      setLogLevel(this.LogLevel[config.logLevel]);
    }
    this.player = player;
    this.targetId = config.targetId;
    this.store = createStore(reducer, window.devToolsExtension && window.devToolsExtension({
      name: `playkit #${this.targetId}`,
      instanceId: this.targetId
    }));
    this.setConfig(config);
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
      this.store.dispatch(actions.updateComponentConfig(componentAlias, config));
    } else {
      this.store.dispatch(actions.updateConfig(config));
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
      {template: props => idleUI(props), condition: state => state.engine.isIdle},
      {template: props => errorUI(props), condition: state => state.engine.hasError},
      {template: props => adsUI(props), condition: state => state.engine.adBreak},
      {template: props => liveUI(props), condition: state => state.engine.isLive},
      {template: props => playbackUI(props)}
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
    }
    else {
      let fallbackUIs = [{template: props => playbackUI(props)}];
      this._buildUI(fallbackUIs);
    }
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
    const container = document.getElementById(this.targetId);
    // i18n, redux and initial player-to-store connector setup
    const template = (
      <Provider store={this.store}>
        <IntlProvider definition={definition}>
          <Shell player={this.player}>
            <EngineConnector player={this.player}/>
            <VideoPlayer player={this.player}/>
            <PlayerGUI uis={uis} player={this.player} playerContainer={container}/>
          </Shell>
        </IntlProvider>
      </Provider>
    );

    // render the player
    render(template, container);
  }

  /**
   * Get the player log level.
   * @returns {Object} - The log levels of the player.
   * @public
   */
  get LogLevel(): { [level: string]: Object } {
    return LogLevel;
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
}
