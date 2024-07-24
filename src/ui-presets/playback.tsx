import style from '../styles/style.scss';
import {Fragment, h, Component, VNode} from 'preact';
import {AdvancedAudioDesc, PlayerArea, withPlayerPreset} from '../components';
import {OverlayAction} from '../components';
import {PrePlaybackPlayOverlay} from '../components';
import {Loading} from '../components';
import {Rewind} from '../components';
import {Forward} from '../components';
import {CaptionsControl} from '../components';
import {SeekBarPlaybackContainer} from '../components';
import {Volume} from '../components';
import {Settings} from '../components';
import {Fullscreen} from '../components';
import {VrStereo} from '../components';
import {TimeDisplayPlaybackContainer} from '../components';
import {BottomBar} from '../components';
import {OverlayPortal} from '../components';
import {UnmuteIndication} from '../components';
import {Watermark} from '../components';
import {Cast} from '../components';
import {CastBeforePlay} from '../components';
import {PlaybackControls} from '../components';
import {PlaylistCountdown} from '../components/playlist-countdown';
import {PlaylistNextScreen} from '../components';
import {PictureInPicture} from '../components';
import {PictureInPictureOverlay} from '../components/picture-in-picture-overlay';
import {TopBar} from '../components';
import {Logo} from '../components';
import {InteractiveArea} from '../components';
import {withKeyboardEvent} from '../components';
import {VideoArea} from '../components';
import {GuiArea} from '../components';
import {ClosedCaptions} from '../components';
import {AudioEntryDetails} from '../components/audio-entry-details';

const PRESET_NAME = 'Playback';

/**
 * Playback ui interface component
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
@withPlayerPreset({
  allowSidePanels: true,
  allowPlayerArea: true
})
@withKeyboardEvent(PRESET_NAME)
class PlaybackUI extends Component<any, any> {
  /**
   * @returns {void}
   */
  componentDidMount(): void {
    const props = this.props;
    props.updateIsKeyboardEnabled(true);
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof PlaybackUI
   */
  render() {
    return (
      <div className={style.playbackGuiWrapper}>
        <PlayerArea name={'PresetArea'}>
          <div className={style.playerGui} id="player-gui">
            <OverlayAction />
            <VideoArea />
            <GuiArea>
              <Fragment>
                <AudioEntryDetails />
                <UnmuteIndication />
                <Loading />
                <OverlayPortal />
                <PictureInPictureOverlay />
                <PlaybackControls name={'OverlayPlaybackControls'} className={style.centerPlaybackControls} />
                <PlaylistNextScreen />
                <PrePlaybackPlayOverlay />
                <CastBeforePlay />
              </Fragment>
              {({containerRef}) => (
                <Fragment>
                  <TopBar />
                  <InteractiveArea>
                    <Watermark />
                    <PlaylistCountdown />
                  </InteractiveArea>
                  <BottomBar
                    leftControls={[PlaybackControls, Rewind, Forward, TimeDisplayPlaybackContainer]}
                    rightControls={[VrStereo, Volume, AdvancedAudioDesc, ClosedCaptions, CaptionsControl, Settings, Cast, PictureInPicture, Fullscreen, Logo]}>
                    <SeekBarPlaybackContainer showFramePreview showTimeBubble playerContainer={containerRef} />
                  </BottomBar>
                </Fragment>
              )}
            </GuiArea>
          </div>
        </PlayerArea>
      </div>
    );
  }
}

PlaybackUI.displayName = PRESET_NAME;

/**
 * Playback ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function playbackUI(props: any): VNode<any> {
  return <PlaybackUI {...props} />;
}
