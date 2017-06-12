//@flow
import {h, render} from 'preact';
import {Provider} from 'preact-redux';
import {IntlProvider} from 'preact-i18n';
import store from './store';
import definition from './fr.json';

import EngineConnector from './components/engine-connector/engine-connector';
import Shell from './components/shell/shell';
import OverlayPlay from './components/overlay-play/overlay-play';
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
import KeyboardControl from './components/keyboard';

import Overlay from './components/overlay/overlay';

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
            <div id='player-holder' />
            <EngineConnector player={this.player} />
            <KeyboardControl player={this.player} />
            <Loading player={this.player} />
            <div className='player-gui'>
              <OverlayPlay player={this.player} />
              <TopBar>
                <div className='left-controls'>
                  <div className='video-playing-title'>Earth</div>
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
              <Overlay type='cvaa'>
                <div className='title'>
                  Advanced captions settings
                </div>
                <div className='sample'>Sample</div>
                <div className='sample black-bg'>Sample</div>
                <div className='sample yellow-text'>Sample</div>
              </Overlay>
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

