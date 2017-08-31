//@flow
import { h } from 'preact';
import OverlayPlay from '../components/overlay-play';
import PrePlaybackPlayOverlay from '../components/pre-playback-play-overlay';
import Loading from '../components/loading';
import PlayPauseControl from '../components/play-pause';
import SeekBarLivePlaybackContainer from '../components/seekbar-live-playback-container';
import VolumeControl from '../components/volume';
import SettingsControl from '../components/settings';
import LanguageControl from '../components/language';
import FullscreenControl from '../components/fullscreen';
import BottomBar from '../components/bottom-bar';
import OverlayPortal from '../components/overlay-portal';
import KeyboardControl from '../components/keyboard';
import LiveTag from '../components/live-tag';

/**
 * Live ui intrface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
export default function liveUI(props: any): React$Element<any> {
  return (
    <div className='playback-gui-wrapper'>
      <KeyboardControl player={props.player} />
      <Loading player={props.player} />
      <div className='player-gui' id='player-gui'>
        <OverlayPortal />
        <OverlayPlay player={props.player} />
        <BottomBar>
          <SeekBarLivePlaybackContainer showFramePreview showTimeBubble player={props.player} />
          <div className='left-controls'>
            <PlayPauseControl player={props.player} />
            <LiveTag player={props.player} />
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
