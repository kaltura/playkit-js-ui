//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import {OverlayAction} from '../components/overlay-action';
import {PrePlaybackPlayOverlay} from '../components/pre-playback-play-overlay';
import {Loading} from '../components/loading';
import {RewindControl} from '../components/rewind';
import {Forward} from '../components/forward';
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
import {Logo} from '../components/logo/logo';

/**
 * Playback ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function playbackUI(props: any): React$Element<any> {
  return (
    <div className={style.playbackGuiWWrapper}>
      <KeyboardControl player={props.player} config={props.config} />
      <Loading player={props.player} />
      <PrePlaybackPlayOverlay player={props.player} />
      <CastBeforePlay player={props.player} />
      {Watermark.shouldRender(props) ? <Watermark player={props.player} /> : undefined}
      <div className={style.playerGui} id="player-gui">
        <OverlayPortal />
        <UnmuteIndication player={props.player} />
        <OverlayAction player={props.player} />
        <PictureInPictureOverlay player={props.player} />
        <PlaybackControls player={props.player} />
        <ShareControl player={props.player} />
        {PlaylistNextScreen.shouldRender(props) ? <PlaylistNextScreen player={props.player} /> : undefined}
        <BottomBar>
          <SeekBarPlaybackContainer showFramePreview showTimeBubble player={props.player} playerContainer={props.playerContainer} />
          <div className={style.leftControls}>
            <PlaybackControls player={props.player} />
            <RewindControl player={props.player} step={10} />
            <Forward player={props.player} step={10} />
            <TimeDisplayPlaybackContainer format="current / total" />
          </div>
          <div className={style.rightControls}>
            {VrStereoToggleControl.shouldRender(props) ? <VrStereoToggleControl player={props.player} /> : undefined}
            <VolumeControl player={props.player} />
            <LanguageControl player={props.player} />
            <SettingsControl player={props.player} />
            <CastControl player={props.player} />
            <PictureInPicture player={props.player} />
            <FullscreenControl player={props.player} />
            {Logo.shouldRender(props) ? <Logo player={props.player} /> : undefined}
          </div>
        </BottomBar>
      </div>
      {PlaylistCountdown.shouldRender(props) ? <PlaylistCountdown player={props.player} /> : undefined}
      <Backdrop />
    </div>
  );
}
