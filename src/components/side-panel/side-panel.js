//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {PlayerArea} from '../player-area';
import {bindActions} from '../../utils/bind-actions';
import {actions, SidePanelModes, SidePanelOrientation, SidePanelPositions} from '../../reducers/shell';
import {connect} from 'react-redux';
import isEqual from '../../utils/is-equal';
import {withLogger} from 'components/logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  sidePanelsStyles: state.shell.layoutStyles.sidePanels,
  sidePanelsConfig: state.config.components.sidePanels,
  playerClientRect: state.shell.playerClientRect
});

const COMPONENT_NAME = 'SidePanel';

@connect(
  mapStateToProps,
  bindActions(actions)
)
@withLogger(COMPONENT_NAME)

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
    const currentStyle = this.props.sidePanelsStyles[this.props.position];
    const nextStyle = nextProps.sidePanelsStyles[nextProps.position];
    return !(isEqual(currentStyle, nextStyle) && isEqual(this.props.sidePanelsConfig, nextProps.sidePanelsConfig));
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
   * Make sure the side panel is fit the player dimensions
   * @returns {void}
   */
  _validateSidePanelSize() {
    const {position, sidePanelsStyles, playerClientRect, logger} = this.props;
    const sidePanelStyles = sidePanelsStyles[position];
    if (sidePanelStyles.width > playerClientRect.width || sidePanelStyles.height > playerClientRect.height) {
      this.props.updateSidePanelMode(position, SidePanelModes.HIDDEN);
      logger.warn(`There is no room to open the side panel`);
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
    this._validateSidePanelSize();

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
