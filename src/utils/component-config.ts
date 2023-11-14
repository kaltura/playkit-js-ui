import {mergeDeep} from './merge-deep';

/**
 * @param {string} component - The component name.
 * @param {string} oldState - The component old state.
 * @param {string} action - The action object.
 * @returns {Object} - The component updated state.
 */
function getComponentStateFromConfig(component: string, oldState: any, action: any): Object {
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
function getComponentStateFromComponentConfig(component: string, oldState: any, action: any): Object {
  if (action.componentAlias === component) {
    return mergeDeep(oldState, action.config);
  }
  return oldState;
}

export {getComponentStateFromConfig, getComponentStateFromComponentConfig};
