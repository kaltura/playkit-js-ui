//@flow
import {h} from 'preact';
import style from '../styles/style.scss';
import Loading from '../components/loading';

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
      <Loading player={props.player}/>
    </div>
  )
}
