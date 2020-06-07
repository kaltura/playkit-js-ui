//@flow
import {h, Component} from 'preact/src/index';
import {PlayerArea} from '../player-area';
import style from '../../styles/style.scss';

class PresetArea extends Component {
  /**
   * render component
   *
   * @returns {null | *} - component
   * @memberof PlayerArea
   */
  render(props): React$Element<any> | null {
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
