//@flow
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {IntlProvider} from 'preact-i18n';
import store from './store';
import definition from './he.json';

import EngineConnector from './components/engine-connector/engine-connector';
import Shell from './components/shell/shell';
import LoadingSpinner from './components/loading/loading';
import PlayPauseControl from './components/play-pause/play-pause';
import SeekBarControl from './components/seekbar/seekbar';
import VolumeControl from './components/volume/volume';
import ShareControl from './components/share/share'
import SettingsControl from './components/settings/settings';
import LanguageControl from './components/language/language';
import FullscreenControl from './components/fullscreen/fullscreen';
import TimeDisplayControl from './components/time-display/time-display';
import TopBar from './components/top-bar/top-bar';
import BottomBar from './components/bottom-bar/bottom-bar';
import ShareOverlay from './components/share-overlay/share-overlay';
import KeyboardControl from './components/keyboard';

class UIManager {
  player: any;

  constructor(player) {
    this.player = player;
  }

  buildCustomUI(template): void {
    this._buildUI(template);
  }

  buildDefaultUI(): void {
    let template = (
      <Provider store={store}>
        <IntlProvider definition={definition}>
          <Shell>
            <EngineConnector player={this.player} />
            <KeyboardControl player={this.player} />
            <LoadingSpinner player={this.player} />
            <div id='player-holder' />
            <div className='player-gui'>
              <TopBar>
                <div className='left-controls'>
                  <div className='video-playing-title'>The Lumineers Festival 2013</div>
                </div>
                <div className='right-controls'>
                  <ShareControl player={this.player} />
                </div>
              </TopBar>
              <BottomBar>
                <SeekBarControl showFramePreview showTimeBubble player={this.player} />
                <div className='left-controls'>
                  <PlayPauseControl player={this.player} />
                  <TimeDisplayControl player={this.player} />
                </div>
                <div className='right-controls'>
                  <VolumeControl player={this.player} />
                  <LanguageControl player={this.player} />
                  <SettingsControl player={this.player} />
                  <FullscreenControl player={this.player} />
                </div>
              </BottomBar>
              <ShareOverlay />
            </div>
          </Shell>
        </IntlProvider>
      </Provider>
    );
    this._buildUI(template);
  }

  _buildUI(template) {
    if (!this.player) return;

    render(template, document.getElementById('root'));
    let playerElement = document.getElementsByTagName('video')[0];
    playerElement.removeAttribute('style');
    document.getElementById('player-holder').appendChild(playerElement);
  }

  release(): void { }

}

export default UIManager;

