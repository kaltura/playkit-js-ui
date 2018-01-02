// @flow
import {LogLevel} from '../utils/logger';

export type UIOptionsObject = {
  targetId: string,
  logLevel: string,
  forceTouchUI: boolean
};

export default class UIOptions {
  _targetId: string;
  _logLevel: string = 'ERROR';
  _forceTouchUI: boolean = false;

  get forceTouchUI(): boolean {
    return this._forceTouchUI;
  }

  set forceTouchUI(value: boolean): void {
    if (typeof value !== 'boolean') return;
    this._forceTouchUI = value;
  }

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
    if (typeof value === 'string' && LogLevel[value]) {
      this._logLevel = value;
    }
  }

  constructor(targetId?: string | UIOptionsObject) {
    if (typeof targetId === 'string') {
      this.targetId = targetId;
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
    if (json.forceTouchUI) {
      this.forceTouchUI = json.forceTouchUI;
    }
  }

  toJSON(): UIOptionsObject {
    return {
      targetId: this.targetId,
      logLevel: this.logLevel,
      forceTouchUI: this.forceTouchUI
    };
  }
}
