import {Component, h, Fragment} from 'preact';
import {connect} from 'react-redux';
import {withLogger, WithLoggerProps} from '../logger';
import {StylesStoreAdapter} from './styles-store-adapter';
import {KPUIAddComponent, KPUIComponent, KPUIRemoveComponent} from '@playkit-js/kaltura-player-js';

type PlayerAreaProviderProps = {
  activePresetName?: string;
  setApi: (fn: (componentData: KPUIAddComponent) => () => void) => void;
  uiComponents: KPUIComponent[];
}

type ComponentListener = {
  presetName: string;
  areaName: string;
  callback: (args?: any) => any;
};



/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  activePresetName: state.shell.activePresetName
});

/**
 * PlayerAreaProvider component
 *
 * @class PlayerAreaProvider
 * @extends {Component}
 */
@withLogger('PlayerAreaProvider')
@connect(mapStateToProps)
class PlayerAreaProvider extends Component<WithLoggerProps & PlayerAreaProviderProps, any> {
  private _listeners: ComponentListener[];
  private _componentsByPreset: Record<string, KPUIAddComponent[]>;
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
  _initializePlayerComponents(): void {
    if (this.props.uiComponents && this.props.uiComponents.length > 0) {
      // @ts-ignore - TODO
      this.props.uiComponents.forEach((c)=> this._addNewComponent(c));
      this._emitAllListeners();
    }
  }

  /**
   * @param {Array<Object>} listeners - listeners
   * @returns {void}
   * @private
   */
  _emitListeners(listeners: ComponentListener[]): void {
    const {activePresetName} = this.props;

    (listeners || []).forEach(listener => {
      const components = listener.presetName === activePresetName ? this._getAreaComponents(activePresetName, listener.areaName) : [];

      try {
        listener.callback(components);
      } catch (e) {
        this.props.logger.error(`Error occurred when handling player area ${listener.areaName} of preset ${listener.presetName}.`, e);
      }
    });
  }

  /**
   * @returns {void}
   * @private
   */
  _emitAllListeners(): void {
    this._emitListeners(this._listeners);
  }

  /**
   * @param {Object} componentData - componentData
   * @returns {boolean} - is valid
   * @private
   */
  _validateComponentData = (componentData: KPUIAddComponent) => {
    // we keep option `container` for backward compatibility. documentation are showing `area` property
    const hasAreaProperty = componentData.container || componentData.area;
    if (!componentData.get || !componentData.presets || !hasAreaProperty) {
      this.props.logger.warn(
        `component data with label '${componentData.label || ''}' is invalid (did you remember to set 'get', 'presets' and 'area'?)`
      );
      return false;
    }

    return true;
  };

  /**
   * @param {Object} componentData - componentData
   * @returns {function} - remove function
   * @private
   */
  _addNewComponentAndUpdateListeners: (componentData: KPUIAddComponent) => (() => void) = (componentData: KPUIAddComponent): () => void => {
    return this._addNewComponent(componentData, true);
  };

  /**
   * @param {Object} componentData - componentData
   * @param {boolean} shouldUpdateImmediately - shouldUpdateImmediately
   * @returns {function} - remove function
   * @private
   */
  _addNewComponent = (componentData: KPUIAddComponent, shouldUpdateImmediately: boolean): () => void => {
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
        const listeners = this._findListeners(areaName, presetName);
        this._emitListeners(listeners);
      }
    });

    return () => {
      this._removeNewComponent(clonedComponentData);
    };
  };

  /**
   * @param {Object} componentData - componentData
   * @returns {void}
   * @private
   */
  _removeNewComponent = (componentData: KPUIAddComponent) => {
    if (!this._validateComponentData(componentData)) {
      return;
    }

    componentData.presets.forEach(presetName => {
      const presetComponents = this._componentsByPreset[presetName] || [];
      const index = presetComponents.indexOf(componentData);
      if (index === -1) {
        return;
      }
      presetComponents.splice(index, 1);

      const listeners = this._findListeners(componentData.area, componentData['presetName']);
      this._emitListeners(listeners);
    });
  };

  /**
   * component did mount
   * @return {void}
   */
  componentDidMount() {
    this.props.setApi(this._addNewComponentAndUpdateListeners);
    this._initializePlayerComponents();
  }

  /**
   * @param {string} areaName - the area name
   * @param {string} optionalPresetName - optional preset name
   * @returns {Object} - listener
   * @private
   */
  _findListeners = (areaName: string, optionalPresetName: string) => {
    if (!areaName) {
      return [];
    }
    return this._listeners.filter(listener => (!optionalPresetName || listener.presetName === optionalPresetName) && listener.areaName === areaName);
  };

  /**
   * component did update
   * @param {*} prevProps prevProps
   * @return {void}
   */
  componentDidUpdate(prevProps: any) {
    if (prevProps.activePresetName !== this.props.activePresetName) {
      this._emitAllListeners();
    }
  }

  /**
   * listen to context changes
   * @param {string} presetName - presetName
   * @param {string} areaName - areaName
   * @param {function} callback - callback
   * @return {?function} - unlisten function
   * @private
   */
  _listen = (presetName: string, areaName: string, callback: (args?: any) => any) => {
    if (!presetName || !areaName || !callback) {
      return () => {};
    }

    const currentAreaListener = this._findListeners(areaName, presetName);

    if (currentAreaListener && currentAreaListener.length > 0) {
      this.props.logger.warn(
        `Another component is already registered to updates for player area '${areaName}' in preset '${presetName}'. Unlisten to previous listener`
      );
      currentAreaListener.forEach(listener => {
        this._unlisten(listener);
      });
    }

    const newListener = {presetName: presetName, areaName: areaName, callback: callback};
    this._listeners.push(newListener);
    this._emitListeners([newListener]);
    return () => {
      this._unlisten(newListener);
    };
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
   * @param {string} presetName - preset name
   * @param {string} areaName - the area name
   * @returns {Array<Object>} - area components
   * @private
   */
  _getAreaComponents = (presetName: string, areaName: string) => {
    if (!areaName || !presetName) {
      return [];
    }

    const presetComponents = this._componentsByPreset[presetName];
    const areaComponents = presetComponents ? presetComponents.filter(component => component.area === areaName) : [];

    return areaComponents || [];
  };
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
    return (
      <Fragment>
        <StylesStoreAdapter />
        {props.children}
      </Fragment>
    );
  }
}

export {PlayerAreaProvider};
