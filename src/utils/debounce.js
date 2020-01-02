// @flow
/**
 * This function is built in order to limit the amount of times a function is called in a certain time frame
 * @param {Component} origFunc - the original function to be called
 * @param {Function} time - the time frame to allow only one function call
 * @returns {Function} the wrapped debounce function
 */
export const debounce: Function = (origFunc: Function, time: number) => {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      origFunc.apply(this, args);
    }, time);
  };
};
