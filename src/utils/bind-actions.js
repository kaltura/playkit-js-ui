//@flow
import {bindActionCreators} from 'redux';

/**
 * Binding redux actions to props utility
 *
 * @export
 * @param {Array<any>} actions redux actions
 * @returns {Function} function
 */
export function bindActions(actions: Array<any>): Function {
  return dispatch => ({
    ...bindActionCreators(actions, dispatch)
  });
}
