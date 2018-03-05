//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import OverlayAction from '../components/overlay-action';
import PrePlaybackPlayOverlay from '../components/pre-playback-play-overlay';
import Loading from '../components/loading';
import PlayPauseControl from '../components/play-pause';
import SeekBarLivePlaybackContainer from '../components/seekbar-live-playback-container';
import VolumeControl from '../components/volume';
import SettingsControl from '../components/settings';
import LanguageControl from '../components/language';
import FullscreenControl from '../components/fullscreen';
import BottomBar from '../components/bottom-bar';
import OverlayPortal from '../components/overlay-portal';
import KeyboardControl from '../components/keyboard';
import LiveTag from '../components/live-tag';
import UnmuteIndication from '../components/unmute-indication';
import getComponentConfig from '../utils/component-config';
import Watermark from "../components/watermark/watermark";

/**
 * Live ui intrface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
export default function liveUI(props: any): React$Element<any> {
  return (
    <div className={style.playbackGuiWWrapper}>
      <KeyboardControl player={props.player} config={props.config}/>
      <Loading player={props.player}/>
      <div className={style.playerGui} id='player-gui'>
        <OverlayPortal/>
        <UnmuteIndication/>
        <OverlayAction player={props.player}/>
        <BottomBar>
          <SeekBarLivePlaybackContainer
            showFramePreview
            showTimeBubble
            player={props.player}
            playerContainer={props.playerContainer}
            config={getComponentConfig(props.config, 'seekbar')}/>
          <div className={style.leftControls}>
            <PlayPauseControl player={props.player}/>
            <LiveTag player={props.player}/>
          </div>
          <div className={style.rightControls}>
            <VolumeControl player={props.player}/>
            <LanguageControl player={props.player}/>
            <SettingsControl player={props.player}/>
            <FullscreenControl player={props.player} config={props.config}/>
          </div>
        </BottomBar>
      </div>
      <PrePlaybackPlayOverlay player={props.player}/>
      {props.uiconfig.watermark ?
        <Watermark player={props.player}
                   img={props.uiconfig.watermark.img}
                   url={props.uiconfig.watermark.url}
                   timeout={props.uiconfig.watermark.timeout}
                   placement={props.uiconfig.watermark.placement}/> : undefined
      }
    </div>
  )
}
