//@flow
export type LogLevelObject = {value: number, name: string};
export type LogLevelType = {[level: string]: LogLevelObject};
export type loggerFunctionType = {
  trace: function,
  debug: function,
  info: function,
  log: function,
  warn: function,
  error: function,
  time: function,
  timeEnd: function,
  getLevel: function,
  setLevel: function
};

let JsLogger = {
  get: (name?: string) => ({
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

/**
 * get a logger
 * @param {function} getLogger - the logger
 * @returns {void}
 */
function setLogger(getLogger: function): void {
  if (typeof getLogger === 'function') {
    JsLogger.get = getLogger;
  }
}

/**
 * get a logger
 * @param {?string} name - the logger name
 * @returns {Object} - the logger class
 */
function getLogger(name?: string): Object {
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
export {getLogLevel, setLogLevel, setLogger};
