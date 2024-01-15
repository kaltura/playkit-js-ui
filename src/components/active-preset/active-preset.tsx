//@flow
import {Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/shell';
import getLogger from '../../utils/logger';
import {withEventDispatcher} from '../event-dispatcher';
import {UIPreset} from '../../types';

type ActivePresetPropsProps = {
  playerContainer: HTMLDivElement;
  uis: UIPreset[];
  state?: {
    shell: any;
    engine: {
      adBreak: boolean;
      isLive: boolean;
      hasError: boolean;
      isIdle: boolean;
      isVr: boolean;
      isImg: boolean;
      isDoc: boolean;
      playlist: any;
    };
  };
  config?: any;
};

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
      isImg: state.engine.isImg,
      isDoc: state.engine.isDoc,
      playlist: state.engine.playlist
    }
  },
  config: state.config
});

const COMPONENT_NAME = 'ActivePreset';

/**
 * Active preset
 *
 * @class ActivePreset
 * @extends {Component}
 */
@withEventDispatcher(COMPONENT_NAME)
@connect(mapStateToProps, bindActions(actions))
class ActivePreset extends Component<ActivePresetPropsProps, any> {
  static logger: any;

  /**
   * Creates an instance of ActivePreset.
   * @memberof ActivePreset
   */
  constructor() {
    super();
    ActivePreset.logger = getLogger('ActivePreset');
  }
  /**
   * get the single matched UI to render based on the UIs and it's conditions
   *
   * @param {Array<any>} uis - UIs array with conditions
   * @param {Object} state - state to be used in the condition check
   * @returns {*} - matched UI
   * @memberof ActivePreset
   */
  getMatchedUI(uis: Array<any>, state: any): any {
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
   * @memberof ActivePreset
   */
  render(props: any): VNode<any> | undefined {
    let uiToRender;
    const {uis, state} = this.props;
    const {activePresetName} = state!.shell;
    if (uis.length > 0) {
      uiToRender = this.getMatchedUI(uis, props.state);
      const uiComponent = uiToRender ? uiToRender.template(props) : uis[uis.length - 1].template(props);
      const presetName = uiComponent ? uiComponent.type.displayName || '' : '';

      if (activePresetName !== presetName) {
        props.notifyChange({from: activePresetName, to: presetName});
        props.updateActivePresetName(presetName);
        props.updatePresetSettings(null);
        ActivePreset.logger.debug(`update active preset to '${activePresetName}' and reset preset settings`);
      }
      return uiComponent;
    } else {
      return undefined;
    }
  }
}

export {ActivePreset};
