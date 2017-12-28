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

  set targetId(value: string): void {
    if (typeof value !== 'string') return;
    this._targetId = value;
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

  constructor(targetId: string, logLevel?: string) {
    if (typeof targetId === 'string') {
      this.targetId = targetId;
      this.logLevel = logLevel || 'ERROR';
    } else if (typeof targetId === 'object') {
      this.fromJSON(targetId);
    }
  }

  fromJSON(json: UIOptionsObject): void {
    if (json.targetId) {
      this.targetId = json.targetId;
    }
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
