import style from '../styles/style.scss';
import {Fragment, h, Component, VNode} from 'preact';
import {PlayerArea, withPlayerPreset} from '../components';
import {Loading} from '../components';
import {Fullscreen} from '../components';
import {VrStereo} from '../components';
import {BottomBar} from '../components';
import {OverlayPortal} from '../components';
import {UnmuteIndication} from '../components';
import {Watermark} from '../components';
import {Cast} from '../components';
import {CastBeforePlay} from '../components';
import {PlaybackControls} from '../components';
import {TopBar} from '../components';
import {Logo} from '../components';
import {InteractiveArea} from '../components';
import {withKeyboardEvent} from '../components';
import {VideoArea} from '../components';
import {GuiArea} from '../components';

const PRESET_NAME = 'Document';

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
class DocUI extends Component<any, any> {
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

DocUI.displayName = PRESET_NAME;

/**
 * Playback ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function docUI(props: any): VNode<any> {
  return <DocUI {...props} />;
}
