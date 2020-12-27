//@flow
export type LogLevelObject = {value: number, name: string};
export type LogLevelType = {[level: string]: LogLevelObject};
export type loggerFunctionType = {
  VERSION: String,
  DEBUG: LogLevelObject,
  ERROR: LogLevelObject,
  INFO: LogLevelObject,
  OFF: LogLevelObject,
  TIME: LogLevelObject,
  TRACE: LogLevelObject,
  WARN: LogLevelObject,
  createDefaultHandler: Function,
  debug: Function,
  enabledFor: Function,
  error: Function,
  get: Function,
  getLevel: Function,
  info: Function,
  log: Function,
  setHandler: Function,
  setLevel: Function,
  time: Function,
  timeEnd: Function,
  trace: Function,
  useDefaults: Function,
  warn: Function
};

export type LoggerType = {
  getLogger: loggerFunctionType,
  LogLevel: LogLevelType
};

let JsLogger = {
  get: () => ({
    VERSION: '',
    DEBUG: {value: '', name: ''},
    ERROR: {value: '', name: ''},
    INFO: {value: '', name: ''},
    OFF: {value: '', name: ''},
    TIME: {value: '', name: ''},
    TRACE: {value: '', name: ''},
    WARN: {value: '', name: ''},
    createDefaultHandler: () => {},
    debug: () => {},
    enabledFor: () => {},
    error: () => {},
    get: () => {},
    getLevel: () => {},
    info: () => {},
    log: () => {},
    setHandler: () => {},
    setLevel: () => {},
    time: () => {},
    timeEnd: () => {},
    trace: () => {},
    useDefaults: () => {},
    warn: () => {}
  })
};

let LogLevel: LogLevelType = {};
/**
 * set logger
 * @param {LoggerType} logger - the logger
 * @returns {void}
 */
function setLogger(logger: ?LoggerType): void {
  if (logger && typeof logger.getLogger === 'function') {
    JsLogger.get = logger.getLogger;
  }
  if (logger && logger.LogLevel) {
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
