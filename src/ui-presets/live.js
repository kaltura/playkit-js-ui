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

const PRESET_NAME = 'Live';

/**
 * Live ui interface component
 *
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
export function LiveUI(props: any): React$Element<any> {
  return (
    <Container className={style.playbackGuiWWrapper} name={'VideoOverlay'} player={props.player} preAppendTo={'Backdrop'}>
      <Keyboard player={props.player} config={props.config} />
      <Loading player={props.player} />
      <Container className={style.playerGui} name={'PlayerGUI'} player={props.player} id="player-gui">
        <OverlayPortal />
        <UnmuteIndication player={props.player} />
        <OverlayAction player={props.player} />
        <PlaybackControls player={props.player} />
        <TopBar>
          <Container className={style.leftControls} name={'TopBarLeftControls'} player={props.player} />
          <Container className={style.rightControls} name={'TopBarRightControls'} player={props.player}>
            <Share player={props.player} />
          </Container>
        </TopBar>
        <BottomBar>
          <SeekBarLivePlaybackContainer showFramePreview showTimeBubble player={props.player} playerContainer={props.playerContainer} />
          <Container className={style.leftControls} name={'BottomBarLeftControls'} player={props.player}>
            <PlaybackControls player={props.player} />
            <LiveTag player={props.player} />
          </Container>
          <Container className={style.rightControls} name={'BottomBarRightControls'} player={props.player}>
            {VrStereo.shouldRender(props) ? <VrStereo player={props.player} /> : undefined}
            <Volume player={props.player} />
            <Language player={props.player} />
            <Settings player={props.player} />
            <Cast player={props.player} />
            <PictureInPicture player={props.player} />
            <Fullscreen player={props.player} />
            {Logo.shouldRender(props) ? <Logo player={props.player} /> : undefined}
          </Container>
        </BottomBar>
      </Container>
      {Watermark.shouldRender(props) ? <Watermark player={props.player} /> : undefined}
      <PrePlaybackPlayOverlay player={props.player} />
      <CastBeforePlay player={props.player} />
      <PictureInPictureOverlay player={props.player} />
      <Backdrop />
    </Container>
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
