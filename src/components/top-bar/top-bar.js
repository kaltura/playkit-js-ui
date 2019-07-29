//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import * as sidePanelUtils from '../../utils/side-panels';
const COMPONENT_NAME = 'top-bar';

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

    if (props.disabled) {
      styleClass.push(style.disabled);
    }
    if (props.isCasting && props.isPlaybackEnded) {
      styleClass.push(style.hide);
    }

    const elementStyle = props.sidePanelsAllowed
      ? sidePanelUtils.calculatePresetChildStyles({
          maxSidePanelWidth: 480,
          minSidePanelWidth: 240,
          sidePanels: props.sidePanels,
          playerClientRect: props.playerClientRect,
          anchor: 'TOP'
        })
      : {};

    return (
      <div style={elementStyle} className={styleClass.join(' ')}>
        {props.children}
      </div>
    );
  }
}

//Object.defineProperty(TopBar, 'name', {value: 'TopBar'});

TopBar.displayName = COMPONENT_NAME;
export {TopBar};
