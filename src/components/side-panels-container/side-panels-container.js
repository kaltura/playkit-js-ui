//@flow
import {h, Component} from 'preact';
import {SidePanelPositions} from '../../reducers/shell';
import {SidePanel} from '../side-panel';

/**
 * Side panels container
 *
 * @class SidePanelsContainer
 * @extends {Component}
 */
class SidePanelsContainer extends Component {
  render() {
    const {children} = this.props;

    return (
      <div>
        {children}
        <SidePanel position={SidePanelPositions.RIGHT} />
        <SidePanel position={SidePanelPositions.LEFT} />
        <SidePanel position={SidePanelPositions.TOP} />
        <SidePanel position={SidePanelPositions.BOTTOM} />
      </div>
    );
  }
}

export {SidePanelsContainer};
