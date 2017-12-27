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
    if (LogLevel[value]) {
      this._logLevel = value;
    }
  }

  constructor(targetId: string, logLevel?: string) {
    this._targetId = targetId;
    this.logLevel = logLevel || 'ERROR';
  }

  toJSON(): UIOptionsObject {
    return {
      targetId: this.targetId,
      logLevel: this.logLevel
    };
  }
}
