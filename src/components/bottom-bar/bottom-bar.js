//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {connect} from 'preact-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isPlaybackEnded: state.engine.isPlaybackEnded
});

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
    if (props.isCasting && props.isPlaybackEnded) {
      return undefined;
    }
    return (
      <div
        className={style.bottomBar}
        onMouseOver={() => this.props.updateBottomBarHoverActive(true)}
        onMouseLeave={() => this.props.updateBottomBarHoverActive(false)}>
        {props.children}
      </div>
    );
  }
}

export {BottomBar};
