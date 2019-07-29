//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {connect} from 'preact-redux';
import * as sidePanelUtils from '../../utils/side-panels';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isPlaybackEnded: state.engine.isPlaybackEnded,
  sidePanels: state.shell.sidePanels,
  sidePanelsAllowed: state.shell.sidePanelsAllowed,
  playerClientRect: state.shell.playerClientRect
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
    const styleClass = [style.bottomBar];

    if (props.isCasting && props.isPlaybackEnded) {
      styleClass.push(style.hide);
    }

    const elementStyle = props.sidePanelsAllowed
      ? sidePanelUtils.calculatePresetChildStyles({
          maxSidePanelWidth: 480,
          minSidePanelWidth: 240,
          sidePanels: props.sidePanels,
          playerClientRect: props.playerClientRect,
          anchor: 'BOTTOM'
        })
      : {};

    return (
      <div
        style={elementStyle}
        className={styleClass.join(' ')}
        onMouseOver={() => this.props.updateBottomBarHoverActive(true)}
        onMouseLeave={() => this.props.updateBottomBarHoverActive(false)}>
        {props.children}
      </div>
    );
  }
}

export {BottomBar};
