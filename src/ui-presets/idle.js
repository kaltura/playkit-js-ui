//@flow
import {h} from 'preact';
import style from '../styles/style.scss';
import {Loading} from '../components/loading';

const PRESET_NAME = 'idle';

/**
 * Idle ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function idleUI(props: any): React$Element<any> {
  return (
    <div className={style.playbackGuiWWrapper}>
      <Loading player={props.player} />
    </div>
  );
}

idleUI.displayName = PRESET_NAME;
idleUI.sidePanelsAllowed = false;
