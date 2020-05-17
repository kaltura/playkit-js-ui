import {Component} from 'preact';
import getLogger from '../../utils/logger';

const logger = getLogger('PlayerAreaProvider');

/**
 * PlayerArea provider
 */
class PlayerAreaProvider extends Component {
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
          logger.error(`error occurred with one of the PlayerAreas handling preset components.`, e);
        }
      });
    }, 200);
  }

  _validateComponentData = componentData => {
    // we keep option `container` for backward compatibility. documentation are showing `area` property
    const hasAreaProperty = componentData.container || componentData.area;
    if (!componentData.get || !componentData.presets || !hasAreaProperty) {
      logger.warn(`component data with label '${componentData.label || ''}' is invalid (did you remember to set 'get', 'presets' and 'area'?)`);
      return false;
    }

    return true;
  };

  _addNewComponentAndUpdateListeners = componentData => {
    const result = this._addNewComponent(componentData);

    if (result) {
      this._updateListeners();
      return result;
    }

    return () => {};
  };

  _addNewComponent = componentData => {
    // use cloned component just in case someone will mutate the object in another place
    const clonedComponentData = Object.assign({}, componentData);
    if (clonedComponentData.container) {
      clonedComponentData.area = clonedComponentData.area || clonedComponentData.container;
      delete clonedComponentData.container;
    }
    if (!this._validateComponentData(clonedComponentData)) {
      return null;
    }

    clonedComponentData.presets.forEach(preset => {
      (this._presetsComponents[preset] || (this._presetsComponents[preset] = [])).push(clonedComponentData);
    });

    return () => {
      this._removeNewComponent(clonedComponentData);
    };
  };

  _removeNewComponent = componentData => {
    if (!this._validateComponentData(componentData)) {
      return;
    }

    let shouldUpdateListeners = false;
    componentData.presets.forEach(preset => {
      const presetComponents = this._presetsComponents[preset] || [];
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
  };

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

  _getPresetComponents = () => {
    return this._presetsComponents;
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
        addNewComponent: this._addNewComponentAndUpdateListeners,
        getPresetComponents: this._getPresetComponents
      }
    };
  }

  /**
   * render provider
   * @param {any} props - params
   * @returns {void}
   */
  render(props) {
    return props.children;
  }
}

export {PlayerAreaProvider};
