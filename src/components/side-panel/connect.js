// @flow
import {Component, h} from 'preact';
import {connect} from 'preact-redux';
import * as sidePanelUtils from './side-panel-utils';

/**
 * create proxy method for calculateSidePanelStyles
 *
 * @param {string} options options
 * @return {*} function
 */
function createCalculateSidePanelStyles(options) {
  return position => {
    if (!options.sidePanelsAllowed || ['TOP', 'BOTTOM', 'RIGHT', 'LEFT'].indexOf(position) === -1) {
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
    if (!options.sidePanelsAllowed) {
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
    if (!options.sidePanelsAllowed || ['TOP', 'BOTTOM'].indexOf(anchor) === -1) {
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
  sidePanels: state.shell.sidePanels,
  sidePanelsAllowed: state.shell.sidePanelsAllowed,
  playerClientRect: state.shell.playerClientRect
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
      static defaultProps = {
        maxSidePanelWidth: 480,
        minSidePanelWidth: 240
      };

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
          maxSidePanelWidth: propsSnapshot.maxSidePanelWidth,
          minSidePanelWidth: propsSnapshot.minSidePanelWidth,
          sidePanels: propsSnapshot.sidePanels,
          playerClientRect: propsSnapshot.playerClientRect,
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
        const {sidePanels, sidePanelsAllowed, playerClientRect} = this.props;
        const {sidePanels: prevSidePanels, sidePanelsAllowed: prevSidePanelsAllowed, playerClientRect: prevPlayerClientRect} = prevProps;
        if (sidePanels === prevSidePanels && sidePanelsAllowed === prevSidePanelsAllowed && playerClientRect === prevPlayerClientRect) {
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
        const {playerClientRect, sidePanels, sidePanelsAllowed, ...restProps} = this.props;
        return <InnerComponent {...restProps} sidePanelsStore={sidePanelsStore} />;
      }
    };

    var innerComponentName = InnerComponent.displayName || InnerComponent.name || 'Component';

    connectHOC.displayName = `UIPresetsStoreConnect('${innerComponentName}')`;
    return connectHOC;
  };
};

export {connectToUIPresetsStore};
