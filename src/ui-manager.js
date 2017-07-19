//@flow
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {IntlProvider} from 'preact-i18n';
import {createStore} from 'redux';

import reducer from './store';
import definition from './fr.json';

import {Player} from 'playkit-js';

// core components for the UI
import EngineConnector from './components/engine-connector/engine-connector';
import Shell from './components/shell/shell';
import PlayerGUI from './player-gui';

// ui presets
import adsUI from './ui-presets/ads';
import playbackUI from './ui-presets/playback';
import fullscreenUI from './ui-presets/fullscreen';

import './styles/style.scss';

type UIPreset = {
  template: (props: Object) => any;
  condition?: (state: Object) => boolean;
}

class UIManager {
  player: Player;
  config: Object;

  constructor(player: Player, config: Object) {
    this.player = player;
    this.config = config;
  }

  buildDefaultUI(): void {
    const uis = [
      { template: props => fullscreenUI(props), condition: state => state.fullscreen.fullscreen },
      { template: props => adsUI(props), condition: state => state.shell.isAd },
      { template: props => playbackUI(props), condition: state => !state.shell.isAd }
    ];
    this._buildUI(uis);
  }

  buildCustomUI(uis: Array<UIPreset>): void {
    if (uis.length > 0) {
      this._buildUI(uis);
    }
    else {
      let fallbackUIs = [{ template: props => playbackUI(props) }];
      this._buildUI(fallbackUIs);
    }
  }

  _buildUI(uis?: Array<UIPreset>) {
    if (!this.player) return;

    // define the store and devtools for redux
    const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension({ name: `playkit #${this.config.target}`, instanceId: this.config.target }));

    // i18n, redux and initial player-to-store connector setup
    const template = (
      <Provider store={store}>
        <IntlProvider definition={definition}>
          <Shell player={this.player}>
            <EngineConnector player={this.player} />
            <PlayerGUI uis={uis} player={this.player} />
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

