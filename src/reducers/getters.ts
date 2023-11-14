// @flow

/**
 * @param {Object} state - state.
 * @returns {boolean} - Whether the player is playing ad or content.
 */
export const isPlayingAdOrPlayback = (state: any) => {
  return (state.adBreak && state.adIsPlaying) || (!state.adBreak && state.isPlaying);
};
