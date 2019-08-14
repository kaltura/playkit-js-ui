//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import {ErrorOverlay} from '../components/error-overlay';

const PRESET_NAME = 'Error';

/**
 * Error ui
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function errorUI(props: any): React$Element<any> {
  return (
    <div className={style.playbackGuiWWrapper}>
      <ErrorOverlay player={props.player} />
    </div>
  );
}

errorUI.displayName = PRESET_NAME;
