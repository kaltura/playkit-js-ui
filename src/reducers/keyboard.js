//@flow

export const types = {
  UPDATE_KEYBOARD_ENABLE: 'keyboard/UPDATE_KEYBOARD_ENABLE'
};

export const initialState = {
  isKeyboardEnable: true
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.UPDATE_KEYBOARD_ENABLE:
      return {
        ...state,
        isKeyboardEnable: action.isEnable
      };

    default:
      return state;
  }
};

export const actions = {
  updateKeyboardEnable: (isEnable: boolean) => ({type: types.UPDATE_KEYBOARD_ENABLE, isEnable})
};
