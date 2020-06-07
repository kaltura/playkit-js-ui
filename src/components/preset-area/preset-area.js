//@flow
import {h, Component} from 'preact/src/index';
import {PlayerArea} from '../player-area';

class PresetArea extends Component {
  /**
   * render component
   *
   * @returns {null | *} - component
   * @memberof PlayerArea
   */
  render(props): React$Element<any> | null {
    const {className, children, style} = props;
    return (
      <div className={className} style={style}>
        <PlayerArea name={'PresetArea'} {...this.props}>
          {children}
        </PlayerArea>
      </div>
    );
  }
}

export {PresetArea};
