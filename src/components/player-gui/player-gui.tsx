import {h, Fragment, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {ActivePreset} from '../active-preset';
import {PlayerArea} from '../player-area';
import {actions, SidePanelOrientation, SidePanelPositions} from '../../reducers/shell';
import {SidePanel} from '../side-panel';
import {bindActions} from '../../utils';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  allowSidePanels: state.shell.presetSettings.allowSidePanels,
  allowPlayerArea: state.shell.presetSettings.allowPlayerArea,
  sidePanelsConfig: state.config.components.sidePanels
});

/**
 * Player GUI component
 *
 * @class PlayerGUI
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
class PlayerGUI extends Component<any, any> {
  /**
   * component did update
   * @return {void}
   */
  componentDidUpdate(): void {
    const {verticalSizes, horizontalSizes} = this.props.sidePanelsConfig;
    if (verticalSizes) {
      this.props.updateSidePanelSize(SidePanelOrientation.VERTICAL, verticalSizes);
    }

    if (horizontalSizes) {
      this.props.updateSidePanelSize(SidePanelOrientation.HORIZONTAL, horizontalSizes);
    }
  }

  /**
   * render component based on the matched UI.
   * if no matched UI found, it will choose the first UI configured in the UI array
   *
   * @returns {React$Element} - component element
   * @memberof PlayerGUI
   */
  render(): VNode<any> | undefined {
    const {uis, playerContainer, allowSidePanels, allowPlayerArea} = this.props;
    return (
      <Fragment>
        <ActivePreset uis={uis} playerContainer={playerContainer} />
        {allowSidePanels ? (
          <Fragment>
            <SidePanel position={SidePanelPositions.RIGHT} />
            <SidePanel position={SidePanelPositions.LEFT} />
            <SidePanel position={SidePanelPositions.TOP} />
            <SidePanel position={SidePanelPositions.BOTTOM} />
          </Fragment>
        ) : undefined}
        {allowPlayerArea ? <PlayerArea name={'PlayerArea'} /> : undefined}
      </Fragment>
    );
  }
}

export {PlayerGUI};
