// @flow
import {Component} from 'preact';
import {connect} from 'react-redux';
import {actions, SidePanelPositions} from '../../reducers/shell';
import {bindActions} from '../../utils/bind-actions';
import * as utils from './player-areas-utils';

/**
 * validate common options
 * @param {*} options options
 * @returns {boolean} valid
 */
function validateCommonOptions(options) {
  const {sidePanelsSizes, sidePanelsModes, playerClientRect} = options;
  return sidePanelsModes !== null && sidePanelsSizes !== null && playerClientRect !== null;
}

/**
 * create proxy method for calculateSidePanelStyles
 *
 * @param {string} options options
 * @return {*} function
 */
function calculateSidePanelStyles(options) {
  if (!options.allowSidePanels || !validateCommonOptions(options)) {
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
 * create proxy method for calculateVideoStyles
 *
 * @param {string} options options
 * @return {*} function
 */
function calculateVideoStyles(options) {
  if (!options.allowSidePanels || !validateCommonOptions(options)) {
    return {};
  }

  return utils.calculateVideoStyles(options);
}

/**
 * create proxy method for calculateInteractiveAreaStyles
 *
 * @param {string} options options
 * @return {*} function
 */
function calculatePresetContainerStyles(options) {
  if (!options.allowSidePanels || !validateCommonOptions(options)) {
    return {};
  }

  const result = utils.calculatePresetContainerStyles(options);

  return result;
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
    const {sidePanelsModes, allowSidePanels, playerClientRect} = this.props;
    const {sidePanelsModes: prevSidePanelsModes, allowSidePanels: prevAllowSidePanels, playerClientRect: prevplayerClientRect} = nextProps;
    return !(sidePanelsModes === prevSidePanelsModes && allowSidePanels === prevAllowSidePanels && playerClientRect === prevplayerClientRect);
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

    const {style: presetStyle, rect: presetRect} = calculatePresetContainerStyles(options);
    this.props.updateLayoutStyles(
      {
        preset: presetStyle,
        video: calculateVideoStyles(options),
        sidePanels: calculateSidePanelStyles(options)
      },
      presetRect
    );
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
