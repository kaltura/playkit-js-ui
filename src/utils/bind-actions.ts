import {bindActionCreators, Dispatch, ActionCreatorsMapObject} from 'redux';

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
