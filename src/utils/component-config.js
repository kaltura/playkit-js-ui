//@flow
import {mergeDeep} from './merge-deep';

/**
 * @param {string} component - The component name.
 * @param {string} oldState - The component old state.
 * @param {string} action - The action object.
 * @returns {Object} - The component updated state.
 */
function getComponentStateFromConfig(component: string, oldState: Object, action: Object): Object {
  const componentConfig = action.config.components && action.config.components[component];
  if (componentConfig) {
    return mergeDeep(oldState, componentConfig);
  }
  return oldState;
}

/**
 * @param {string} component - The component name.
 * @param {string} oldState - The component old state.
 * @param {string} action - The action object.
 * @returns {Object} - The component updated state.
 */
function getComponentStateFromComponentConfig(component: string, oldState: Object, action: Object): Object {
  if (action.componentAlias === component) {
    return mergeDeep(oldState, action.config);
  }
  return oldState;
}

/**
 * Checks if component should be rendered based on its value in the store.
 * @param {Object} config - Config store
 * @param {string} alias - Component alias
 * @return {boolean} - Whether component should be rendered
 */
function shouldRenderComponent(config: Object, alias: string) {
  const componentConfig = config.components[alias];
  return !(Object.keys(componentConfig).length === 0 &&
    componentConfig.constructor === Object);
}

export {shouldRenderComponent, getComponentStateFromConfig, getComponentStateFromComponentConfig};
