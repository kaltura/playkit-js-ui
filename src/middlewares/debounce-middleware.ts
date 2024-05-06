import {types as shell} from '../reducers/shell';

let timeoutId: any = null;
let lastAction: any = null;
const UPDATE_IS_SMALL_SIZE_TIMEOUT: number = 150;

/**
 * The debounce middleware.
 * debounce actions if needed.
 * @returns {void}
 */
const debounceMiddleware =
  () =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (store: any) =>
  (next: (...args: any) => any) =>
  (action: any): void => {
    switch (action.type) {
      case shell.UPDATE_IS_SMALL_SIZE:
        lastAction = action;
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          timeoutId = null;
          next(lastAction);
        }, UPDATE_IS_SMALL_SIZE_TIMEOUT);
        break;

      default:
        next(action);
        break;
    }
  };

export {debounceMiddleware};
