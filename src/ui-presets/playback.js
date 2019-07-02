//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import {Container} from '../components/container';
import {OverlayAction} from '../components/overlay-action';
import {PrePlaybackPlayOverlay} from '../components/pre-playback-play-overlay';
import {Loading} from '../components/loading';
import {RewindControl} from '../components/rewind';
import {SeekBarPlaybackContainer} from '../components/seekbar-playback-container';
import {VolumeControl} from '../components/volume';
import {SettingsControl} from '../components/settings';
import {LanguageControl} from '../components/language';
import {FullscreenControl} from '../components/fullscreen';
import {VrStereoToggleControl} from '../components/vr-stereo-toggle';
import {TimeDisplayPlaybackContainer} from '../components/time-display-playback-container';
import {BottomBar} from '../components/bottom-bar';
import {OverlayPortal} from '../components/overlay-portal';
import {KeyboardControl} from '../components/keyboard';
import {UnmuteIndication} from '../components/unmute-indication';
import {Watermark} from '../components/watermark/watermark';
import {CastControl} from '../components/cast';
import {CastBeforePlay} from '../components/cast-on-tv/cast-before-play';
import {Backdrop} from '../components/backdrop/backdrop';
import {PlaybackControls} from '../components/playback-controls';
import {PlaylistCountdown} from '../components/playlist-countdown';
import {PlaylistNextScreen} from '../components/playlist-next-screen';
import {PictureInPicture} from '../components/picture-in-picture';
import {PictureInPictureOverlay} from '../components/picture-in-picture-overlay';
import {ShareControl} from '../components/share';
import {TopBar} from '../components/top-bar';

const PRESET_NAME = 'playback';
/**
 * Playback ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function playbackUI(props: any): React$Element<any> {
  return (
    <Container className={style.playbackGuiWWrapper} name={'player-container'} player={props.player} targetPresetName={PRESET_NAME}>
      <KeyboardControl player={props.player} config={props.config} />
      <Loading player={props.player} />
      <Container className={style.playerGui} name={'player-gui'} player={props.player} targetPresetName={PRESET_NAME}>
        <OverlayPortal />
        <UnmuteIndication player={props.player} />
        <OverlayAction player={props.player} />
        <ShareControl player={props.player} />
        <TopBar>
          <Container className={style.leftControls} name={'top-bar__left-controls'} player={props.player} targetPresetName={PRESET_NAME} />
          <Container className={style.rightControls} name={'top-bar__right-controls'} player={props.player} targetPresetName={PRESET_NAME} />
        </TopBar>
        {PlaylistNextScreen.shouldRender(props) ? <PlaylistNextScreen player={props.player} /> : undefined}
        <BottomBar>
          <SeekBarPlaybackContainer showFramePreview showTimeBubble player={props.player} playerContainer={props.playerContainer} />
          <Container className={style.leftControls} name={'bottom-bar__left-controls'} player={props.player} targetPresetName={PRESET_NAME}>
            <PlaybackControls player={props.player} />
            <RewindControl player={props.player} step={10} />
            <TimeDisplayPlaybackContainer format="current / total" />
          </Container>
          <Container className={style.rightControls} name={'bottom-bar__right-controls'} player={props.player} targetPresetName={PRESET_NAME}>
            {VrStereoToggleControl.shouldRender(props) ? <VrStereoToggleControl player={props.player} /> : undefined}
            <VolumeControl player={props.player} />
            <LanguageControl player={props.player} />
            <SettingsControl player={props.player} />
            <CastControl player={props.player} />
            <PictureInPicture player={props.player} />
            <FullscreenControl player={props.player} />
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

playbackUI.displayName = PRESET_NAME;
