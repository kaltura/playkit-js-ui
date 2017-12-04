//@flow
import style from '../styles/style.scss';
import {h} from 'preact';
import ErrorOverlay from '../components/error-overlay';
import getComponentConfig from "../utils/component-config";

/**
 * Error ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export default function errorUI(props: any): React$Element<any> {
  return (
    <div className={style.playbackGuiWWrapper}>
      <ErrorOverlay config={getComponentConfig(props.config, 'errorOverlay')}
                    player={props.player}
                    updateHasError={error=>props.updateHasError(error)}
      />
    </div>
  )
}
