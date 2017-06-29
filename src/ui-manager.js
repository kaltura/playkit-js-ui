//@flow
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {IntlProvider} from 'preact-i18n';
import { createStore } from 'redux';

import reducer from './store';
import definition from './fr.json';

import EngineConnector from './components/engine-connector/engine-connector';
import Shell from './components/shell/shell';
import OverlayPlay from './components/overlay-play/overlay-play';
import PrePlaybackPlayOverlay from './components/pre-playback-play-overlay/pre-playback-play-overlay';
import Loading from './components/loading/loading';
import PlayPauseControl from './components/play-pause/play-pause';
import SeekBarControl from './components/seekbar/seekbar';
import VolumeControl from './components/volume/volume';
import ShareControl from './components/share/share'
import SettingsControl from './components/settings/settings';
import LanguageControl from './components/language/language';
import FullscreenControl from './components/fullscreen/fullscreen';
import TimeDisplay from './components/time-display/time-display';
import TopBar from './components/top-bar/top-bar';
import BottomBar from './components/bottom-bar/bottom-bar';
import ShareOverlay from './components/share-overlay/share-overlay';
import CVAAOverlay from './components/cvaa-overlay/cvaa-overlay';
import KeyboardControl from './components/keyboard';

class UIManager {
  player: any;
  config: any;

  constructor(player, config) {
    this.player = player;
    this.config = config;
    this.config.ui = {
      "translations": {
        "controls": {
          "language": "שפה"
        }
      },
      "components": {
        "Loading": {
          "enabled": true
        },
        "OverlayPlay": {
          "enabled": true
        }
      }
    }
  }

  buildCustomUI(template): void {
    this._buildUI(template);
  }

  buildDefaultUI(): void {
    const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension({ name: `playkit #${this.config.target}`, instanceId: this.config.target }));

    let template = (
      <Provider store={store}>
        <IntlProvider definition={definition}>
          <Shell>
            <div className='player-holder' />
            <EngineConnector player={this.player} />
            <KeyboardControl player={this.player} />
            <Loading player={this.player} />
            <div className='player-gui'>
              <OverlayPlay player={this.player} />
              <TopBar>
                <div className='left-controls'>
                  <div className='video-playing-title'>L21 Earth Time Lapse View from Space, ISS</div>
                </div>
                <div className='right-controls'>
                  <ShareControl player={this.player} />
                </div>
              </TopBar>
              <BottomBar>
                <SeekBarControl showFramePreview showTimeBubble player={this.player} />
                <div className='left-controls'>
                  <PlayPauseControl player={this.player} />
                  <TimeDisplay format='current / total' player={this.player} />
                </div>
                <div className='right-controls'>
                  <VolumeControl player={this.player} />
                  <LanguageControl player={this.player} />
                  <SettingsControl player={this.player} />
                  <FullscreenControl player={this.player} />
                </div>
              </BottomBar>
              <ShareOverlay />
              <CVAAOverlay />
            </div>
            <PrePlaybackPlayOverlay player={this.player} />
          </Shell>
        </IntlProvider>
      </Provider>
    );
    this._buildUI(template);
  }

  _buildUI(template) {
    if (!this.player) return;

    let container = document.getElementById(this.config.targetId);
    render(template, container);
  }

  release(): void { }

}

export default UIManager;

