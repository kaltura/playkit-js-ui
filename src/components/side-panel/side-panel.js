//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {PlayerArea} from '../player-area';
import {bindActions} from '../../utils/bind-actions';
import {actions, SidePanelOrientation, SidePanelPositions} from '../../reducers/shell';
import {connect} from 'react-redux';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  sidePanelsStyles: state.shell.layoutStyles.sidePanels,
  sidePanelsConfig: state.config.components.sidePanels
});

/**
 * SidePanel component
 *
 * @class SidePanel
 * @example <SidePanel>...</SidePanel>
 * @extends {Component}
 */
@connect(
  mapStateToProps,
  bindActions(actions)
)

/**
 * SidePanel
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
    return nextProps.sidePanelsStyles !== this.props.sidePanelsStyles || nextProps.sidePanelsConfig !== this.props.sidePanelsConfig;
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

    const containerName = `SidePanel${position.charAt(0).toUpperCase() + position.slice(1).toLowerCase()}`;

    const sidePanelStyles = sidePanelsStyles[props.position];

    return (
      <div style={sidePanelStyles} className={styleClass.join(' ')}>
        <div className={style.sidePanelContent}>
          <PlayerArea name={containerName} />
        </div>
      </div>
    );
  }
}

export {SidePanel};
