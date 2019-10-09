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
import {Keyboard} from '../components/keyboard';
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
import {Container} from '../components/container';
import {TopBar} from '../components/top-bar';
import {Logo} from '../components/logo/logo';
import {PresetArea} from 'components/preset-area';
import {PresetVideoAreaContainer} from 'components/side-panels-container';
import {InteractiveArea} from 'components/interactive-area';

const PRESET_NAME = 'Live';

/**
 * Live ui interface component
 *
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
export function LiveUI(props: any): React$Element<any> {
  return (
    <PresetArea allowSidePanels={true} preAppendTo={'Backdrop'} className={style.playbackGuiWWrapper}>
      <Keyboard config={props.config} />
      <Loading />
      <Container className={style.playerGui} name={'BarsArea'} id="player-gui">
        <OverlayPortal />
        <UnmuteIndication />
        <OverlayAction />
        <PlaybackControls />
        <PresetVideoAreaContainer>{context => <Container className={context.className} name={'VideoArea'} style={context.style} />}</PresetVideoAreaContainer>
        <InteractiveArea>
          {style => (
            <div style={style}>
              <Container style={{pointerEvents: 'auto'}} name={'InteractiveArea'} />
            </div>
          )}
        </InteractiveArea>
        <TopBar>
          <Container className={style.leftControls} name={'TopBarLeftControls'} />
          <Container className={style.rightControls} name={'TopBarRightControls'}>
            <Share />
          </Container>
        </TopBar>
        <BottomBar>
          <SeekBarLivePlaybackContainer showFramePreview showTimeBubble playerContainer={props.playerContainer} />
          <Container className={style.leftControls} name={'BottomBarLeftControls'}>
            <PlaybackControls />
            <LiveTag />
          </Container>
          <Container className={style.rightControls} name={'BottomBarRightControls'}>
            <VrStereo />
            <Volume />
            <Language />
            <Settings />
            <Cast />
            <PictureInPicture />
            <Fullscreen />
            <Logo />
          </Container>
        </BottomBar>
      </Container>
      <Watermark />
      <PrePlaybackPlayOverlay />
      <CastBeforePlay />
      <PictureInPictureOverlay />
      <Backdrop />
    </PresetArea>
  );
}

LiveUI.displayName = PRESET_NAME;

/**
 * Live ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
export function liveUI(props: any): React$Element<any> {
  return <LiveUI {...props} />;
}
