//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {SidePanelModes} from '../../reducers/shell';

const COMPONENT_NAME = 'top-bar';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isCasting: state.engine.isCasting,
  isPlaybackEnded: state.engine.isPlaybackEnded,
  sidePanelMode: state.shell.sidePanelMode
});

@connect(mapStateToProps)

/**
 * TopBar component
 *
 * @class TopBar
 * @example <TopBar>...</TopBar>
 * @extends {Component}
 */
class TopBar extends Component {
  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof TopBar
   */
  render(props: any): ?React$Element<any> {
    const styleClass = [style.topBar];
    if ([SidePanelModes.PARTIAL, SidePanelModes.EXPANDED].includes(props.sidePanelMode)) {
      styleClass.push(style.sidePanelMode);
    }
    if (props.isCasting && props.isPlaybackEnded) {
      styleClass.push(style.hide);
    }
    return (
      <div data-kp-component={COMPONENT_NAME} className={styleClass.join(' ')}>
        {props.children}
      </div>
    );
  }
}

//Object.defineProperty(TopBar, 'name', {value: 'TopBar'});

TopBar.displayName = COMPONENT_NAME;
export {TopBar};
