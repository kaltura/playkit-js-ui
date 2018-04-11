// @flow
import getLogger from '../utils/logger'

const logger = getLogger('UILoggerMiddleware');

/**
 * The logger middleware.
 * Prints action logs in case of received debug=true from the UI config.
 * @param {UIOptionsObject} config - The UI config.
 * @returns {void}
 */
const loggerMiddleware = (config: UIOptionsObject) => (store: Object) => (next: Function) => (action: Object) => {  // eslint-disable-line no-unused-vars
  if (config.debugActions) {
    logger.debug('Action fired', action);
  }
  next(action);
};

export {loggerMiddleware};
