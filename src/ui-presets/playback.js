//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import getComponentConfig from '../utils/component-config';
import OverlayPlay from '../components/overlay-play';
import PrePlaybackPlayOverlay from '../components/pre-playback-play-overlay';
import Loading from '../components/loading';
import PlayPauseControl from '../components/play-pause';
import RewindControl from '../components/rewind';
import SeekBarPlaybackContainer from '../components/seekbar-playback-container';
import VolumeControl from '../components/volume';
import SettingsControl from '../components/settings';
import LanguageControl from '../components/language';
import FullscreenControl from '../components/fullscreen';
import TimeDisplayPlaybackContainer from '../components/time-display-playback-container';
import BottomBar from '../components/bottom-bar';
import OverlayPortal from '../components/overlay-portal';
import KeyboardControl from '../components/keyboard';
import UnmuteIndication from '../components/unmute-indication';

/**
 * Playback ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export default function playbackUI(props: any): React$Element<any> {

  return (
    <div className={style.playbackGuiWWrapper}>
      <KeyboardControl player={props.player} config={props.config}/>
      <Loading player={props.player}/>
      <div className={style.playerGui} id='player-gui'>
        <OverlayPortal/>
        <UnmuteIndication player={props.player}/>
        <OverlayPlay player={props.player}/>
        <BottomBar>
          <SeekBarPlaybackContainer showFramePreview showTimeBubble player={props.player}
                                    playerContainer={props.playerContainer}
                                    config={getComponentConfig(props.config, 'seekbar')}/>
          <div className={style.leftControls}>
            <PlayPauseControl player={props.player}/>
            <RewindControl player={props.player} step={10}/>
            <TimeDisplayPlaybackContainer format='current / total'/>
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
    </div>
  )
}
