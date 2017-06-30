//@flow
import { bindActionCreators } from 'redux';

export function bindActions(actions: Array<any>): Function {
	return dispatch => ({
		...bindActionCreators(actions, dispatch)
	});
}
