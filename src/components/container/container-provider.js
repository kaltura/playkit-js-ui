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
    this._presetsComponents = {};
  }

  /**
   * initialize preset components
   * @private
   * @return {void}
   */
  _initializePresetComponents() {
    let shouldTriggerListeners = false;
    (this.props.uiComponents || []).forEach(componentData => {
      const componentAdded = !!this._addNewComponent(componentData);
      shouldTriggerListeners = shouldTriggerListeners || componentAdded;
    });

    if (!shouldTriggerListeners) {
      return;
    }

    this._updateListeners();
  }

  _updateListeners() {
    setTimeout(() => {
      // use timeout to make sure redux store is in sync
      this._listeners.forEach(cb => {
        try {
          cb(this._presetsComponents);
        } catch (e) {
          logger.error(`error occurred with one of the containers handling preset components.`, e);
        }
      });
    }, 200);
  }

  _validateComponentData = (componentData) => {
    if (!componentData.get || !componentData.container || !componentData.presets) {
      logger.warn(
        `component data with label '${component.label ||
          ''}' is invalid (did you remember to set 'get', 'presets' and 'container'?)`
      );
      return false;
    }

    return true;
  }

  _addNewComponentAndUpdateListeners = (componentData) => {
    const result = this._addNewComponent(componentData);

    if (!!result) {
      this._updateListeners();
    }

    return result;
  }

  _addNewComponent = (componentData) => {
    // use cloned component just in case someone will mutate the object in another place
    const clonedComponentData = Object.assign({}, componentData);
    if (!this._validateComponentData(clonedComponentData)) {
      return () => {};
    }

    clonedComponentData.presets.forEach(preset => {
      (this._presetsComponents[preset] || (this._presetsComponents[preset] = [])).push(clonedComponentData);
    });

    return () => {
      this._removeFromPreVideoArea(clonedComponentData);
    }
  }

  _removeFromPreVideoArea = (componentData) => {
    if (!this._validateComponentData(componentData)) {
      return;
    }

    let shouldUpdateListeners = false;
    componentData.presets.forEach(preset => {
      const presetComponents = (this._presetsComponents[preset] || []);
      const index = presetComponents.indexOf(componentData);
      if (index === -1) {
        return;
      }
      presetComponents.splice(index, 1);
      shouldUpdateListeners = true;
    });

    if (!shouldUpdateListeners) {
      return;
    }

    this._updateListeners();
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
        unlisten: this._unlisten,
        addNewComponent: this._addNewComponentAndUpdateListeners
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
