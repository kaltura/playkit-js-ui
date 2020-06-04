//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {FragmentContainer} from 'components/player-area';
import style from '../../styles/style.scss';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  presetStyles: state.shell.layoutStyles.preset
});

@connect(mapStateToProps)
/**
 * PresetContainer component
 *
 * @class PresetArea
 * @example <PresetContainer>...</PresetContainer>
 * @extends {Component}
 */
class GuiArea extends Component {
  _ref: HTMLElement = null;

  /**
   * this component should not render itself when player object changes.
   *
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate(nextProps: PropsType): boolean {
    return nextProps.presetStyles !== this.props.presetStyles;
  }

  _setRef = ref => {
    this._ref = ref;
    this.setState(prevState => ({render: !prevState.render}));
  };

  /*
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof VideoPlayer
   */
  render(): React$Element<any> {
    const {presetStyles, children} = this.props;
    return (
      <div ref={this._setRef} style={presetStyles} className={style.guiArea}>
        <div style={{pointerEvents: 'auto'}}>
          <FragmentContainer name={'GuiArea'} {...this.props}>
            {typeof children === 'function' ? children({containerRef: this._ref}) : children}
          </FragmentContainer>
        </div>
      </div>
    );
  }
}

export {GuiArea};
