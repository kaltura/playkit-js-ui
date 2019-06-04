//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import {Loading} from '../components/loading';
import {VolumeControl} from '../components/volume';
import {FullscreenControl} from '../components/fullscreen';
import {TimeDisplayAdsContainer} from '../components/time-display-ads-container';
import {AdSkip} from '../components/ad-skip';
import {AdLearnMore} from '../components/ad-learn-more';
import {TopBar} from '../components/top-bar';
import {BottomBar} from '../components/bottom-bar';
import {UnmuteIndication} from '../components/unmute-indication';
import {KeyboardControl} from '../components/keyboard';
import {AdNotice} from '../components/ad-notice/ad-notice';
import {PlaybackControls} from '../components/playback-controls';

/**
 * Ads ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {?HTMLElement} player ui tree
 */
export function adsUI(props: any): ?React$Element<any> {
  if (useDefaultAdsUi(props)) {
    return (
      <div className={style.adGuiWrapper}>
        <Loading player={props.player} />
        <div className={style.playerGui} id="player-gui">
          <UnmuteIndication player={props.player} hasTopBar />
          <TopBar>
            <div className={style.leftControls}>
              <AdNotice />
            </div>
          </TopBar>
        </div>
      </div>
    );
  }
  const adsUiCustomization = getAdsUiCustomization();
  return (
    <div className={style.adGuiWrapper}>
      <KeyboardControl player={props.player} config={props.config} />
      <Loading player={props.player} />
      <div className={style.playerGui} id="player-gui">
        <UnmuteIndication player={props.player} hasTopBar />
        <TopBar>
          <div className={style.leftControls}>
            <AdNotice />
          </div>
          <div className={style.rightControls}>{adsUiCustomization.learnMoreButton ? <AdLearnMore /> : undefined}</div>
        </TopBar>
        {adsUiCustomization.skipButton ? <AdSkip player={props.player} /> : undefined}
        <PlaybackControls player={props.player} />
        <BottomBar>
          <div className={style.leftControls}>
            <PlaybackControls player={props.player} />
            <TimeDisplayAdsContainer />
          </div>
          <div className={style.rightControls}>
            <VolumeControl player={props.player} />
            <FullscreenControl player={props.player} />
          </div>
        </BottomBar>
      </div>
    </div>
  );
}

/**
 * Gets the ads ui customization settings
 * @returns {Object} - Customization object
 */
function getAdsUiCustomization(): Object {
  return {
    learnMoreButton: useCustomLearnMoreButton(),
    skipButton: useCustomSkipButton()
  };
}

/**
 * Whether the default ads ui should be shown or not.
 * @param {any} props - component props
 * @returns {boolean} - Whether the default ads ui should be shown or not.
 */
function useDefaultAdsUi(props: any): boolean {
  const isMobile = props.state.shell.isMobile;
  let useStyledLinearAds = false;
  try {
    const adsRenderingSettings = props.player.config.plugins.ima.adsRenderingSettings;
    useStyledLinearAds = adsRenderingSettings && adsRenderingSettings.useStyledLinearAds;
  } catch (e) {
    // Do nothing
  }
  return isMobile || useStyledLinearAds;
}

/**
 * @returns {boolean} - Whether to use playkit skip button or not.
 */
function useCustomSkipButton(): boolean {
  //TODO: false until we develop are own ads manager
  return false;
}

/**
 * @returns {boolean} - Whether to use playkit learn more button or not.
 */
function useCustomLearnMoreButton(): boolean {
  //TODO: false until we develop are own ads manager
  return false;
}
