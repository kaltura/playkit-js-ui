// @flow
/**
 * This function is built in order to limit the amount of times a function is called in a certain time frame
 * @param {Component} origFunc - the original function to be called
 * @param {Function} time - the time frame to allow only one function call
 * @param {boolean} immediate - trigger the function on the leading edge, instead of the trailing
 * @returns {Function} the wrapped debounce function
 * @example
 * this.props.eventManager.listen(
 *  window,
 *  'resize',
 *  debounce(e => {
 *    this._onWindowResize(e);
 *  }, ON_WINDOW_RESIZE_DEBOUNCE_DELAY)
 * );
 */
export const debounce = (origFunc: (...args: any) => any, time: number, immediate: boolean = true) => {
  let timeout;

  return (...args) => {
    const context = this;
    if (immediate && !timeout) {
      origFunc.apply(context, args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) {
        origFunc.apply(context, args);
      }
    }, time);
  };
};
