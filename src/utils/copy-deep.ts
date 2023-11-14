/**
 * @param {any} data - The data to copy.
 * @returns {any} - The copied data.
 */
function copyDeep(data: any): any {
  let node;
  if (Array.isArray(data)) {
    node = data.length > 0 ? data.slice(0) : [];
    node.forEach((e, i) => {
      if ((typeof e === 'object') || (Array.isArray(e) && e.length > 0)) {
        node[i] = copyDeep(e);
      }
    });
  } else if (typeof data === 'object') {
    node = Object.assign({}, data);
    Object.keys(node).forEach(key => {
      if ((typeof node[key] === 'object') || (Array.isArray(node[key]) && node[key].length > 0)) {
        node[key] = copyDeep(node[key]);
      }
    });
  } else {
    node = data;
  }
  return node;
}

export {copyDeep};
