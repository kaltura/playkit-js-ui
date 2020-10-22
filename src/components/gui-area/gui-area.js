//@flow
import {h, Component, toChildArray} from 'preact';
import {connect} from 'react-redux';
import {PlayerArea} from 'components/player-area';
import style from '../../styles/style.scss';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  guiStyles: state.shell.layoutStyles.gui
});

/**
 * GuiArea component
 *
 * @class GuiArea
 * @extends {Component}
 */
@connect(mapStateToProps)
class GuiArea extends Component {
  _ref: ?HTMLDivElement;

  /**
   * this component should not render itself when player object changes.
   * @param {Object} nextProps - next props of the component
   * @param {Object} nextState - next state of the component
   *
   * @returns {void}
   */
  shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
    return nextProps.guiStyles !== this.props.guiStyles || nextState.render !== this.state.render;
  }

  /**
   *
   * @param {HTMLDivElement} ref - ref
   * @returns {void}
   * @private
   */
  _setRef = (ref: HTMLDivElement | null) => {
    if (ref) {
      this._ref = ref;
      this.setState(prevState => ({render: !prevState.render}));
    }
  };

  /**
   * render component
   *
   * @returns {React$Element} - component element
   */
  render(): React$Element<any> {
    const {guiStyles, children} = this.props;
    // first container contain the elements in gui area.
    // second child will contain only the bars and interactive area.
    const childArray = toChildArray(children);
    return (
      <div ref={this._setRef} style={guiStyles} className={[style.guiArea, style.flexContainer].join(' ')}>
        <div style={{pointerEvents: 'auto'}}>
          <PlayerArea name={'GuiArea'}>{childArray[0]}</PlayerArea>
        </div>
        {typeof childArray[1] === 'function' ? childArray[1]({containerRef: this._ref}) : childArray[1]}
      </div>
    );
  }
}

export {GuiArea};
