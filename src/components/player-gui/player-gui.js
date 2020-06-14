//@flow
import {h, Fragment, Component} from 'preact';
import {connect} from 'react-redux';
import {ActivePreset} from '../active-preset';
import {PlayerArea} from '../player-area';
import {actions, SidePanelOrientation, SidePanelPositions} from '../../reducers/shell';
import {SidePanel} from '../side-panel';
import {bindActions} from '../../utils/bind-actions';
import isEqual from '../../utils/is-equal';

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
   * should component update handler
   *
   * @returns {boolean} - always update component
   * @param {Object} nextProps - next props of the component
   * @memberof OverlayAction
   */
  shouldComponentUpdate(nextProps: Object): boolean {
    return (
      !isEqual(this.props.sidePanelsConfig, nextProps.sidePanelsConfig) ||
      this.props.allowSidePanels !== nextProps.allowSidePanels ||
      this.props.allowPlayerArea !== nextProps.allowPlayerArea
    );
  }

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
  render(): React$Element<any> | void {
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
        ) : (
          undefined
        )}
        {allowPlayerArea ? <PlayerArea name={'PlayerArea'} /> : undefined}
      </Fragment>
    );
  }
}

export {PlayerGUI};
