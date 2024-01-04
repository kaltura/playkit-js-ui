import style from '../styles/style.scss';
import {Component, Fragment, h, VNode} from 'preact';
import {OverlayAction} from '../components';
import {PrePlaybackPlayOverlay} from '../components';
import {Loading} from '../components';
import {SeekBarLivePlaybackContainer} from '../components';
import {Volume} from '../components';
import {Settings} from '../components';
import {Fullscreen} from '../components';
import {BottomBar} from '../components';
import {OverlayPortal} from '../components';
import {LiveTag} from '../components';
import {UnmuteIndication} from '../components';
import {Watermark} from '../components';
import {VrStereo} from '../components';
import {Cast} from '../components';
import {CastBeforePlay} from '../components';
import {PlaybackControls} from '../components';
import {PictureInPicture} from '../components';
import {PictureInPictureOverlay} from '../components/picture-in-picture-overlay';
import {PlayerArea, withPlayerPreset} from '../components';
import {TopBar} from '../components';
import {Logo} from '../components';
import {InteractiveArea} from '../components';
import {withKeyboardEvent} from '../components';
import {VideoArea} from '../components';
import {GuiArea} from '../components';
import {Rewind} from '../components';
import {Forward} from '../components';
import {ClosedCaptions} from '../components';
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
class LiveUI extends Component<any, any> {
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
                    leftControls={[PlaybackControls, Rewind, Forward, LiveTag]}
                    rightControls={[VrStereo, Volume, ClosedCaptions, Settings, Cast, PictureInPicture, Fullscreen, Logo]}
                  >
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
export function liveUI(props: any): VNode<any> {
  return <LiveUI {...props} />;
}
