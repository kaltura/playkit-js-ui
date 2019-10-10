//@flow
import {h, Component} from 'preact';
import {SidePanelPositions} from '../../reducers/shell';
import {SidePanel} from '../side-panel';
import style from '../../styles/style.scss';


/**
 * Side panels container
 *
 * @class SidePanelsContainer
 * @extends {Component}
 */
class SidePanelsContainer extends Component {
  render() {
    const {children, before, after} = this.props;

    return (
      <div>
        {before}
        {children}
        <SidePanel position={SidePanelPositions.RIGHT} />
        <SidePanel position={SidePanelPositions.LEFT} />
        <SidePanel position={SidePanelPositions.TOP} />
        <SidePanel position={SidePanelPositions.BOTTOM} />
        {after}
      </div>
    );
  }
}

export {SidePanelsContainer};
