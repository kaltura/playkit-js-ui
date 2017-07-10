//@flow
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {IntlProvider} from 'preact-i18n';
import {createStore} from 'redux';

import reducer from './store';
import definition from './fr.json';

import EngineConnector from './components/engine-connector/engine-connector';
import Shell from './components/shell/shell';
import PlayerGUI from './player-gui';

import adsUI from './ads-ui';
import playbackUI from './playback-ui';

class UIManager {
  player: any;
  config: any;

  constructor(player: any, config: Object) {
    this.player = player;
    this.config = config;
  }

  buildCustomUI(template: any): void {
    this._buildUI(template);
  }

  buildDefaultUI(): void {
    const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension({ name: `playkit #${this.config.target}`, instanceId: this.config.target }));

    const uis = [
      {
        template: props => adsUI(props),
        condition: state => state.shell.isAd
      },
      {
        template: props => playbackUI(props),
        condition: state => !state.shell.isAd
      }
    ]

    let template = (
      <Provider store={store}>
        <IntlProvider definition={definition}>
          <Shell>
            <EngineConnector player={this.player} />
            <PlayerGUI uis={uis} player={this.player} />
          </Shell>
        </IntlProvider>
      </Provider>
    );
    this._buildUI(template);
  }

  _buildUI(template: any) {
    if (!this.player) return;

    let container = document.getElementById(this.config.targetId);
    render(template, container);
  }

  release(): void { }

}

export default UIManager;

