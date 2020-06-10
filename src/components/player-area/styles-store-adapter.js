// @flow
import {Component} from 'preact';
import {connect} from 'react-redux';
import {actions, SidePanelPositions} from '../../reducers/shell';
import {bindActions} from '../../utils/bind-actions';
import * as utils from './player-areas-utils';

/**
 * create proxy method for calculateSidePanelStyles
 *
 * @param {string} options options
 * @return {*} function
 */
function calculateSidePanelStyles(options) {
  if (!options.allowSidePanels) {
    return {
      [SidePanelPositions.TOP]: {},
      [SidePanelPositions.BOTTOM]: {},
      [SidePanelPositions.RIGHT]: {},
      [SidePanelPositions.LEFT]: {}
    };
  }

  return {
    [SidePanelPositions.TOP]: utils.calculateSidePanelStyles({...options, position: 'TOP'}),
    [SidePanelPositions.BOTTOM]: utils.calculateSidePanelStyles({...options, position: 'BOTTOM'}),
    [SidePanelPositions.RIGHT]: utils.calculateSidePanelStyles({...options, position: 'RIGHT'}),
    [SidePanelPositions.LEFT]: utils.calculateSidePanelStyles({...options, position: 'LEFT'})
  };
}

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  sidePanelsModes: state.shell.sidePanelsModes,
  sidePanelsSizes: state.shell.sidePanelsSizes,
  allowSidePanels: state.shell.presetSettings.allowSidePanels,
  playerClientRect: state.shell.playerClientRect
});

@connect(
  mapStateToProps,
  bindActions(actions)
)
/**
 * StylesStoreAdapter
 */
class StylesStoreAdapter extends Component {
  /**
   * should component update handler
   *
   * @param {Object} nextProps - the props that will replace the current props
   * @returns {boolean} shouldComponentUpdate
   */
  shouldComponentUpdate(nextProps: Object): boolean {
    const {sidePanelsModes, sidePanelsSizes, allowSidePanels, playerClientRect} = this.props;
    const {
      sidePanelsModes: prevSidePanelsModes,
      sidePanelsSizes: prevSidePanelsSizes,
      allowSidePanels: prevAllowSidePanels,
      playerClientRect: prevPlayerClientRect
    } = nextProps;
    return !(
      sidePanelsModes === prevSidePanelsModes &&
      sidePanelsSizes === prevSidePanelsSizes &&
      allowSidePanels === prevAllowSidePanels &&
      playerClientRect === prevPlayerClientRect
    );
  }

  /**
   * component did update
   * @return {void}
   */
  componentDidUpdate(): void {
    const options = {
      sidePanelsModes: this.props.sidePanelsModes,
      sidePanelsSizes: this.props.sidePanelsSizes,
      playerClientRect: this.props.playerClientRect,
      allowSidePanels: this.props.allowSidePanels
    };

    const {style: guiStyle, rect: guiRect} = utils.calculateGuiContainerStyles(options);
    this.props.updateLayoutStyles({
      gui: guiStyle,
      video: utils.calculateVideoContainerStyles(options),
      sidePanels: calculateSidePanelStyles(options)
    });
    this.props.updateGuiClientRect(guiRect);
  }

  /**
   * render
   * @returns {*} component
   */
  render() {
    return null;
  }
}

export {StylesStoreAdapter};
