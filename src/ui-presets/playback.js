//@flow
import style from '../styles/style.scss';
import {Fragment, h, Component} from 'preact';
import {PlayerArea, withPlayerPreset} from '../components/player-area';
import {OverlayAction} from '../components/overlay-action';
import {PrePlaybackPlayOverlay} from '../components/pre-playback-play-overlay';
import {Loading} from '../components/loading';
import {Rewind} from '../components/rewind';
import {Forward} from '../components/forward';
import {SeekBarPlaybackContainer} from '../components/seekbar-playback-container';
import {Volume} from '../components/volume';
import {Settings} from '../components/settings';
import {Fullscreen} from '../components/fullscreen';
import {VrStereo} from '../components/vr-stereo';
import {TimeDisplayPlaybackContainer} from '../components/time-display-playback-container';
import {BottomBar} from '../components/bottom-bar';
import {OverlayPortal} from '../components/overlay-portal';
import {UnmuteIndication} from '../components/unmute-indication';
import {Watermark} from '../components/watermark/watermark';
import {Cast} from '../components/cast';
import {CastBeforePlay} from '../components/cast-on-tv/cast-before-play';
import {PlaybackControls} from '../components/playback-controls';
import {PlaylistCountdown} from '../components/playlist-countdown';
import {PlaylistNextScreen} from '../components/playlist-next-screen';
import {PictureInPicture} from '../components/picture-in-picture';
import {PictureInPictureOverlay} from '../components/picture-in-picture-overlay';
import {TopBar} from '../components/top-bar';
import {Logo} from '../components/logo/logo';
import {InteractiveArea} from '../components/interactive-area';
import {withKeyboardEvent} from 'components/keyboard';
import {VideoArea} from '../components/video-area';
import {GuiArea} from '../components/gui-area';
import {ClosedCaptions} from '../components/closed-captions';

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
class PlaybackUI extends Component {
  /**
   * @returns {void}
   */
  componentDidMount(): void {
    const props = this.props;
    props.updateIsKeyboardEnabled(true);
    this.setState({change: true});
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
                    leftControls={['PlaybackControls', 'Rewind', 'Forward', 'TimeDisplayPlaybackContainer']}
                    rightControls={['VrStereo', 'Volume', 'ClosedCaptions', 'Settings', 'Cast', 'PictureInPicture', 'Fullscreen', 'Logo']}>
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
export function playbackUI(props: any): React$Element<any> {
  return <PlaybackUI {...props} />;
}
