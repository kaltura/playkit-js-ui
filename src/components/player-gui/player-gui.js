//@flow
import {h, Fragment, Component} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/shell';
import {withPlayerAreas} from '../player-areas';
import {ActivePreset} from '../active-preset';
import {PlayerArea} from '../player-area';
import style from '../../styles/style.scss';
import {SidePanelPositions} from '../../reducers/shell';
import {SidePanel} from '../side-panel';
/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  presetClientRect: state.shell.presetClientRect
});

@withPlayerAreas
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
    const {PlayerAreasService, uis} = this.props;

    const {width: currentWidth, height: currentHeight} = this.props.presetClientRect;
    const presetContainerStyles = PlayerAreasService.calculatePresetContainerStyles();

    if (currentWidth !== presetContainerStyles.width || currentHeight !== presetContainerStyles.height) {
      const newPresetSize = {width: presetContainerStyles.width, height: presetContainerStyles.height};
      this.props.updatePresetClientRect(newPresetSize);
    }

    return (
      <Fragment>
        <div style={presetContainerStyles.style} className={style.activePresetContainer}>
          <div className={style.activePresetContent} >
            <ActivePreset uis={uis} />
          </div>
        </div>
        <SidePanel position={SidePanelPositions.RIGHT} />
        <SidePanel position={SidePanelPositions.LEFT} />
        <SidePanel position={SidePanelPositions.TOP} />
        <SidePanel position={SidePanelPositions.BOTTOM} />
        <PlayerArea name={'PlayerArea'} />
      </Fragment>
    );
  }
}

export {PlayerGUI};
