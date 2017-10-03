//@flow
import {h} from 'preact';
import Loading from '../components/loading';
import PlayPauseControl from '../components/play-pause';
import SeekBarAdsContainer from '../components/seekbar-ads-container';
import VolumeControl from '../components/volume';
import FullscreenControl from '../components/fullscreen';
import TimeDisplayAdsContainer from '../components/time-display-ads-container';
import AdSkip from '../components/ad-skip';
import AdLearnMore from '../components/ad-learn-more';
import TopBar from '../components/top-bar';
import BottomBar from '../components/bottom-bar';

/**
 * Ads ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {HTMLElement} player ui tree
 */
export default function adsUI(props: any): React$Element<any> {
  let useCustomSkipButton = false;
  let isMobile = !!props.player.env.device.type;
  let adsRenderingSettings = props.player.config.plugins.ima.adsRenderingSettings;
  let useStyledLinearAds = adsRenderingSettings && adsRenderingSettings.useStyledLinearAds;
  try {
    if (!useStyledLinearAds && isMobile) {
      useStyledLinearAds = true;
    }
  } catch (e) {
    //TODO: add error handling
  }

  return (
    <div className='ad-gui-wrapper'>
      <Loading player={props.player}/>
      {
        useStyledLinearAds ? undefined :
          <div className='player-gui' id='player-gui'>
            <div>
              <TopBar>
                <div className='left-controls'>
                  <span className='font-size-base'>Adverisment</span>
                </div>
                <div className='right-controls'>
                  <AdLearnMore/>
                </div>
              </TopBar>
              {useCustomSkipButton ? <AdSkip player={props.player}/> : undefined}
            </div>
            <BottomBar>
              <SeekBarAdsContainer adBreak showFramePreview showTimeBubble player={props.player}/>
              <div className='left-controls'>
                <PlayPauseControl player={props.player}/>
                <TimeDisplayAdsContainer/>
              </div>
              <div className='right-controls'>
                <VolumeControl player={props.player}/>
                <FullscreenControl player={props.player} config={props.config}/>
              </div>
            </BottomBar>
          </div>
      }
    </div>
  )
}
