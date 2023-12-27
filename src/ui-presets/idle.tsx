import {Component, h, VNode} from 'preact';
import style from '../styles/style.scss';
import {Loading, GuiArea, PlayerArea, withPlayerPreset} from '../components';

const PRESET_NAME = 'Idle';

/**
 * Idle ui interface component
 *
 * @returns {React$Element} player ui tree
 */
@withPlayerPreset({
  allowSidePanels: true,
  allowPlayerArea: true
})
class IdleUI extends Component<any, any> {
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

IdleUI.displayName = PRESET_NAME;

/**
 * Idle ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function idleUI(props: any): VNode<any> {
  return <IdleUI {...props} />;
}
