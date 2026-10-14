const UNSAFE_KEYS = ['__proto__', 'constructor', 'prototype'];

/**
 * @param {string} key - The key to check.
 * @returns {boolean} - Whether the key may be used to pollute the prototype chain.
 */
function isUnsafeKey(key: string): boolean {
  return UNSAFE_KEYS.includes(key);
}

export {isUnsafeKey};
