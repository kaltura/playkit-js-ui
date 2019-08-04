// @flow
import {Component, h} from 'preact';
import {connect} from 'preact-redux';
import * as sidePanelUtils from './side-panel-utils';

/**
 * validate common options
 * @param {*} options options
 * @returns {boolean} valid
 */
function validateCommonOptions(options) {
  const {sidePanelsSizes, sidePanelsModes, playerWrapperClientRect} = options;
  return sidePanelsModes !== null && sidePanelsSizes !== null && playerWrapperClientRect !== null;
}

/**
 * create proxy method for calculateSidePanelStyles
 *
 * @param {string} options options
 * @return {*} function
 */
function createCalculateSidePanelStyles(options) {
  return position => {
    if (!options.sidePanelsAllowed || !validateCommonOptions(options) || ['TOP', 'BOTTOM', 'RIGHT', 'LEFT'].indexOf(position) === -1) {
      return {};
    }

    return sidePanelUtils.calculateSidePanelStyles({...options, position});
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
    if (!options.sidePanelsAllowed || !validateCommonOptions(options)) {
      return {};
    }

    return sidePanelUtils.calculateVideoStyles(options);
  };
}

/**
 * create proxy method for calculatePresetChildStyles
 *
 * @param {string} options options
 * @return {*} function
 */
function createCalculatePresetChildStyles(options) {
  return anchor => {
    if (!options.sidePanelsAllowed || !validateCommonOptions(options) || ['TOP', 'BOTTOM'].indexOf(anchor) === -1) {
      return {};
    }

    return sidePanelUtils.calculatePresetChildStyles({...options, anchor});
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
  sidePanelsAllowed: state.shell.sidePanelsAllowed,
  playerWrapperClientRect: state.shell.playerWrapperClientRect
});

/**
 * connect decorator
 * @returns {function(*): *} connect
 */
const connectToUIPresetsStore = () => {
  return InnerComponent => {
    const connectHOC = @connect(mapStateToProps)
    /**
     * store hoc
     */
    class extends Component {
      /**
       * constructor
       * @param {*} props props
       * @param {*} context context
       */
      constructor(props, context) {
        super(props, context);

        this.state = {
          sidePanelsStore: this.createSidePanelsStore(props)
        };
      }

      /**
       * create side panels store
       * @private
       * @param {*} propsSnapshot propsSnapshot
       * @return {void}
       */
      createSidePanelsStore(propsSnapshot) {
        const options = {
          sidePanelsModes: propsSnapshot.sidePanelsModes,
          sidePanelsSizes: propsSnapshot.sidePanelsSizes,
          playerWrapperClientRect: propsSnapshot.playerWrapperClientRect,
          sidePanelsAllowed: propsSnapshot.sidePanelsAllowed
        };

        return {
          calculatePresetChildStyles: createCalculatePresetChildStyles(options),
          calculateVideoStyles: createCalculateVideoStyles(options),
          calculateSidePanelStyles: createCalculateSidePanelStyles(options)
        };
      }

      /**
       * component did update
       * @param {*} prevProps prevProps
       * @return {void}
       */
      componentDidUpdate(prevProps): void {
        const {sidePanelsModes, sidePanelsAllowed, playerWrapperClientRect} = this.props;
        const {
          sidePanelsModes: prevSidePanelsModes,
          sidePanelsAllowed: prevSidePanelsAllowed,
          playerWrapperClientRect: prevplayerWrapperClientRect
        } = prevProps;
        if (
          sidePanelsModes === prevSidePanelsModes &&
          sidePanelsAllowed === prevSidePanelsAllowed &&
          playerWrapperClientRect === prevplayerWrapperClientRect
        ) {
          return;
        }

        this.setState({
          sidePanelsStore: this.createSidePanelsStore(this.props)
        });
      }

      /**
       * render
       * @returns {*} component
       */
      render() {
        const {sidePanelsStore} = this.state;

        if (!sidePanelsStore) {
          return null;
        }
        // eslint-disable-next-line no-unused-vars
        const {playerWrapperClientRect, sidePanelsModes, sidePanelsAllowed, ...restProps} = this.props;
        return <InnerComponent {...restProps} sidePanelsStore={sidePanelsStore} />;
      }
    };

    var innerComponentName = InnerComponent.displayName || InnerComponent.name || 'Component';

    connectHOC.displayName = `UIPresetsStoreConnect('${innerComponentName}')`;
    return connectHOC;
  };
};

export {connectToUIPresetsStore};
