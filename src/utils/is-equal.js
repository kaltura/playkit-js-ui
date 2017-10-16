//@flow

/**
 * Shallow comparison of two objects
 *
 * @param {Object} objA object A
 * @param {Object} objB object B
 * @returns {boolean} objects equal or not
 */
function isEqual(objA: Object, objB: Object): boolean {
  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (let i = 0; i < keysA.length; i++) {
    if (objA[keysA[i]] !== objB[keysA[i]]) {
      return false;
    }
  }

  return true;
}

export default isEqual;
