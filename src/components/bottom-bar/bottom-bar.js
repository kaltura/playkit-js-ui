//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {connect} from 'react-redux';
import {PlayerArea} from 'components/player-area';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isPlaybackEnded: state.engine.isPlaybackEnded
});

const COMPONENT_NAME = 'BottomBar';

/**
 * BottomBar component
 *
 * @class BottomBar
 * @example <BottomBar>...</BottomBar>
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
class BottomBar extends Component {
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
    if (leftControls || rightControls || props.children) {
      styleClass.push(style.notEmpty);
    }
    return (
      <div className={styleClass.join(' ')}>
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
