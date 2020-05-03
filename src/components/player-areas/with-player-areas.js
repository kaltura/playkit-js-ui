// @flow
import {Component, h} from 'preact';
import {connect} from 'react-redux';
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
function createCalculateSidePanelStyles(options) {
  return position => {
    if (!options.allowSidePanels || !validateCommonOptions(options) || ['TOP', 'BOTTOM', 'RIGHT', 'LEFT'].indexOf(position) === -1) {
      return {};
    }

    return utils.calculateSidePanelStyles({...options, position});
  };
}

/**
 * create proxy method for calculateVideoStyles
 *
 * @param {string} options options
 * @return {*} function
 */
function createCalculateVideoStyles(options) {
  return () => {
    if (!options.allowSidePanels || !validateCommonOptions(options)) {
      return {};
    }

    return utils.calculateVideoStyles(options);
  };
}

/**
 * create proxy method for calculateInteractiveAreaStyles
 *
 * @param {string} options options
 * @return {*} function
 */
function createCalculatePresetContainerStyles(options) {
  return () => {
    if (!options.allowSidePanels || !validateCommonOptions(options)) {
      return {};
    }

    const result = utils.calculatePresetContainerStyles(options);

    return result;
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

/**
 * connect decorator
 * @returns {function(*): *} connect
 */
const withPlayerAreas = InnerComponent => {
  @connect(mapStateToProps)
  /**
   * store hoc withPlayerAreas
   */
  class SidePanelWrapper extends Component {
    /**
     * create side panels store
     * @private
     * @param {*} propsSnapshot propsSnapshot
     * @return {void}
     */
    createPlayerAreasService(propsSnapshot) {
      const options = {
        sidePanelsModes: propsSnapshot.sidePanelsModes,
        sidePanelsSizes: propsSnapshot.sidePanelsSizes,
        playerClientRect: propsSnapshot.playerClientRect,
        allowSidePanels: propsSnapshot.allowSidePanels
      };

      return {
        calculatePresetContainerStyles: createCalculatePresetContainerStyles(options),
        calculateVideoStyles: createCalculateVideoStyles(options),
        calculateSidePanelStyles: createCalculateSidePanelStyles(options)
      };
    }

    componentDidMount(): void {
      this.setState({
        PlayerAreasService: this.createPlayerAreasService(this.props)
      });
    }

    /**
     * component did update
     * @param {*} prevProps prevProps
     * @return {void}
     */
    componentDidUpdate(prevProps): void {
      const {sidePanelsModes, allowSidePanels, playerClientRect} = this.props;
      const {sidePanelsModes: prevSidePanelsModes, allowSidePanels: prevAllowSidePanels, playerClientRect: prevplayerClientRect} = prevProps;
      if (sidePanelsModes === prevSidePanelsModes && allowSidePanels === prevAllowSidePanels && playerClientRect === prevplayerClientRect) {
        return;
      }

      this.setState({
        PlayerAreasService: this.createPlayerAreasService(this.props)
      });
    }

    /**
     * render
     * @returns {*} component
     */
    render() {
      const {PlayerAreasService} = this.state;

      if (!PlayerAreasService) {
        return null;
      }
      // eslint-disable-next-line no-unused-vars
      const {playerClientRect, sidePanelsModes, allowSidePanels, ...restProps} = this.props;
      return <InnerComponent {...restProps} PlayerAreasService={PlayerAreasService} />;
    }
  };
  return SidePanelWrapper;
};

export {withPlayerAreas};
