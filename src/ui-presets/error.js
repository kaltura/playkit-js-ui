//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import {ErrorOverlay} from '../components/error-overlay';
import {PlayerArea} from 'components/player-area';
import {GuiArea} from 'components/gui-area';
import {Fragment} from 'preact';

const PRESET_NAME = 'Error';

/**
 * Error ui component
 *
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function ErrorUI(): React$Element<any> {
  // first child of gui area contain the elements of gui area.
  // second child of gui area will contain only the bars and interactive area
  return (
    <div className={style.playbackGuiWrapper}>
      <PlayerArea name={'PresetArea'}>
        <GuiArea>
          <Fragment>
            <ErrorOverlay />
          </Fragment>
        </GuiArea>
      </PlayerArea>
    </div>
  );
}

ErrorUI.displayName = PRESET_NAME;

/**
 * Error ui
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export function errorUI(props: any): React$Element<any> {
  return <ErrorUI {...props} />;
}
