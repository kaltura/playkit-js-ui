//@flow
import {Component, h} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/shell';
import getLogger from '../../utils/logger';
import {withEventDispatcher} from 'components/event-dispatcher';
import style from '../../styles/style.scss';
import {withPlayerAreas} from 'components/player-areas';

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

const logger = getLogger('ActivePreset');
const COMPONENT_NAME = 'ActivePreset';

@withEventDispatcher(COMPONENT_NAME)
@withPlayerAreas
@connect(
  mapStateToProps,
  bindActions(actions)
)
/**
 * Active preset
 *
 * @class ActivePreset
 * @extends {Component}
 */
class ActivePreset extends Component {
  _presetContainerRef: React$Element;
  /**
   * get the single matched UI to render based on the UIs and it's conditions
   *
   * @param {Array<any>} uis - UIs array with conditions
   * @param {Object} state - state to be used in the condition check
   * @returns {*} - matched UI
   * @memberof ActivePreset
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

  onPresetRef = el => {
    this._presetContainerRef = el;
  };

  /**
   * render component based on the matched UI.
   * if no matched UI found, it will choose the first UI configured in the UI array
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof ActivePreset
   */
  render(props: any): React$Element<any> | void {
    let uiToRender;
    const {PlayerAreasService, uis, state} = this.props;
    const {activePresetName, presetClientRect} = state.shell;
    if (uis.length > 0) {
      uiToRender = this.getMatchedUI(uis, props.state);
      const uiComponent = uiToRender ? uiToRender.template(props) : uis[uis.length - 1].template(props);
      const presetName = uiComponent ? uiComponent.type.displayName || '' : '';

      if (activePresetName !== presetName) {
        props.notifyChange({from: activePresetName, to: presetName});
        props.updateActivePresetName(presetName);
        props.updatePresetSettings(null);
        logger.debug(`update active preset to '${activePresetName}' and reset preset settings`);
      }

      const {width: currentWidth, height: currentHeight} = presetClientRect;
      const presetContainerStyles = PlayerAreasService.calculatePresetContainerStyles();

      if (currentWidth !== presetContainerStyles.width || currentHeight !== presetContainerStyles.height) {
        const {width, height, top, right, bottom, left} = presetContainerStyles;
        this.props.updatePresetClientRect({width, height, top, right, bottom, left});
      }

      return h(uiComponent.type, {presetRef: this.onPresetRef, playerContainer: this._presetContainerRef, style: presetContainerStyles.style});
    } else {
      return undefined;
    }
  }
}

export {ActivePreset};
