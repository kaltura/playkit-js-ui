//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import {OverlayAction} from '../components/overlay-action';
import {PrePlaybackPlayOverlay} from '../components/pre-playback-play-overlay';
import {Loading} from '../components/loading';
import {SeekBarLivePlaybackContainer} from '../components/seekbar-live-playback-container';
import {Volume} from '../components/volume';
import {Settings} from '../components/settings';
import {Language} from '../components/language';
import {Fullscreen} from '../components/fullscreen';
import {BottomBar} from '../components/bottom-bar';
import {OverlayPortal} from '../components/overlay-portal';
import {LiveTag} from '../components/live-tag';
import {UnmuteIndication} from '../components/unmute-indication';
import {Watermark} from '../components/watermark/watermark';
import {VrStereo} from '../components/vr-stereo';
import {Cast} from '../components/cast';
import {CastBeforePlay} from '../components/cast-on-tv/cast-before-play';
import {Backdrop} from '../components/backdrop/backdrop';
import {PlaybackControls} from '../components/playback-controls';
import {PictureInPicture} from '../components/picture-in-picture';
import {PictureInPictureOverlay} from '../components/picture-in-picture-overlay';
import {Share} from '../components/share';
import {PlayerArea} from '../components/player-area';
import {TopBar} from '../components/top-bar';
import {Logo} from '../components/logo/logo';
import {InteractiveArea} from 'components/interactive-area';
import {PresetSettings} from '../components/preset-settings';
import {withKeyboardEvent} from 'components/keyboard';

const PRESET_NAME = 'Live';

/**
 * Live ui interface component
 *
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
export function LiveUI(props: any): React$Element<any> {
  props.updateIsKeyboardEnabled(true);
  return (
    <Fragment>
    <PresetSettings 
    allowSidePanels={true} allowPlayerArea={true} allowVideoArea={true} />
       <PlayerArea preAppendTo={'Backdrop'} name={'PresetArea'} className={style.playbackGuiWrapper}> 
      <Loading />
      <div className={style.playerGui} id="player-gui">
        <OverlayPortal />
        <UnmuteIndication />
        <OverlayAction /> 
        <PlaybackControls />
        <InteractiveArea />
        <TopBar>
          <PlayerArea className={style.leftControls} name={'TopBarLeftControls'} />
          <PlayerArea className={style.rightControls} name={'TopBarRightControls'}>
            <Share />
          </PlayerArea>
        </TopBar>
        <BottomBar>
          <SeekBarLivePlaybackContainer showFramePreview showTimeBubble playerContainer={props.playerContainer} />
          <PlayerArea className={style.leftControls} name={'BottomBarLeftControls'}>
            <PlaybackControls />
            <LiveTag />
          </PlayerArea>
          <PlayerArea className={style.rightControls} name={'BottomBarRightControls'}>
            <VrStereo />
            <Volume />
            <Language />
            <Settings />
            <Cast />
            <PictureInPicture />
            <Fullscreen />
            <Logo />
          </PlayerArea>
        </BottomBar>
      </div>
      <Watermark />
      <PrePlaybackPlayOverlay />
      <CastBeforePlay />
      <PictureInPictureOverlay />
      <Backdrop />
    </PlayerArea>
    </Fragment>
  );
}

const LiveUIComponent = withKeyboardEvent(PRESET_NAME)(LiveUI);
LiveUIComponent.displayName = PRESET_NAME;

/**
 * Live ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
export function liveUI(props: any): React$Element<any> {
  return <LiveUIComponent {...props} />;
}
