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

const PRESET_NAME = 'live';

/**
 * Live ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
export function liveUI(props: any): React$Element<any> {
  return (
    <div className={style.playbackGuiWWrapper}>
      <KeyboardControl player={props.player} config={props.config} />
      <Loading player={props.player} />
      <div className={style.playerGui} id="player-gui">
        <OverlayPortal />
        <UnmuteIndication player={props.player} />
        <OverlayAction player={props.player} />
        <PlaybackControls player={props.player} />
        <ShareControl player={props.player} />
        <BottomBar>
          <SeekBarLivePlaybackContainer showFramePreview showTimeBubble player={props.player} playerContainer={props.playerContainer} />
          <div className={style.leftControls}>
            <PlaybackControls player={props.player} />
            <LiveTag player={props.player} />
          </div>
          <div className={style.rightControls}>
            {VrStereoToggleControl.shouldRender(props) ? <VrStereoToggleControl player={props.player} /> : undefined}
            <VolumeControl player={props.player} />
            <LanguageControl player={props.player} />
            <SettingsControl player={props.player} />
            <CastControl player={props.player} />
            <PictureInPicture player={props.player} />
            <FullscreenControl player={props.player} />
          </div>
        </BottomBar>
      </div>
      {Watermark.shouldRender(props) ? <Watermark player={props.player} /> : undefined}
      <PrePlaybackPlayOverlay player={props.player} />
      <CastBeforePlay player={props.player} />
      <PictureInPictureOverlay player={props.player} />
      <Backdrop />
    </div>
  );
}

liveUI.displayName = PRESET_NAME;
