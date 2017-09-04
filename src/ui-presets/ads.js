//@flow
import { h } from 'preact';
import Loading from '../components/loading';
import PlayPauseControl from '../components/play-pause';
import SeekBarAdsContainer from '../components/seekbar-ads-container';
import VolumeControl from '../components/volume';
import FullscreenControl from '../components/fullscreen';
import TimeDisplayPlaybackContainer from '../components/time-display-playback-container';
import BottomBar from '../components/bottom-bar';

/**
 * Ads ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {HTMLElement} player ui tree
 */
export default function adsUI(props: any): React$Element<any> {
  return (
    <div className='ad-gui-wrapper'>
      <Loading player={props.player} />
      <div className='player-gui' id='player-gui'>
        <BottomBar>
          <SeekBarAdsContainer adBreak showFramePreview showTimeBubble player={props.player} />
          <div className='left-controls'>
            <PlayPauseControl player={props.player} />
            <TimeDisplayPlaybackContainer />
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
