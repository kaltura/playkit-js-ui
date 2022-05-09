//@flow
import {Component, h} from 'preact';
import style from '../styles/style.scss';
import {Loading} from '../components/loading';
import {PlayerArea, withPlayerPreset} from '../components/player-area';
import {GuiArea} from 'components/gui-area';

export const IDLE_PRESET_NAME = 'Idle';

/**
 * Idle ui interface component
 *
 * @returns {React$Element} player ui tree
 */
@withPlayerPreset({
  allowSidePanels: true,
  allowPlayerArea: true
})
class IdleUI extends Component {
  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof IdleUI
   */
  render() {
    return (
      <div className={style.playbackGuiWrapper}>
        <PlayerArea name={'PresetArea'}>
          <GuiArea>
            <Loading />
          </GuiArea>
        </PlayerArea>
      </div>
    );
  }
}

IdleUI.displayName = IDLE_PRESET_NAME;

/**
 * Idle ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function idleUI(props: any): React$Element<any> {
  return <IdleUI {...props} />;
}
