//@flow

import {Utils} from 'playkit-js';

export const types = {
  UPDATE: 'config/UPDATE',
  UPDATE_COMPONENT: 'config/UPDATE_COMPONENT',
  RESET: 'config/RESET',
  SET_SESSION_ID: 'config/SET_SESSION_ID'
}

export const initialState = {
  ui: {
    seekbar: {}
  }
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE:
      var config = Utils.Object.mergeDeep(state, action.config);
      return {
        ...state,
        ...config
      }

    case types.UPDATE_COMPONENT:
      return {
        ...state,
        ui: {
          ...state.ui,
          [action.componentAlias]: Utils.Object.mergeDeep(state.ui[action.componentAlias], action.config)
        }
      }

    case types.SET_SESSION_ID:
      return{
        ...state,
        sessionId: action.sessionId
      }

    default:
      return state;
  }
}

export const actions = {
  updateConfig: (config: Object) => ({ type: types.UPDATE, config }),
  updateComponentConfig: (componentAlias: string, config: Object) => ({ type: types.UPDATE_COMPONENT, componentAlias, config }),
  setSessionId: (sessionId: string) => ({type: types.SET_SESSION_ID, sessionId})
}
