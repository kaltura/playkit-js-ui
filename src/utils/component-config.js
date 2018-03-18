//@flow
/**
 * Gets config param value
 * @param {*} config property name
 * @param {string} alias component name alias
 * @returns {Object} component config object
 */
function getComponentConfig(config: any, alias: string): Object {
  try {
    return config.components[alias];
  } catch (error) {
    return {};
  }
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

export {shouldRenderComponent, getComponentConfig};
