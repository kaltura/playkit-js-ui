//@flow
import {h, Component} from 'preact';
import {PlayerArea} from '../player-area';
import style from '../../styles/style.scss';

/**
 * PresetArea
 */
class PresetArea extends Component {
  /**
   * render component
   *
   * @param {any} props - params
   * @returns {null | *} - component
   * @memberof PlayerArea
   */
  render(props: any): React$Element<any> | null {
    const {children} = props;
    return (
      <div className={style.playbackGuiWrapper}>
        <PlayerArea name={'PresetArea'} {...this.props}>
          {children}
        </PlayerArea>
      </div>
    );
  }
}

export {PresetArea};
