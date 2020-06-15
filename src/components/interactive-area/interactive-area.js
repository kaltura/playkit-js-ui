//@flow
import {h, Component} from 'preact';
import {withPlayer} from 'components/player';
import style from '../../styles/style.scss';
import {PlayerArea} from 'components/player-area';

@withPlayer
/**
 * InteractiveArea component
 *
 * @class InteractiveArea
 * @extends {Component}
 */
class InteractiveArea extends Component {
  /**
   * should component update handler
   *
   * @returns {boolean} shouldComponentUpdate
   */
  shouldComponentUpdate(): boolean {
    return false;
  }
  /**
   * @returns {void}
   */
  render() {
    const {children} = this.props;
    return (
      <div className={style.interactiveArea}>
        <div style={{pointerEvents: 'auto'}}>
          <PlayerArea name={'InteractiveArea'}>{children}</PlayerArea>
        </div>
      </div>
    );
  }
}

export {InteractiveArea};
