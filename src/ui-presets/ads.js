//@flow
import { h } from 'preact';
import OverlayPlay from '../components/overlay-play/overlay-play';
import Loading from '../components/loading/loading';
import SeekBarControl from '../components/seekbar/seekbar';
import VolumeControl from '../components/volume/volume';
import FullscreenControl from '../components/fullscreen/fullscreen';
import TimeDisplay from '../components/time-display/time-display';
import BottomBar from '../components/bottom-bar/bottom-bar';
import KeyboardControl from '../components/keyboard';

export default function(props) {
  return (
    <div className='ad-gui-wrapper' style='height: 100%'>
      <KeyboardControl player={props.player} />
      <Loading player={props.player} />
      <div className='player-gui' id='player-gui'>
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
