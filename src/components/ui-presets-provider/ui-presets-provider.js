// @flow
import {Component, h} from 'preact';
import getLogger from '../../utils/logger';
import {connect} from 'preact-redux';
import * as sidePanelUtils from './side-panel-utils';

const logger = getLogger('UIPresetsProvider');

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

@connect(mapStateToProps)
/**
 *  A provider of injected preset components configuration
 */
class UIPresetsProvider extends Component {
  /**
   * constructor
   * @return {void}
   */
  constructor() {
    super();
    this._listeners = [];
    this._presetsComponents = {};
  }

  /**
   * initialize preset components
   * @private
   * @return {void}
   */
  _initializePresetComponents() {
    const presetsComponents = {};
    (this.props.uiComponents || []).forEach(component => {
      if (!component.render || !component.container || !component.presets) {
        logger.warn(
          `preset with label '${component.label ||
            ''}' configuration is invalid, missing required configuration (did you remember to set 'container', 'presets' and 'render'?)`
        );
        return;
      }

      component.presets.forEach(preset => {
        (presetsComponents[preset] || (presetsComponents[preset] = [])).push(component);
      });
    });

    this._presetsComponents = presetsComponents;

    this._listeners.forEach(cb => {
      try {
        cb(this._presetsComponents);
      } catch (e) {
        // do nothing
      }
    });
  }

  /**
   * component did mount
   * @return {void}
   */
  componentDidMount(): void {
    this._initializePresetComponents();
  }

  /**
   * listen to context changes
   * @param {*} cb cb
   * @return {void}
   * @private
   */
  _listen = (cb): void => {
    try {
      cb(this._presetsComponents);
    } catch (e) {
      // do nothing
    }
    this._listeners.push(cb);
  };

  /**
   * remove listener to context changes
   * @param {*} cb cb
   * @return {void}
   * @private
   */
  _unlisten = (cb): void => {
    const index = this._listeners.indexOf(cb);
    if (index === -1) {
      return;
    }
    this._listeners.splice(index, 1);
  };

  /**
   *
   * @returns {void}
   */
  getChildContext() {
    // Notice: the listen/unlisten methods are used instead of passing the data directly
    // as it appears that context changes doesnt re-render the components.
    return {
      presetComponentsStore: {
        listen: this._listen,
        unlisten: this._unlisten
      }
    };
  }

  /**
   * render provider
   * @param {any} props - params
   * @returns {void}
   */
  render(props: any) {
    return props.children[0];
  }
}

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
 * connect decorator
 * @returns {function(*): *} connect
 */
const connectToUIPresetsStore = () => {
  return InnerComponent => {
    @connect(mapStateToProps)
    /**
     * store hoc
     */
    class UIPresetsStoreHOC extends Component {
      static defaultProps = {
        maxSidePanelWidth: 480,
        minSidePanelWidth: 240
      };

      state = {
        sidePanelsStore: null
      };
      /**
       * initialize side panels
       * @private
       * @return {void}
       */
      _initializeSidePanels() {
        const options = {
          maxSidePanelWidth: this.props.maxSidePanelWidth,
          minSidePanelWidth: this.props.minSidePanelWidth,
          sidePanels: this.props.sidePanels,
          playerClientRect: this.props.playerClientRect,
          sidePanelsAllowed: this.props.sidePanelsAllowed
        };

        // eslint-disable-next-line no-console
        console.log(`sakal ui preset provider - pre`, {options});
        this.setState(
          {
            sidePanelsStore: {
              calculatePresetChildStyles: createCalculatePresetChildStyles(options),
              calculateVideoStyles: createCalculateVideoStyles(options),
              calculateSidePanelStyles: createCalculateSidePanelStyles(options)
            }
          },
          () => {
            // eslint-disable-next-line no-console
            console.log(`sakal ui preset provider - post`, {options});
          }
        );
      }

      /**
       * component did update
       * @param {*} prevProps prevProps
       * @return {void}
       */
      componentDidUpdate(prevProps): void {
        const {sidePanels, sidePanelsAllowed, playerClientRect} = this.props;
        const {sidePanels: prevSidePanels, sidePanelsAllowed: prevSidePanelsAllowed, playerClientRect: prevPlayerClientRect} = prevProps;
        if (sidePanels !== prevSidePanels || sidePanelsAllowed !== prevSidePanelsAllowed || playerClientRect !== prevPlayerClientRect) {
          this._initializeSidePanels();
        }
      }

      /**
       * component will mount
       * @return {void}
       */
      componentWillMount(): void {
        this._initializeSidePanels();
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
        const presetComponentsStore = this.context.presetComponentsStore;
        return <InnerComponent {...this.props} sidePanelsStore={sidePanelsStore} presetComponentsStore={presetComponentsStore} />;
      }
    }

    UIPresetsStoreHOC.displayName = `UIPresetsStoreConnect('${InnerComponent.displayName}')`;
    return UIPresetsStoreHOC;
  };
};

export {UIPresetsProvider, connectToUIPresetsStore};
