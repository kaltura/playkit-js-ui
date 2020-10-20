//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {PlayerArea} from 'components/player-area';
import {bindActions} from 'utils/bind-actions';
import {actions} from 'reducers/top-bar';

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

const COMPONENT_NAME = 'TopBar';

/**
 * TopBar component
 *
 * @class TopBar
 * @example <TopBar>...</TopBar>
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
class TopBar extends Component {
  _ref: ?HTMLDivElement;

  /**
   * this component should not render itself when player object changes.
   * @param {Object} nextProps - next props of the component
   * @returns {boolean} - should rerender state
   */
  shouldComponentUpdate(nextProps: Object): boolean {
    if (this.props.playerHover !== nextProps.playerHover) {
      this._updateTopBarSize(nextProps.playerHover);
      return false;
    }
    return true;
  }

  /**
   * update the top bar size
   * @param {boolean} topBarVisible - if top bar visible on ui or not
   * @returns {void}
   */
  _updateTopBarSize(topBarVisible: boolean): void {
    if (this._ref && topBarVisible) {
      const boundingRect = this._ref.getBoundingClientRect();
      this.props.updateTopBarSize(boundingRect.height);
    } else {
      this.props.updateTopBarSize(0);
    }
  }
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof TopBar
   */
  render(props: any): ?React$Element<any> {
    const {disabled, isPlaybackEnded, isCasting, leftControls, rightControls} = props;

    const styleClass = [style.topBar];

    if (disabled) {
      styleClass.push(style.disabled);
    }
    if (isCasting && isPlaybackEnded) {
      styleClass.push(style.hide);
    }
    return (
      <div
        className={styleClass.join(' ')}
        ref={el => {
          this._ref = el;
        }}>
        <PlayerArea name={'TopBar'}>
          {props.children}
          <div className={style.leftControls}>
            <PlayerArea name={'TopBarLeftControls'}>{leftControls}</PlayerArea>
          </div>
          <div className={style.rightControls}>
            <PlayerArea name={'TopBarRightControls'}>{rightControls}</PlayerArea>
          </div>
        </PlayerArea>
      </div>
    );
  }
}

TopBar.displayName = COMPONENT_NAME;
export {TopBar};
