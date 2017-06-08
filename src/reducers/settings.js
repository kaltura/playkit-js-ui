//@flow

export const types = {
  UPDATE_QUALITY: 'settings/UPDATE_QUALITY',
  UPDATE_SPEED: 'settings/UPDATE_SPEED'
}

export const initialState = {
  quality: 'auto',
  speed: 'normal'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_QUALITY:
      return {
        ...state,
        quality: action.quality
      }

    case types.UPDATE_SPEED:
      return {
        ...state,
        speed: action.speed
      }

    default:
      return state;
  }
}

export const actions = {
  updateQuality: (quality: string) => ({ type: types.UPDATE_QUALITY, quality }),
  updateSpeed: (speed: string) => ({ type: types.UPDATE_SPEED, speed })
}
