//@flow
import style from '../styles/style.scss';
import {Component, Fragment, h} from 'preact';
import {OverlayAction} from '../components/overlay-action';
import {PrePlaybackPlayOverlay} from '../components/pre-playback-play-overlay';
import {Loading} from '../components/loading';
import {SeekBarLivePlaybackContainer} from '../components/seekbar-live-playback-container';
import {Volume} from '../components/volume';
import {Settings} from '../components/settings';
import {Language} from '../components/language';
import {Fullscreen} from '../components/fullscreen';
import {BottomBar} from '../components/bottom-bar';
import {OverlayPortal} from '../components/overlay-portal';
import {LiveTag} from '../components/live-tag';
import {UnmuteIndication} from '../components/unmute-indication';
import {Watermark} from '../components/watermark/watermark';
import {VrStereo} from '../components/vr-stereo';
import {Cast} from '../components/cast';
import {CastBeforePlay} from '../components/cast-on-tv/cast-before-play';
import {PlaybackControls} from '../components/playback-controls';
import {PictureInPicture} from '../components/picture-in-picture';
import {PictureInPictureOverlay} from '../components/picture-in-picture-overlay';
import {PlayerArea, withPlayerPreset} from '../components/player-area';
import {TopBar} from '../components/top-bar';
import {Logo} from '../components/logo/logo';
import {InteractiveArea} from 'components/interactive-area';
import {withKeyboardEvent} from 'components/keyboard';
import {VideoArea} from 'components/video-area';
import {GuiArea} from 'components/gui-area';
import {Rewind} from 'components/rewind';
import {Forward} from 'components/forward';
const PRESET_NAME = 'Live';

/**
 * Live ui interface component
 *
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
@withPlayerPreset({
  allowSidePanels: true,
  allowPlayerArea: true
})
@withKeyboardEvent(PRESET_NAME)
class LiveUI extends Component {
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
   * @memberof LiveUI
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
                <Loading />
                <OverlayPortal />
                <PictureInPictureOverlay />
                <PlaybackControls name={'OverlayPlaybackControls'} className={style.centerPlaybackControls} />
                <PrePlaybackPlayOverlay />
                <CastBeforePlay />
              </Fragment>
              {({containerRef}) => (
                <Fragment>
                  <TopBar />
                  <InteractiveArea>
                    <Watermark />
                    <UnmuteIndication />
                  </InteractiveArea>
                  <BottomBar
                    leftControls={
                      <Fragment>
                        <PlaybackControls name={'BottomBarPlaybackControls'} showPreview={true} />
                        <Rewind step={10} />
                        <Forward step={10} />
                        <LiveTag />
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
                    <SeekBarLivePlaybackContainer showFramePreview showTimeBubble playerContainer={containerRef} />
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

LiveUI.displayName = PRESET_NAME;

/**
 * Live ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element<any>} player ui tree
 */
export function liveUI(props: any): React$Element<any> {
  return <LiveUI {...props} />;
}
