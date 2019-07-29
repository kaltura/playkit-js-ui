//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils';
import {actions, SidePanelPositions} from '../../reducers/shell';
import {VideoPlayer} from '../video-player';
import {SidePanel} from '../side-panel';
import * as sidePanelUtils from '../../utils/side-panels';
import style from '../../styles/style.scss';
import {Container} from '../container';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  state: {
    shell: state.shell,
    engine: {
      adBreak: state.engine.adBreak,
      isLive: state.engine.isLive,
      hasError: state.engine.hasError,
      isIdle: state.engine.isIdle,
      isVr: state.engine.isVr,
      playlist: state.engine.playlist
    }
  },
  config: state.config
});

@connect(
  mapStateToProps,
  bindActions(actions)
)
/**
 * Player GUI component
 *
 * @class PlayerGUI
 * @extends {Component}
 */
class PlayerGUI extends Component {
  /**
   * get the single matched UI to render based on the UIs and it's conditions
   *
   * @param {Array<any>} uis - UIs array with conditions
   * @param {Object} state - state to be used in the condition check
   * @returns {*} - matched UI
   * @memberof PlayerGUI
   */
  getMatchedUI(uis: Array<any>, state: Object): any {
    let matchedUI;
    for (let ui of uis) {
      if (typeof ui.condition === 'undefined' || ui.condition(state)) {
        matchedUI = ui;
        break;
      }
    }
    return matchedUI;
  }

  /**
   * render component based on the matched UI.
   * if no matched UI found, it will choose the first UI configured in the UI array
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlayerGUI
   */
  render(props: any): React$Element<any> | void {
    let uiToRender;
    const {activePresetName} = this.props.state.shell;
    if (this.props.uis.length > 0) {
      uiToRender = this.getMatchedUI(props.uis, props.state);
      const template = uiToRender ? uiToRender.template : this.props.uis[this.props.uis.length - 1].template;
      const uiComponent = h(template, props);
      const presetName = uiComponent ? uiComponent.nodeName.displayName : '';

      if (props.state.shell.activePresetName !== presetName) {
        props.updateActivePresetName(presetName);
        const sidePanelAllowed = typeof uiComponent.nodeName.sidePanelsAllowed !== 'boolean' || uiComponent.nodeName.sidePanelsAllowed;
        props.updateSidePanelsAllowed(sidePanelAllowed);
      }

      const presetStyle = props.state.shell.sidePanelsAllowed
        ? sidePanelUtils.calculateMainAreaStyles({
            maxSidePanelWidth: 480,
            minSidePanelWidth: 240,
            sidePanels: props.state.shell.sidePanels,
            playerClientRect: props.state.shell.playerClientRect
          })
        : {};

      return (
        <div className={style.playerGuiContent}>
          <VideoPlayer player={props.player} />
          <div data-kp-preset={presetName} className={style.presetContent} style={presetStyle}>
            {uiComponent}
          </div>
          <SidePanel position={SidePanelPositions.RIGHT} player={props.player} />
          <SidePanel position={SidePanelPositions.LEFT} player={props.player} />
          <SidePanel position={SidePanelPositions.TOP} player={props.player} />
          <SidePanel position={SidePanelPositions.BOTTOM} player={props.player} />
          <Container key={activePresetName} player={props.player} name={'player-overlay'} targetPresetName={activePresetName} />
        </div>
      );
    } else {
      return undefined;
    }
  }
}

export {PlayerGUI};
