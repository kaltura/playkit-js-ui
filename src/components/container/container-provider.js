import {Component} from 'preact';
import getLogger from '../../utils/logger';

const logger = getLogger('ContainerProvider');

/**
 * container provider
 */
class ContainerProvider extends Component {
  /**
   * constructor
   * @return {void}
   */
  constructor() {
    super();
    this._listeners = [];
    this._presetsComponents = null;
  }

  /**
   * initialize preset components
   * @private
   * @return {void}
   */
  _initializePresetComponents() {
    const presetsComponents = {};
    (this.props.uiComponents || []).forEach(component => {
      if (!component.get || !component.container || !component.presets) {
        logger.warn(
          `preset with label '${component.label ||
            ''}' configuration is invalid, missing required configuration (did you remember to set 'get', 'presets' and 'render'?)`
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
        logger.error(`error occurred with one of the containers handling preset components.`, e);
      }
    });
  }

  /**
   * component did mount
   * @return {void}
   */
  componentDidMount() {
    this._initializePresetComponents();
  }

  /**
   * listen to context changes
   * @param {*} cb cb
   * @return {void}
   * @private
   */
  _listen = cb => {
    if (this._presetsComponents) {
      try {
        cb(this._presetsComponents);
      } catch (e) {
        // do nothing
      }
    }
    this._listeners.push(cb);
  };

  /**
   * remove listener to context changes
   * @param {*} cb cb
   * @return {void}
   * @private
   */
  _unlisten = cb => {
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
  render(props) {
    return props.children[0];
  }
}

export {ContainerProvider};
