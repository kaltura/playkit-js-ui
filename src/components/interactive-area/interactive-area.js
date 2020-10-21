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
  topBarHeight: state.topBar.topBarHeight,
  bottomBarHeight: state.bottomBar.bottomBarHeight
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
   * calculate the interactive container size
   * @returns {Object} - top and height calculated values
   */
  _calcSize(): Object {
    const {guiClientRect, topBarHeight, bottomBarHeight} = this.props;
    let top = 0;
    let {height} = guiClientRect;
    if (topBarHeight) {
      top += topBarHeight;
      height -= topBarHeight;
    }
    if (bottomBarHeight) {
      height -= bottomBarHeight;
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
