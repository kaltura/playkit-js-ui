import getLogger from '../utils/logger';
import {UIOptionsObject} from '../types';

let logger;
/**
 * The logger middleware.
 * Prints action logs in case of received debug=true from the UI config.
 * @param {UIOptionsObject} config - The UI config.
 * @returns {void}
 */
const loggerMiddleware =
  (config: UIOptionsObject) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (store: any) =>
  (next: (...args: any) => any) =>
  (action: any): void => {
    if (!logger) {
      logger = getLogger('UILoggerMiddleware');
    }
    if (config.debugActions) {
      logger.debug('Action fired', action);
    }
    next(action);
  };

export {loggerMiddleware};
