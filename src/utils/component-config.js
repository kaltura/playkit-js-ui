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
    return {}
  }
}

export default getComponentConfig;
