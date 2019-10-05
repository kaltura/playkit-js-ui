//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from './utils';
import {actions} from './reducers/shell';
import getLogger from './utils/logger';
import {SidePanelsContainer} from './components/side-panels-container';
import {connectToUIPresetsStore} from './components/side-panel';
import {ActivePreset} from './components/active-preset';
import {PresetVideoAreaContainer} from './components/side-panels-container';
import {Container} from './components/container';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  activePresetName: state.shell.activePresetName,
  presetClientRect: state.shell.presetClientRect
});

const logger = getLogger('ActivePreset');

@connectToUIPresetsStore
@connect(
  mapStateToProps,
  bindActions({
    updatePresetClientRect: actions.updatePresetClientRect
  })
)
/**
 * Player GUI component
 *
 * @class PlayerGUI
 * @extends {Component}
 */
class PlayerGUI extends Component {
  _presetContainerRef: React$Element;

  _setPresetContainerRef = ref => {
    this._presetContainerRef = ref;
  };
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
   * @returns {React$Element} - component element
   * @memberof PlayerGUI
   */
  render(): React$Element<any> | void {
    const {sidePanelsStore, uis, activePresetName} = this.props;

    const {width: currentWidth, height: currentHeight} = this.props.presetClientRect;
    const areaProperties = sidePanelsStore.calculateInteractiveAreaStyles();

    if (currentWidth !== areaProperties.width || currentHeight !== areaProperties.height) {
      const newPresetSize = {width: areaProperties.width, height: areaProperties.height};
      this.props.updatePresetClientRect(newPresetSize);
      logger.debug(`sakal update preset size`, newPresetSize);
    }

    // todo check if key is needed - key={activePresetName}
    return (
      <SidePanelsContainer>
        <PresetVideoAreaContainer>
          {context => <Container key={activePresetName} name={'VideoArea'} style={context.style} />}
        </PresetVideoAreaContainer>
        <div ref={this._setPresetContainerRef} style={areaProperties.style}>
          <ActivePreset uis={uis} playerContainer={this._presetContainerRef} />
        </div>
      </SidePanelsContainer>
    );
  }
}

export {PlayerGUI};
