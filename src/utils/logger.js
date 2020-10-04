//@flow
export type LogLevelObject = {value: number, name: string};
export type LogLevelType = {[level: string]: LogLevelObject};
export type loggerFunctionType = {
  trace: Function,
  debug: Function,
  info: Function,
  log: Function,
  warn: Function,
  error: Function,
  time: Function,
  timeEnd: Function,
  getLevel: Function,
  setLevel: Function
};

export type LoggerType = {
  getLogger: loggerFunctionType,
  LogLevel: LogLevelType
};

let JsLogger = {
  get: () => ({
    trace: () => {},
    debug: () => {},
    info: () => {},
    log: () => {},
    warn: () => {},
    error: () => {},
    time: () => {},
    timeEnd: () => {},
    getLevel: () => {},
    setLevel: () => {}
  })
};

let LogLevel: LogLevelType = {};
/**
 * set logger
 * @param {LoggerType} logger - the logger
 * @returns {void}
 */
function setLogger(logger: LoggerType): void {
  if (typeof logger.getLogger === 'function') {
    JsLogger.get = logger.getLogger;
  }
  if (logger.LogLevel) {
    LogLevel = logger.LogLevel;
  }
}

/**
 * get a logger
 * @param {?string} name - the logger name
 * @returns {Object} - the logger class
 */
function getLogger(name?: string): Object {
  //$FlowFixMe
  return JsLogger.get(name);
}

/**
 * get the log level
 * @param {?string} name - the logger name
 * @returns {LogLevelObject} - the log level
 */
function getLogLevel(name?: string): LogLevelObject {
  return getLogger(name).getLevel();
}

/**
 * sets the logger level
 * @param {LogLevelObject} level - the log level
 * @param {?string} name - the logger name
 * @returns {void}
 */
function setLogLevel(level: LogLevelObject, name?: string): void {
  getLogger(name).setLevel(level);
}

export default getLogger;
export {getLogLevel, setLogLevel, setLogger, LogLevel};
