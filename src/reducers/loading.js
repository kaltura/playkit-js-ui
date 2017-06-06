//@flow

export const types = {
  UPDATE_LOADING_SPINNER_STATE: 'loading/UPDATE_LOADING_SPINNER_STATE'
}

export const initialState = {
  showLoadingSpinner: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_LOADING_SPINNER_STATE:
      return {
        ...state,
        show: action.show
      }

    default:
      return state;
  }
}

export const actions = {
  updateLoadingSpinnerState: (show: boolean) => ({ type: types.UPDATE_LOADING_SPINNER_STATE, show })
}
