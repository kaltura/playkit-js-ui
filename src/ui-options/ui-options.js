// @flow
import {LogLevel} from '../utils/logger';

export type UIOptionsObject = {
  targetId: string,
  logLevel: string
};

export default class UIOptions {
  _targetId: string;
  _logLevel: string;

  get targetId(): string {
    return this._targetId;
  }

  get logLevel(): string {
    return this._logLevel;
  }

  set logLevel(value: string): void {
    if (typeof value !== 'string') return;
    if (LogLevel[value]) {
      this._logLevel = value;
    }
  }

  constructor(targetId: string | UIOptionsObject) {
    validate(targetId);
    if (typeof targetId === 'string') {
      this._targetId = targetId;
      this.logLevel = 'ERROR';
    } else if (typeof targetId === 'object') {
      this.fromJSON(targetId);
    }
  }

  fromJSON(json: UIOptionsObject): void {
    this._targetId = json.targetId;
    if (json.logLevel) {
      this.logLevel = json.logLevel;
    }
  }

  toJSON(): UIOptionsObject {
    return {
      targetId: this.targetId,
      logLevel: this.logLevel
    };
  }
}

/**
 * Validate user input
 * @param {string | UIOptionsObject} param - user input
 * @returns {void}
 */
function validate(param: string | UIOptionsObject): void {
  if (typeof param === 'string') return;
  if (typeof param === 'object' && typeof param.targetId === 'string') return;
  throw new TypeError('Target id must be provide and be type of string');
}
