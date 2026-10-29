/**
 * whether the playlist countdown timeToShow is configured, as a number or a numeric string (e.g. from a uiConf)
 * @param {*} timeToShow - the playlist.countdown.timeToShow config value
 * @returns {boolean} - is configured
 */
const hasTimeToShow = (timeToShow: unknown): boolean => {
  return timeToShow !== undefined && timeToShow !== null && timeToShow !== '' && Number.isFinite(Number(timeToShow));
};

export {hasTimeToShow};
