//@flow
import {h, Fragment, Component} from 'preact';
import {ActivePreset} from '../active-preset';
import {PlayerArea} from '../player-area';
import {SidePanelPositions} from '../../reducers/shell';
import {SidePanel} from '../side-panel';

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
    const {uis} = this.props;
    return (
      <Fragment>
        <ActivePreset uis={uis} />
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
