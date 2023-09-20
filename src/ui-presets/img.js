//@flow
import style from '../styles/style.scss';
import {Fragment, h, Component} from 'preact';
import {PlayerArea, withPlayerPreset} from '../components/player-area';
import {Loading} from '../components/loading';
import {Fullscreen} from '../components/fullscreen';
import {VrStereo} from '../components/vr-stereo';
import {BottomBar} from '../components/bottom-bar';
import {OverlayPortal} from '../components/overlay-portal';
import {UnmuteIndication} from '../components/unmute-indication';
import {Watermark} from '../components/watermark/watermark';
import {Cast} from '../components/cast';
import {CastBeforePlay} from '../components/cast-on-tv/cast-before-play';
import {PlaybackControls} from '../components/playback-controls';
import {TopBar} from '../components/top-bar';
import {Logo} from '../components/logo/logo';
import {InteractiveArea} from '../components/interactive-area';
import {withKeyboardEvent} from 'components/keyboard';
import {VideoArea} from '../components/video-area';
import {GuiArea} from '../components/gui-area';

const PRESET_NAME = 'Img';

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
class ImgUI extends Component {
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
            <VideoArea />
            <GuiArea>
              <Fragment>
                <UnmuteIndication />
                <Loading />
                <OverlayPortal />
                <PlaybackControls name={'OverlayPlaybackControls'} className={style.centerPlaybackControls} />
                <CastBeforePlay />
              </Fragment>
              {() => (
                <Fragment>
                  <TopBar />
                  <InteractiveArea>
                    <Watermark />
                  </InteractiveArea>
                  <BottomBar rightControls={[VrStereo, Cast, Fullscreen, Logo]} leftControls={[]} />
                </Fragment>
              )}
            </GuiArea>
          </div>
        </PlayerArea>
      </div>
    );
  }
}

ImgUI.displayName = PRESET_NAME;

/**
 * Playback ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function imgUI(props: any): React$Element<any> {
  return <ImgUI {...props} />;
}
