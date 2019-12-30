//@flow

export const types = {
  UPDATE_KEYBOARD_ENABLE: 'keyboard/UPDATE_KEYBOARD_ENABLE',
  UPDATE_PRIORITY_COMPONENT: 'keyboard/UPDATE_PRIORITY_COMPONENT'
};

export const initialState = {
  isKeyboardEnable: false,
  priorityComponent: null
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_KEYBOARD_ENABLE:
      return {
        ...state,
        isKeyboardEnable: action.isEnable
      };
    case types.UPDATE_PRIORITY_COMPONENT:
      return {
        ...state,
        priorityComponent: action.component
      };

    default:
      return state;
  }
};

export const actions = {
  updateKeyboardEnable: (isEnable: boolean) => ({type: types.UPDATE_KEYBOARD_ENABLE, isEnable}),
  updatePriorityComponent: (component: string) => ({type: types.UPDATE_PRIORITY_COMPONENT, component})
};
