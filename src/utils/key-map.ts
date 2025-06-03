/**
 * @deprecated Use the `KeyCode` object instead.
 * see here: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
 * For more information on keyboard event codes, refer to the MDN documentation:
 * https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code/code_values
 */
export const KeyMap: {[key: string]: number} = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  SPACE: 32,
  END: 35,
  HOME: 36,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  P: 80,
  C: 67,
  F: 70,
  M: 77,
  SEMI_COLON: 186,
  COMMA: 188,
  PERIOD: 190
};

export const KeyCode = {
  Backspace: 'Backspace',
  Tab: 'Tab',
  Enter: 'Enter',
  ShiftLeft: 'ShiftLeft',
  ShiftRight: 'ShiftRight',
  ControlLeft: 'ControlLeft',
  ControlRight: 'ControlRight',
  AltLeft: 'AltLeft',
  AltRight: 'AltRight',
  Pause: 'Pause',
  CapsLock: 'CapsLock',
  Escape: 'Escape',
  Space: 'Space',
  PageUp: 'PageUp',
  PageDown: 'PageDown',
  End: 'End',
  Home: 'Home',
  ArrowLeft: 'ArrowLeft',
  ArrowUp: 'ArrowUp',
  ArrowRight: 'ArrowRight',
  ArrowDown: 'ArrowDown',
  Insert: 'Insert',
  Delete: 'Delete',
  KeyP: 'KeyP',
  KeyC: 'KeyC',
  KeyF: 'KeyF',
  KeyM: 'KeyM',
  KeyD: 'KeyD',
  Numpad0: 'Numpad0',
  Semicolon: 'Semicolon',
  Equal: 'Equal',
  Comma: 'Comma',
  Minus: 'Minus',
  Period: 'Period',
  Slash: 'Slash'
};

/**
 * set env for keymap
 * @param {Object} env - env object
 * @returns {void}
 */
export function setEnv(env: any): void {
  KeyMap.SEMI_COLON = env.browser.name.toLowerCase() === 'firefox' ? 59 : 186;
}

/**
 * gets the key name for a certain key code
 * @param {number} keyCode - key code
 * @returns {string} - key name
 */
export function getKeyName(keyCode: number): string {
  for (const keyName in KeyMap) {
    if (KeyMap[keyName] === keyCode) {
      return keyName;
    }
  }
  return 'NOT_FOUND';
}

/**
 * @param {number} keyCode - key code
 * @returns {boolean} - whether the given key code is a tab key
 */
export function isTab(keyCode: number): boolean {
  return isKeyEqual(keyCode, KeyMap.TAB);
}

/**
 * @param {number} keyCode - key code
 * @returns {boolean} - whether the given key code is an enter key
 */
export function isEnter(keyCode: number): boolean {
  return isKeyEqual(keyCode, KeyMap.ENTER);
}

/**
 * @param {number} keyCode - key code
 * @returns {boolean} - whether the given key code is an esc key
 */
export function isEsc(keyCode: number): boolean {
  return isKeyEqual(keyCode, KeyMap.ESC);
}

/**
 * @param {number} inputKeyCode - input key code
 * @param {number} targetKeyCode - target key code
 * @returns {boolean} - whether the given key code is equals to the input key
 */
function isKeyEqual(inputKeyCode: number, targetKeyCode: number): boolean {
  return inputKeyCode === targetKeyCode;
}
