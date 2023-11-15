// import {bindActionCreators} from 'redux';
//
// /**
//  * Binding redux actions to props utility
//  *
//  * @export
//  * @param {Array<any>} actions redux actions
//  * @returns {Function} function
//  */
// export function bindActions(actions: any) {
//   return dispatch => ({
//     ...bindActionCreators<any, any>(actions, dispatch)
//   });
// }
import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux';

/**
 * Binding redux actions to props utility
 *
 * @export
 * @param {ActionCreatorsMapObject} actions - Redux action creators
 * @returns {(dispatch: Dispatch) => ActionCreatorsMapObject} - Function that takes dispatch and returns bound action creators
 */
export function bindActions<A, M extends ActionCreatorsMapObject<A>>(actions: M): (dispatch: Dispatch) => M {
  return (dispatch: Dispatch): M => bindActionCreators<A, M>(actions, dispatch);
}

