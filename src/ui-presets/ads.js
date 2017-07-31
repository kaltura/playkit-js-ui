//@flow
import { h } from 'preact';
import Loading from '../components/loading';
import PlayPauseControl from '../components/play-pause';
import SeekBarAdsContainer from '../components/seekbar-ads-container';
import VolumeControl from '../components/volume';
import FullscreenControl from '../components/fullscreen';
import TimeDisplayPlaybackContainer from '../components/time-display-playback-container';
import AdSkip from '../components/ad-skip';
import TopBar from '../components/top-bar';
import BottomBar from '../components/bottom-bar';

export default function adsUI(props: any) {
  var useStyledLinearAds = false;

  try {
    useStyledLinearAds = props.player.config.plugins.ima.adsRenderingSettings.useStyledLinearAds;
  } catch (e) {}

  return (
    <div className='ad-gui-wrapper'>
      <Loading player={props.player} />
      <div className='player-gui' id='player-gui'>
        {
          useStyledLinearAds ? undefined :
          <div>
            <TopBar>
              <div className='left-controls'>
                <span className='font-size-base'>Adverisment</span>
              </div>
              <div className='right-controls'>
                <a href='' className='btn btn-dark-transparent'>Learn more</a>
              </div>
            </TopBar>
            <AdSkip player={props.player} />
          </div>
        }
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
