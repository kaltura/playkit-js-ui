//@flow
import {h, Component} from 'preact/src/index';
import {FragmentContainer} from '../player-area';

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
        <FragmentContainer name={'PresetArea'} {...this.props}>
          {children}
        </FragmentContainer>
      </div>
    );
  }
}

export {PresetArea};
