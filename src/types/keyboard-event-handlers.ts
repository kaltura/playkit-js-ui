import {KeyboardKey} from './keyboard-key';

export type KeyboardEventHandlers = {
  eventType?: string;
  key: KeyboardKey;
  action: Function;
};
