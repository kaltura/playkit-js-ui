import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {PlayerArea} from '../../components/player-area';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isPlaybackEnded: state.engine.isPlaybackEnded
});

const COMPONENT_NAME = 'TopBar';

/**
 * TopBar component
 *
 * @class TopBar
 * @example <TopBar>...</TopBar>
 * @extends {Component}
 */
@connect(mapStateToProps)
class TopBar extends Component<any, any> {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof TopBar
   */
  render(props: any): VNode<any> {
    const {disabled, isPlaybackEnded, isCasting, leftControls, rightControls} = props;

    const styleClass = [style.topBar];

    if (disabled) {
      styleClass.push(style.disabled);
    }
    if (isCasting && isPlaybackEnded) {
      styleClass.push(style.hide);
    }
    return (
      <div className={styleClass.join(' ')}>
        <div className={style.topBarArea}>
          <PlayerArea name={'TopBar'} />
        </div>
        {props.children}
        <div className={style.leftControls}>
          <PlayerArea name={'TopBarLeftControls'}>{leftControls}</PlayerArea>
        </div>
        <div className={style.rightControls}>
          <PlayerArea name={'TopBarRightControls'}>{rightControls}</PlayerArea>
        </div>
      </div>
    );
  }
}

TopBar.displayName = COMPONENT_NAME;
export {TopBar};
