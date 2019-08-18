//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import {Container} from '../components/container';
import {OverlayAction} from '../components/overlay-action';
import {PrePlaybackPlayOverlay} from '../components/pre-playback-play-overlay';
import {Loading} from '../components/loading';
import {Rewind} from '../components/rewind';
import {SeekBarPlaybackContainer} from '../components/seekbar-playback-container';
import {Volume} from '../components/volume';
import {Settings} from '../components/settings';
import {Language} from '../components/language';
import {Fullscreen} from '../components/fullscreen';
import {VrStereoToggleControl} from '../components/vr-stereo-toggle';
import {TimeDisplayPlaybackContainer} from '../components/time-display-playback-container';
import {BottomBar} from '../components/bottom-bar';
import {OverlayPortal} from '../components/overlay-portal';
import {Keyboard} from '../components/keyboard';
import {UnmuteIndication} from '../components/unmute-indication';
import {Watermark} from '../components/watermark/watermark';
import {Cast} from '../components/cast';
import {CastBeforePlay} from '../components/cast-on-tv/cast-before-play';
import {Backdrop} from '../components/backdrop/backdrop';
import {PlaybackControls} from '../components/playback-controls';
import {PlaylistCountdown} from '../components/playlist-countdown';
import {PlaylistNextScreen} from '../components/playlist-next-screen';
import {PictureInPicture} from '../components/picture-in-picture';
import {PictureInPictureOverlay} from '../components/picture-in-picture-overlay';
import {Share} from '../components/share';
import {TopBar} from '../components/top-bar';

const PRESET_NAME = 'Playback';

/**
 * Playback ui interface component
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
function PlaybackUI(props: any): React$Element<any> {
  return (
    <Container
      className={style.playbackGuiWWrapper}
      name={'VideoOverlay'}
      player={props.player}
      targetPresetName={PRESET_NAME}
      preAppendTo={'Backdrop'}>
      <Keyboard player={props.player} config={props.config} />
      <Loading player={props.player} />
      <Container className={style.playerGui} name={'PlayerGUI'} player={props.player} targetPresetName={PRESET_NAME} id="player-gui">
        <OverlayPortal />
        <UnmuteIndication player={props.player} />
        <OverlayAction player={props.player} />
        <PlaybackControls player={props.player} />
        {PlaylistNextScreen.shouldRender(props) ? <PlaylistNextScreen player={props.player} /> : undefined}
        <TopBar>
          <Container className={style.leftControls} name={'TopBarLeftControls'} player={props.player} targetPresetName={PRESET_NAME} />
          <Container className={style.rightControls} name={'TopBarRightControls'} player={props.player} targetPresetName={PRESET_NAME}>
            <Share player={props.player} />
          </Container>
        </TopBar>
        <BottomBar>
          <SeekBarPlaybackContainer showFramePreview showTimeBubble player={props.player} playerContainer={props.playerContainer} />
          <Container className={style.leftControls} name={'BottomBarLeftControls'} player={props.player} targetPresetName={PRESET_NAME}>
            <PlaybackControls player={props.player} />
            <Rewind player={props.player} step={10} />
            <TimeDisplayPlaybackContainer format="current / total" />
          </Container>
          <Container className={style.rightControls} name={'BottomBarRightControls'} player={props.player} targetPresetName={PRESET_NAME}>
            {VrStereoToggleControl.shouldRender(props) ? <VrStereoToggleControl player={props.player} /> : undefined}
            <Volume player={props.player} />
            <Language player={props.player} />
            <Settings player={props.player} />
            <Cast player={props.player} />
            <PictureInPicture player={props.player} />
            <Fullscreen player={props.player} />
          </Container>
        </BottomBar>
      </Container>
      {Watermark.shouldRender(props) ? <Watermark player={props.player} /> : undefined}
      {PlaylistCountdown.shouldRender(props) ? <PlaylistCountdown player={props.player} /> : undefined}
      <PrePlaybackPlayOverlay player={props.player} />
      <CastBeforePlay player={props.player} />
      <PictureInPictureOverlay player={props.player} />
      <Backdrop />
    </Container>
  );
}

PlaybackUI.displayName = PRESET_NAME;

/**
 * Playback ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function playbackUI(props: any): React$Element<any> {
  return <PlaybackUI {...props} />;
}
