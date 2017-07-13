//@flow
import { h } from 'preact';
import OverlayPlay from '../components/overlay-play';
import PrePlaybackPlayOverlay from '../components/pre-playback-play-overlay';
import Loading from '../components/loading';
import PlayPauseControl from '../components/play-pause';
import SeekBarControl from '../components/seekbar';
import VolumeControl from '../components/volume';
import ShareControl from '../components/share'
import SettingsControl from '../components/settings';
import LanguageControl from '../components/language';
import FullscreenControl from '../components/fullscreen';
import TimeDisplay from '../components/time-display';
import TopBar from '../components/top-bar';
import BottomBar from '../components/bottom-bar';
import OverlayPortal from '../components/overlay-portal';
import KeyboardControl from '../components/keyboard';

export default function playbackUI(props: any) {
  return (
    <div className='playback-gui-wrapper' style='height: 100%'>
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
