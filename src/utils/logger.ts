/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable  @typescript-eslint/no-unused-vars */
export type LogLevelObject = {value: number; name: string};
export type LogLevelType = {[level: string]: LogLevelObject};
export type loggerFunctionType = {
  VERSION: string;
  DEBUG: LogLevelObject;
  ERROR: LogLevelObject;
  INFO: LogLevelObject;
  OFF: LogLevelObject;
  TIME: LogLevelObject;
  TRACE: LogLevelObject;
  WARN: LogLevelObject;
  createDefaultHandler: Function;
  debug: Function;
  enabledFor: Function;
  error: Function;
  get: Function;
  getLevel: Function;
  info: Function;
  log: Function;
  setHandler: Function;
  setLevel: Function;
  time: Function;
  timeEnd: Function;
  trace: Function;
  useDefaults: Function;
  warn: Function;
};

export type LoggerType = {
  getLogger: loggerFunctionType;
  LogLevel: LogLevelType;
};

const JsLogger: any = {
  get: (name?: string) => ({
    VERSION: '',
    DEBUG: {value: '', name: ''},
    ERROR: {value: '', name: ''},
    INFO: {value: '', name: ''},
    OFF: {value: '', name: ''},
    TIME: {value: '', name: ''},
    TRACE: {value: '', name: ''},
    WARN: {value: '', name: ''},
    createDefaultHandler: (): any => {},
    debug: (): any => {},
    enabledFor: (): any => {},
    error: (): any => {},
    get: (): any => {},
    getLevel: (): any => {},
    info: (): any => {},
    log: (): any => {},
    setHandler: (): any => {},
    setLevel: (): any => {},
    time: (): any => {},
    timeEnd: (): any => {},
    trace: (): any => {},
    useDefaults: (): any => {},
    warn: (): any => {}
  })
};

let LogLevel: LogLevelType = {};
/**
 * set logger
 * @param {LoggerType} logger - the logger
 * @returns {void}
 */
function setLogger(logger?: LoggerType): void {
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
function getLogger(name?: string): any {
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
