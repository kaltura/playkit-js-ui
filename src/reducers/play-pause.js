//@flow
export const types = {
  TOGGLE_PLAY: 'play-pause/TOGGLE_PLAY'
};

export const initialState = {
  isPlaying: false
};

export default (state: Object = initialState, action: Object) => {
  switch (action.type) {
    case types.TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: action.isPlaying
      };

    default:
      return state;
  }
}

export const actions = {
  toggleIsPlaying: (isPlaying: boolean) => ({type: types.TOGGLE_PLAY, isPlaying})
};
