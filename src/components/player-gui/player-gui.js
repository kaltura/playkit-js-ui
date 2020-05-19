//@flow
import {h, Fragment, Component} from 'preact';
import {connect} from 'react-redux';
import {ActivePreset} from '../active-preset';
import {PlayerArea} from '../player-area';
import {SidePanelPositions} from '../../reducers/shell';
import {SidePanel} from '../side-panel';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  allowSidePanels: state.shell.presetSettings.allowSidePanels,
  allowPlayerArea: state.shell.presetSettings.allowPlayerArea
});

@connect(mapStateToProps)
/**
 * Player GUI component
 *
 * @class PlayerGUI
 * @extends {Component}
 */
class PlayerGUI extends Component {
  /**
   * render component based on the matched UI.
   * if no matched UI found, it will choose the first UI configured in the UI array
   *
   * @returns {React$Element} - component element
   * @memberof PlayerGUI
   */
  render(): React$Element<any> | void {
    const {uis, allowSidePanels, allowPlayerArea} = this.props;
    return (
      <Fragment>
        <ActivePreset uis={uis} />
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
