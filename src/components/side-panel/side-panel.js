//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {PlayerArea} from '../player-area';
import {SidePanelPositions} from '../../reducers/shell';
import {connect} from 'react-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  sidePanelsStyles: state.shell.layoutStyles.sidePanels,
  playerClientRect: state.shell.playerClientRect
});

@connect(mapStateToProps)

/**
 * SidePanel component
 *
 * @class SidePanel
 * @example <SidePanel>...</SidePanel>
 * @extends {Component}
 */
class SidePanel extends Component {
  /**
   * this component should not render itself when player object changes.
   *
   * @param {Object} nextProps - next props of the component
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate(nextProps: Object): boolean {
    const {sidePanelsStyles, position} = this.props;
    const {sidePanelsStyles: nextSidePanelsStyles, position: nextPosition} = nextProps;
    const currentStyle = sidePanelsStyles[position];
    const nextStyle = nextSidePanelsStyles[nextPosition];
    return currentStyle !== nextStyle;
  }

  /**
   * render component
   *
   * @param {object} props - the component props
   * @returns {React$Element} - component element
   * @memberof SidePanel
   */
  render(props: any): React$Element<any> {
    const {position, sidePanelsStyles} = props;

    const isVertical = [SidePanelPositions.RIGHT, SidePanelPositions.LEFT].indexOf(position) !== -1;
    const stylePrefix = isVertical ? 'verticalSidePanel' : 'horizontalSidePanel';
    const styleClass = [style.sidePanel, style[stylePrefix]];

    const areaName = `SidePanel${position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()}`;

    const sidePanelStyles = sidePanelsStyles[position];

    return (
      <div style={sidePanelStyles} className={styleClass.join(' ')}>
        <div className={style.sidePanelContent}>
          <PlayerArea name={areaName} />
        </div>
      </div>
    );
  }
}

export {SidePanel};
