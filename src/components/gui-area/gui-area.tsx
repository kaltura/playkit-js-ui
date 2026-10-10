import {h, Component, toChildArray, VNode} from 'preact';
import {connect} from 'react-redux';
import {PlayerArea} from '../../components/player-area';
import style from '../../styles/style.scss';
import {attachFocusOrder} from '../../utils/focus-order';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  guiStyles: state.shell.layoutStyles.gui,
  customFocusOrder: state.config.customFocusOrder
});

/**
 * GuiArea component
 *
 * @class GuiArea
 * @extends {Component}
 */
@connect(mapStateToProps)
class GuiArea extends Component<any, any> {
  _ref!: HTMLDivElement;
  private _detachFocusOrder?: () => void;

  // eslint-disable-next-line require-jsdoc
  public componentDidMount(): void {
    this._syncFocusOrder();
  }

  // eslint-disable-next-line require-jsdoc
  public componentDidUpdate(): void {
    this._syncFocusOrder();
  }

  // eslint-disable-next-line require-jsdoc
  public componentWillUnmount(): void {
    this._detachFocusOrder?.();
    this._detachFocusOrder = undefined;
  }

  // eslint-disable-next-line require-jsdoc
  private _syncFocusOrder(): void {
    if (this.props.customFocusOrder && this._ref && !this._detachFocusOrder) {
      this._detachFocusOrder = attachFocusOrder(this._ref);
    } else if (!this.props.customFocusOrder && this._detachFocusOrder) {
      this._detachFocusOrder();
      this._detachFocusOrder = undefined;
    }
  }

  /**
   * this component should not render itself when player object changes.
   * @param {Object} nextProps - next props of the component
   * @param {Object} nextState - next state of the component
   *
   * @returns {void}
   */
  shouldComponentUpdate(nextProps: any, nextState: any): boolean {
    return (
      nextProps.guiStyles !== this.props.guiStyles ||
      nextProps.customFocusOrder !== this.props.customFocusOrder ||
      nextState.render !== this.state.render
    );
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
  render(): VNode<any> {
    const {guiStyles, children} = this.props;
    // first container contain the elements of gui area.
    // second child will contain only the bars and interactive area and use flex positioning from gui area
    const childArray = toChildArray(children);
    const guiElements = childArray[0];
    const barsAndInteractive = childArray[1];
    return (
      <div ref={this._setRef} style={guiStyles} className={style.guiArea}>
        <div style={{pointerEvents: 'auto'}}>
          <PlayerArea name={'GuiArea'}>{guiElements}</PlayerArea>
        </div>
        {/*@ts-expect-error - This expression is not callable. Type 'never' has no call signatures.*/}
        {typeof barsAndInteractive === 'function' ? barsAndInteractive({containerRef: this._ref}) : barsAndInteractive}
      </div>
    );
  }
}

export {GuiArea};
