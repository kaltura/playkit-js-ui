//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import {OverlayAction} from '../components/overlay-action';
import {PrePlaybackPlayOverlay} from '../components/pre-playback-play-overlay';
import {Loading} from '../components/loading';
import {PlayPauseControl} from '../components/play-pause';
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
import {shouldRenderComponent} from '../utils/component-config';

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
      <KeyboardControl player={props.player} config={props.config}/>
      <Loading player={props.player}/>
      <div className={style.playerGui} id='player-gui'>
        <OverlayPortal/>
        <UnmuteIndication player={props.player}/>
        <OverlayAction player={props.player}/>
        <BottomBar>
          <SeekBarPlaybackContainer showFramePreview
                                    showTimeBubble
                                    player={props.player}
                                    playerContainer={props.playerContainer}/>
          <div className={style.leftControls}>
            <PlayPauseControl player={props.player}/>
            <RewindControl player={props.player} step={10}/>
            <TimeDisplayPlaybackContainer format='current / total'/>
          </div>
          <div className={style.rightControls}>
            {(props.player.isVr() && shouldRenderComponent(props.config, VrStereoToggleControl.displayName))
              ? <VrStereoToggleControl player={props.player}/>
              : undefined}
            <VolumeControl player={props.player}/>
            <LanguageControl player={props.player}/>
            <SettingsControl player={props.player}/>
            <FullscreenControl player={props.player}/>
          </div>
        </BottomBar>
      </div>
      <PrePlaybackPlayOverlay player={props.player}/>
      {shouldRenderComponent(props.config, Watermark.displayName)
        ? <Watermark player={props.player}/>
        : undefined}
    </div>
  )
}
