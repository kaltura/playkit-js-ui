//@flow
import {h, Component} from 'preact';
import {withPlayer} from 'components/player';
import style from '../../styles/style.scss';
import {PlayerArea} from 'components/player-area';
import {connect} from 'react-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  guiClientRect: state.shell.guiClientRect,
  topBarSize: state.topBar.topBarSize,
  bottomBarSize: state.bottomBar.bottomBarSize
});

/**
 * InteractiveArea component
 *
 * @class InteractiveArea
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
class InteractiveArea extends Component {
  /**
   * this component should not render itself when player object changes.
   * @param {Object} nextProps - next props of the component
   * @returns {boolean} - should rerender state
   * */
  shouldComponentUpdate(nextProps: Object): boolean {
    const {guiClientRect, topBarSize, bottomBarSize} = this.props;
    const {nextPropsGuiStyles, nextPropsTopBarSize, nextPropsBottomBarSize} = nextProps;
    return guiClientRect !== nextPropsGuiStyles || topBarSize !== nextPropsTopBarSize || bottomBarSize !== nextPropsBottomBarSize;
  }

  /**
   * calculate the interactive container size
   * @returns {void}
   */
  _calcSize(): void {
    const {guiClientRect, topBarSize, bottomBarSize} = this.props;
    let top = 0;
    let {height} = guiClientRect;
    if (topBarSize) {
      top += topBarSize;
      height -= topBarSize;
    }
    if (bottomBarSize) {
      height -= bottomBarSize;
    }
    return {top, height};
  }

  /**
   * @returns {void}
   */
  render() {
    const {children} = this.props;
    return (
      <div className={style.interactiveArea} style={this._calcSize()}>
        <div style={{pointerEvents: 'auto'}}>
          <PlayerArea name={'InteractiveArea'}>{children}</PlayerArea>
        </div>
      </div>
    );
  }
}

export {InteractiveArea};
