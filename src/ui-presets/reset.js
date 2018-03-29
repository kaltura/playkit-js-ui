//@flow
import {h} from 'preact';
import style from '../styles/style.scss';
import Loading from '../components/loading';

/**
 * Reset ui interface
 *
 * @export
 * @param {*} props component props
 * @returns {React$Element} player ui tree
 */
export default function resetUI(props: any): React$Element<any> {
  return (
    <div className={style.playbackGuiWWrapper}>
      <Loading player={props.player}/>
    </div>
  )
}
