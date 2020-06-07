//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {PlayerArea} from 'components/player-area';
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
 * GuiArea component
 *
 * @class GuiArea
 * @extends {Component}
 */
class GuiArea extends Component {
  _ref: HTMLElement = null;

  /**
   * this component should not render itself when player object changes.
   * @param {Object} nextProps - next props of the component
   *
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate(nextProps: PropsType): boolean {
    return nextProps.presetStyles !== this.props.presetStyles;
  }

  /**
   *
   * @param {HTMLElement} ref - ref
   * @returns {void}
   * @private
   */
  _setRef = (ref: HTMLElement) => {
    this._ref = ref;
    this.setState(prevState => ({render: !prevState.render}));
  };

  /**
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
          <PlayerArea name={'GuiArea'} {...this.props}>
            {typeof children === 'function' ? children({containerRef: this._ref}) : children}
          </PlayerArea>
        </div>
      </div>
    );
  }
}

export {GuiArea};
