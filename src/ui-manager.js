//@flow
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {IntlProvider} from 'preact-i18n';
import {createStore} from 'redux';

import reducer from './store';
import definition from './fr.json';

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
class UIManager {
  player: Player;
  config: Object;

  /**
   * Creates an instance of UIManager.
   * @param {Player} player - player instance
   * @param {Object} config - player config
   * @memberof UIManager
   */
  constructor(player: Player, config: Object) {
    this.player = player;
    this.config = config;
  }

  /**
   * build default UIs
   *
   * @returns {void}
   * @memberof UIManager
   */
  buildDefaultUI(): void {
    const uis = [
      { template: props => adsUI(props), condition: state => state.engine.adBreak },
      { template: props => liveUI(props), condition: state => state.engine.isLive },
      { template: props => playbackUI(props) }
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
      let fallbackUIs = [{ template: props => playbackUI(props) }];
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

    // define the store and devtools for redux
    const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension({ name: `playkit #${this.config.target}`, instanceId: this.config.target }));

    // i18n, redux and initial player-to-store connector setup
    const template = (
      <Provider store={store}>
        <IntlProvider definition={definition}>
          <Shell player={this.player}>
            <EngineConnector player={this.player} />
            <VideoPlayer player={this.player} />
            <PlayerGUI uis={uis} player={this.player} config={this.config} />
          </Shell>
        </IntlProvider>
      </Provider>
    );

    // render the player
    const container = document.getElementById(this.config.targetId);
    render(template, container);
  }

}

export default UIManager;

