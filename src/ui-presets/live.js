//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import {OverlayAction} from '../components/overlay-action';
import {PrePlaybackPlayOverlay} from '../components/pre-playback-play-overlay';
import {Loading} from '../components/loading';
import {SeekBarLivePlaybackContainer} from '../components/seekbar-live-playback-container';
import {VolumeControl} from '../components/volume';
import {SettingsControl} from '../components/settings';
import {LanguageControl} from '../components/language';
import {FullscreenControl} from '../components/fullscreen';
import {BottomBar} from '../components/bottom-bar';
import {OverlayPortal} from '../components/overlay-portal';
import {KeyboardControl} from '../components/keyboard';
import {LiveTag} from '../components/live-tag';
import {UnmuteIndication} from '../components/unmute-indication';
import {Watermark} from '../components/watermark/watermark';
import {VrStereoToggleControl} from '../components/vr-stereo-toggle';
import {CastControl} from '../components/cast';
import {CastBeforePlay} from '../components/cast-on-tv/cast-before-play';
import {Backdrop} from '../components/backdrop/backdrop';
import {PlaybackControls} from '../components/playback-controls';
import {PictureInPicture} from '../components/picture-in-picture';
import {PictureInPictureOverlay} from '../components/picture-in-picture-overlay';
import {ShareControl} from '../components/share';
import {Container} from '../components/container';
import {TopBar} from '../components/top-bar';

const PRESET_NAME = 'Live';

/**
 * Live ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
export function liveUI(props: any): React$Element<any> {
  return (
    <Container
      className={style.playbackGuiWWrapper}
      name={'VideoOverlay'}
      player={props.player}
      targetPresetName={PRESET_NAME}
      preAppendTo={'Backdrop'}>
      <KeyboardControl player={props.player} config={props.config} />
      <Loading player={props.player} />
      <div className={style.playerGui} id="player-gui">
        <OverlayPortal />
        <UnmuteIndication player={props.player} />
        <OverlayAction player={props.player} />
        <PlaybackControls player={props.player} />
        <ShareControl player={props.player} />
        <TopBar>
          <Container className={style.leftControls} name={'TopBarLeftControls'} player={props.player} targetPresetName={PRESET_NAME} />
          <Container className={style.rightControls} name={'TopBarRightControls'} player={props.player} targetPresetName={PRESET_NAME} />
        </TopBar>
        <BottomBar>
          <SeekBarLivePlaybackContainer showFramePreview showTimeBubble player={props.player} playerContainer={props.playerContainer} />
          <Container className={style.leftControls} name={'BottomBarLeftControls'} player={props.player} targetPresetName={PRESET_NAME}>
            <PlaybackControls player={props.player} />
            <LiveTag player={props.player} />
          </Container>
          <Container className={style.rightControls} name={'BottomBarRightControls'} player={props.player} targetPresetName={PRESET_NAME}>
            {VrStereoToggleControl.shouldRender(props) ? <VrStereoToggleControl player={props.player} /> : undefined}
            <VolumeControl player={props.player} />
            <LanguageControl player={props.player} />
            <SettingsControl player={props.player} />
            <CastControl player={props.player} />
            <PictureInPicture player={props.player} />
            <FullscreenControl player={props.player} />
          </Container>
        </BottomBar>
      </div>
      {Watermark.shouldRender(props) ? <Watermark player={props.player} /> : undefined}
      <PrePlaybackPlayOverlay player={props.player} />
      <CastBeforePlay player={props.player} />
      <PictureInPictureOverlay player={props.player} />
      <Backdrop />
    </Container>
  );
}

liveUI.displayName = PRESET_NAME;
