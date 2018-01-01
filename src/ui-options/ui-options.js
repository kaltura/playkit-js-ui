// @flow
import {LogLevel} from '../utils/logger';
import {validate} from './ui-options-helpers'

export type UIOptionsObject = {
  targetId: string,
  logLevel: string
};

export default class UIOptions {
  _targetId: string;
  _logLevel: string = 'ERROR';

  get targetId(): string {
    return this._targetId;
  }

  get logLevel(): string {
    return this._logLevel;
  }

  set logLevel(value: string): void {
    if (typeof value === 'string' && LogLevel[value]) {
      this._logLevel = value;
    }
  }

  constructor(targetId: string | UIOptionsObject) {
    validate(targetId);
    if (typeof targetId === 'string') {
      this._targetId = targetId;
    } else if (typeof targetId === 'object') {
      this.fromJSON(targetId);
    }
  }

  fromJSON(json: UIOptionsObject): void {
    this._targetId = json.targetId;
    this.logLevel = json.logLevel || this.logLevel;
  }

  toJSON(): UIOptionsObject {
    return {
      targetId: this.targetId,
      logLevel: this.logLevel
    };
  }
}
