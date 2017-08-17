//@flow
import * as JsLogger from 'js-logger';

const LOG_LEVEL: { [level: string]: Object } = {
  "DEBUG": JsLogger.DEBUG,
  "INFO": JsLogger.INFO,
  "TIME": JsLogger.TIME,
  "WARN": JsLogger.WARN,
  "ERROR": JsLogger.ERROR,
  "OFF": JsLogger.OFF
};

/**
 * LoggerFactory
 *
 * @class LoggerFactory
 */
class LoggerFactory {
  /**
   * Creates an instance of LoggerFactory.
   * @param {Object} [options] options
   * @memberof LoggerFactory
   */
  constructor(options?: Object) {
    JsLogger.useDefaults(options || {});
  }

  /**
   * getLogger
   *
   * @param {string} [name] name
   * @returns {*} - logger
   * @memberof LoggerFactory
   */
  getLogger(name?: string) {
    if (!name) {
      return JsLogger;
    }
    return JsLogger.get(name);
  }
}

const lf = new LoggerFactory({defaultLevel: JsLogger.DEBUG});

export default lf;
export {LOG_LEVEL};
