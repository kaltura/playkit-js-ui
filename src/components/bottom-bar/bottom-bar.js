//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {bindActions} from '../../utils/bind-actions';
import {actions as shellActions} from '../../reducers/shell';
import {actions as bottomBarActions} from '../../reducers/bottom-bar';
import {connect} from 'react-redux';
import {PlayerArea} from 'components/player-area';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isPlaybackEnded: state.engine.isPlaybackEnded,
  playerHover: state.shell.playerHover
});

const COMPONENT_NAME = 'BottomBar';

/**
 * BottomBar component
 *
 * @class BottomBar
 * @example <BottomBar>...</BottomBar>
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...shellActions, ...bottomBarActions}))
class BottomBar extends Component {
  _ref: ?HTMLDivElement;

  /**
   * this component should not render itself when player object changes.
   * @param {Object} nextProps - next props of the component
   * @param {Object} nextState - next state of the component
   *
   * @returns {boolean}
   */
  shouldComponentUpdate(nextProps: Object, nextState: Object): boolean {
    if (this.props.playerHover !== nextProps.playerHover) {
      this._updateBottomBarSize(nextProps.playerHover);
      return false;
    }
    return true;
  }

  _updateBottomBarSize(bottomBarExist: boolean): void {
    if (this._ref && bottomBarExist) {
      const boundingRect = this._ref.getBoundingClientRect();
      this.props.updateBottomBarSize(boundingRect.height);
    } else {
      this.props.updateBottomBarSize(0);
    }
  }
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof BottomBar
   */
  render(props: any): ?React$Element<any> {
    const {leftControls, rightControls} = props;

    const styleClass = [style.bottomBar];
    if (props.isCasting && props.isPlaybackEnded) {
      styleClass.push(style.hide);
    }
    return (
      <div
        className={styleClass.join(' ')}
        ref={el => {
          this._ref = el;
        }}>
        <PlayerArea name={'BottomBar'}>
          {props.children}
          <div className={style.leftControls}>
            <PlayerArea name={'BottomBarLeftControls'}>{leftControls}</PlayerArea>
          </div>
          <div className={style.rightControls}>
            <PlayerArea name={'BottomBarRightControls'}>{rightControls}</PlayerArea>
          </div>
        </PlayerArea>
      </div>
    );
  }
}

BottomBar.displayName = COMPONENT_NAME;
export {BottomBar};
