/**
 * @param {any} item - The item to check.
 * @returns {boolean} - Whether the item is an object.
 */
function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * @param {any} target - The target object.
 * @param {any} sources - The objects to merge.
 * @returns {Object} - The merged object.
 */
function mergeDeep(target: any, ...sources: any): any {
  if (!sources.length) {
    return target;
  }
  const source = sources.shift();
  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {[key]: {}});
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {[key]: source[key]});
      }
    }
  }
  return mergeDeep(target, ...sources);
}

export {mergeDeep, isObject};
