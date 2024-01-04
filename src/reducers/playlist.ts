/* eslint-disable  @typescript-eslint/explicit-function-return-type */
import { PlaylistState } from '../types/reducers/playlist';

export const types = {
  UPDATE_PLAYLIST_COUNTDOWN_CANCELED: 'playlist-countdown/UPDATE_PLAYLIST_COUNTDOWN_CANCELED'
};

export const initialState = {
  countdownCanceled: false
};

export default (state: PlaylistState = initialState, action: any) => {
  switch (action.type) {
  case types.UPDATE_PLAYLIST_COUNTDOWN_CANCELED:
    return {
      ...state,
      countdownCanceled: action.countdownCanceled
    };

  default:
    return state;
  }
};

export const actions = {
  updatePlaylistCountdownCanceled: (countdownCanceled: boolean) => ({
    type: types.UPDATE_PLAYLIST_COUNTDOWN_CANCELED,
    countdownCanceled
  })
};
