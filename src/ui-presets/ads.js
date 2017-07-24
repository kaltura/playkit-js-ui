//@flow
import { h } from 'preact';
import OverlayPlay from '../components/overlay-play';
import Loading from '../components/loading';
import PlayPauseControl from '../components/play-pause';
import SeekBarAdsContainer from '../components/seekbar-ads-container';
import VolumeControl from '../components/volume';
import FullscreenControl from '../components/fullscreen';
import TimeDisplayAdsContainer from '../components/time-display-ads-container';
import BottomBar from '../components/bottom-bar';
import KeyboardControl from '../components/keyboard';

export default function adsUI(props: any) {
  return (
    <div className='ad-gui-wrapper' style='height: 100%'>
      <KeyboardControl player={props.player} />
      <Loading player={props.player} />
      <div className='player-gui' id='player-gui'>
        <BottomBar>
          <SeekBarAdsContainer disabled showFramePreview showTimeBubble player={props.player} />
          <div className='left-controls'>
            <PlayPauseControl player={props.player} />
            <TimeDisplayAdsContainer format='Ad (left)' />
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
