import {bindActionCreators} from 'redux';

/**
 * Binding redux actions to props utility
 *
 * @export
 * @param {Array<any>} actions redux actions
 * @returns {Function} function
 */
export function bindActions(actions: any[]): Function {
  return dispatch => ({
    ...bindActionCreators<any[], any>(actions, dispatch)
  });
}
