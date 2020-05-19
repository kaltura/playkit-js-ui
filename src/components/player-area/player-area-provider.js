import {Component} from 'preact';
import {connect} from 'react-redux';
import {withLogger} from 'components/logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  activePresetName: state.shell.activePresetName
});


/**
 * PlayerArea provider
 */
@withLogger('PlayerAreaProvider')
@connect(mapStateToProps)
class PlayerAreaProvider extends Component {
  /**
   * constructor
   * @return {void}
   */
  constructor() {
    super();
    this._listeners = [];
    this._componentsByPreset = {};
  }

  /**
   * initialize preset components
   * @private
   * @return {void}
   */
  _initializePlayerComponents() {
    let shouldTriggerListeners = false;
    (this.props.uiComponents || []).forEach(componentData => {
      const componentAdded = !!this._addNewComponent(componentData);
      shouldTriggerListeners = shouldTriggerListeners || componentAdded;
    });

    if (!shouldTriggerListeners) {
      return;
    }

    this._emitAllListeners();
  }

  _emitListeners(listeners) {
    const { activePresetName } = this.props;

    (listeners || []).forEach(listener => {
      const components = listener.presetName === activePresetName ? this._getAreaComponents(activePresetName, listener.areaName) : [];

      try {
        listener.callback(components);
      } catch (e) {
        this.props.logger.error(`Error occurred when handling player area ${listener.areaName} of preset ${listener.presetName}.`, e);
      }
    });
  }

  _emitAllListeners() {
    setTimeout(() => {
      // use timeout to make sure redux store is in sync
      this._emitListeners(this._listeners);
    }, 200);
  }

  _validateComponentData = componentData => {
    // we keep option `container` for backward compatibility. documentation are showing `area` property
    const hasAreaProperty = componentData.container || componentData.area;
    if (!componentData.get || !componentData.presets || !hasAreaProperty) {
      this.props.logger.warn(
        `component data with label '${component.label ||
          ''}' is invalid (did you remember to set 'get', 'presets' and 'area'?)`
      );
      return false;
    }

    return true;
  };

  _addNewComponentAndUpdateListeners = (componentData) => {
    return this._addNewComponent(componentData, true);
  }

  _addNewComponent = (componentData, shouldUpdateImmediately) => {
    // use cloned component just in case someone will mutate the object in another place
    const clonedComponentData = Object.assign({}, componentData);
    if (clonedComponentData.container) {
      clonedComponentData.area = clonedComponentData.area || clonedComponentData.container;
      delete clonedComponentData.container;
    }
    if (!this._validateComponentData(clonedComponentData)) {
      return () => {};
    }

    const areaName = clonedComponentData.area;

    clonedComponentData.presets.forEach(presetName => {
      (this._componentsByPreset[presetName] || (this._componentsByPreset[presetName] = [])).push(clonedComponentData);

      if (shouldUpdateImmediately) {
        const listeners = this._findListeners(areaName,presetName);
        this._emitListeners(listeners);
      }
    });

    return () => {
      this._removeNewComponent(clonedComponentData);
    };
  };

  _removeNewComponent = componentData => {
    if (!this._validateComponentData(componentData)) {
      return;
    }

    componentData.presets.forEach(presetName => {
      const presetComponents = (this._componentsByPreset[presetName] || []);
      const index = presetComponents.indexOf(componentData);
      if (index === -1) {
        return;
      }
      presetComponents.splice(index, 1);

      const listeners = this._findListeners(componentData.area, componentData.presetName);
      this._emitListeners(listeners);
    });
  }

  /**
   * component did mount
   * @return {void}
   */
  componentDidMount() {
    this._initializePlayerComponents();
  }

  _findListeners = (areaName, optionalPresetName) => {
    if (!areaName) {
      return [];
    }
    return this._listeners.filter(listener => (!optionalPresetName || listener.presetName === optionalPresetName) &&
     listener.areaName === areaName);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.activePresetName !== this.props.activePresetName) {
      this._emitAllListeners();
    }
  }

  /**
   * listen to context changes
   * @param {*} cb cb
   * @return {void}
   * @private
   */
  _listen = (presetName, areaName, callback) => {
    if (!presetName || !areaName || !callback) {
      return () => {};
    }

    const currentAreaListener = this._findListeners(areaName, presetName);

    if (currentAreaListener && currentAreaListener.length > 0) {
      this.props.logger.warn(`Another component is already registered to updates for player area '${areaName}' in preset '${presetName}'. Unlisten to previous listener`);
      currentAreaListener.forEach(listener => {
        this._unlisten(listener);

      });
    }

    const newListener = {presetName: presetName, areaName: areaName, callback: callback};
    this._listeners.push(newListener);
    this._emitListeners([newListener]);
    return () => {
      this._unlisten(newListener);
    }
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

  _getAreaComponents = (presetName, areaName) => {
    if (!areaName || !presetName) {
      return [];
    }

    const presetComponents = this._componentsByPreset[presetName];
    const areaComponents = presetComponents ? presetComponents.filter(component => component.area === areaName) : [];

    return areaComponents || []
  }
  /**
   *
   * @returns {void}
   */
  getChildContext() {
    // Notice: the listen/unlisten methods are used instead of passing the data directly
    // as it appears that context changes doesnt re-render the components.
    return {
      playerAreaComponentsStore: {
        listen: this._listen,
        addNewComponent: this._addNewComponentAndUpdateListeners,
        getAreaComponents: this._getAreaComponents
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
