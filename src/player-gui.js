//@flow
import { h, Component } from 'preact';
import { connect } from 'preact-redux';

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
import OverlayPortal from './components/overlay-portal/overlay-portal';
import KeyboardControl from './components/keyboard';

const mapStateToProps = state => ({
  isAd: state.shell.isAd
});

@connect(mapStateToProps)
class PlayerGUI extends Component {
  renderPlaybackUI(props: any) {
    return (
      <div style='height: 100%'>
        <KeyboardControl player={props.player} />
        <Loading player={props.player} />
        <div className='player-gui' id='player-gui'>
          <OverlayPortal />
          <OverlayPlay player={props.player} />
          <TopBar>
            <div className='left-controls'>
              <div className='video-playing-title'>L21 Earth Time Lapse View from Space, ISS</div>
            </div>
            <div className='right-controls'>
              <ShareControl player={props.player} />
            </div>
          </TopBar>
          <BottomBar>
            <SeekBarControl showFramePreview showTimeBubble player={props.player} />
            <div className='left-controls'>
              <PlayPauseControl player={props.player} />
              <TimeDisplay format='current / total' player={props.player} />
            </div>
            <div className='right-controls'>
              <VolumeControl player={props.player} />
              <LanguageControl player={props.player} />
              <SettingsControl player={props.player} />
              <FullscreenControl player={props.player} />
            </div>
          </BottomBar>
        </div>
        <PrePlaybackPlayOverlay player={props.player} />
      </div>
    )
  }
  renderAdsUI(props: any) {
    return (
      <div style='height: 100%'>
        <KeyboardControl player={props.player} />
        <Loading player={props.player} />
        <div className='player-gui' id='player-gui'>
          <OverlayPortal />
          <OverlayPlay player={props.player} />
          <BottomBar>
            <SeekBarControl showFramePreview showTimeBubble player={props.player} />
            <div className='left-controls'>
              <TimeDisplay format='-left' player={props.player} />
            </div>
            <div className='right-controls'>
              <VolumeControl player={props.player} />
              <FullscreenControl player={props.player} />
            </div>
          </BottomBar>
        </div>
      </div>
    )
  }
  render(props: any) {
    return this.props.isAd ? this.renderAdsUI(props) : this.renderPlaybackUI(props);
  }
}

export default PlayerGUI;
