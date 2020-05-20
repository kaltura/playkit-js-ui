//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  presetStyles: state.shell.layoutStyles.preset
  });

@connect(
  mapStateToProps
)
/**
 * PresetContainer component
 *
 * @class PresetContainer
 * @example <PresetContainer>...</PresetContainer>
 * @extends {Component}
 */
class PresetContainer extends Component {
 
  /**
   * this component should not render itself when player object changes.
   *
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate(nextProps: PropsType): boolean {
    return nextProps.presetStyles !== this.props.presetStyles;
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof VideoPlayer
   */
  render(): React$Element<any> {
    const {presetStyles,children, className} = this.props;
    const style = {...presetStyles, pointerEvents: 'none'};
    return (
      <div style={style} className={className} >
          <div style={{pointerEvents: 'auto'}}>
            {children}
         </div>
      </div>
    );
  }
}

export {PresetContainer};
