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
import {Language} from '../components/language';
import {Fullscreen} from '../components/fullscreen';
import {VrStereo} from '../components/vr-stereo';
import {TimeDisplayPlaybackContainer} from '../components/time-display-playback-container';
import {BottomBar} from '../components/bottom-bar';
import {OverlayPortal} from '../components/overlay-portal';
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
import {Logo} from '../components/logo/logo';
import {InteractiveArea} from '../components/interactive-area';
import {withKeyboardEvent} from 'components/keyboard';
import {PresetContainer} from '../components/preset-container';
import {PresetVideoContainer} from '../components/preset-video-container';
const PRESET_NAME = 'Playback';

/**
 * Playback ui interface component
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
class PlaybackUI extends Component {
  render() {
    const props = this.props;
    props.updateIsKeyboardEnabled(true); // TODO yair consider moving this line to component did mount
    return (
      <div className={style.playbackGuiWrapper}>
        <OverlayPortal />
        <UnmuteIndication />
        <OverlayAction />
        <PresetVideoContainer />
        <Loading />
        <PresetContainer>
          {({containerRef}) => (
            <Fragment>
              <PictureInPictureOverlay />
              <PlaybackControls />
              <PlaylistNextScreen />
              <InteractiveArea />
              <TopBar rightControls={<Share />} />
              <BottomBar
                leftControls={
                  <Fragment>
                    <PlaybackControls />
                    <Rewind step={10} />
                    <Forward step={10} />
                    <TimeDisplayPlaybackContainer format="current / total" />
                  </Fragment>
                }
                rightControls={
                  <Fragment>
                    <VrStereo />
                    <Volume />
                    <Language />
                    <Settings />
                    <Cast />
                    <PictureInPicture />
                    <Fullscreen />
                    <Logo />
                  </Fragment>
                }>
                <SeekBarPlaybackContainer showFramePreview showTimeBubble playerContainer={containerRef} />
              </BottomBar>
            </Fragment>
          )}
        </PresetContainer>
        <Watermark />
        <PlaylistCountdown />
        <PrePlaybackPlayOverlay />
        <CastBeforePlay />
        <Backdrop />
      </div>
    );
  }
}

const PlaybackComponent = withPlayerPreset({
  allowSidePanels: true,
  allowPlayerArea: true,
  allowVideoArea: true
})(withKeyboardEvent(PRESET_NAME)(PlaybackUI));
PlaybackComponent.displayName = PRESET_NAME;

/**
 * Playback ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function playbackUI(props: any): React$Element<any> {
  return <PlaybackComponent {...props} />;
}
