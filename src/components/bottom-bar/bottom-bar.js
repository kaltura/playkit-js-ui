//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {connect} from 'react-redux';
import {FragmentContainer} from 'components/player-area';

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

@connect(
  mapStateToProps,
  bindActions(actions)
)
/**
 * BottomBar component
 *
 * @class BottomBar
 * @example <BottomBar>...</BottomBar>
 * @extends {Component}
 */
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
    return (
      <div
        className={styleClass.join(' ')}
        onMouseOver={() => this.props.updateBottomBarHoverActive(true)}
        onMouseLeave={() => this.props.updateBottomBarHoverActive(false)}>
        <FragmentContainer name={'BottomBar'}>
          {props.children}
          <div className={style.leftControls}>
            <FragmentContainer name={'BottomBarLeftControls'}>{leftControls}</FragmentContainer>
          </div>
          <div className={style.rightControls}>
            <FragmentContainer name={'BottomBarRightControls'}>{rightControls}</FragmentContainer>
          </div>
        </FragmentContainer>
      </div>
    );
  }
}

BottomBar.displayName = COMPONENT_NAME;
export {BottomBar};
