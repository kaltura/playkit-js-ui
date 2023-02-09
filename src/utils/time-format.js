//@flow

/**
 * Formatting seconds input into time format
 *
 * @param {number} input number of seconds
 * @returns {string} formatted time string
 */
function toHHMMSS(input: number): string {
  const sec_num = parseInt(input, 10);
  let hours = Math.floor(sec_num / 3600);
  let minutes = Math.floor((sec_num - hours * 3600) / 60);
  let seconds = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }

  return `${hours !== '00' ? hours + ':' : ''}${minutes}:${seconds}`;
}

/**
 * Converting formatted time into seconds
 *
 * @param {string} input formatted time
 * @returns {number} number of seconds
 */
function toSecondsFromHHMMSS(input: string): number {
  const parts = input.split(':');
  if (parts.length === 2) {
    return _toSecondsFromArray(parts, false);
  }
  if (parts.length === 3) {
    return _toSecondsFromArray(parts, true);
  }

  return 0;
}

/**
 * Handling the time parts array
 *
 * @param {Array<string>} parts the array
 * @param {boolean} hasHours whether the parts array contains hours or not
 * @returns {number} number of seconds
 * @private
 */
function _toSecondsFromArray(parts: Array<string>, hasHours: boolean): number {
  const minutesIndex = hasHours ? 1 : 0;
  const secondsIndex = minutesIndex + 1;
  let seconds = 0;

  const minutesPart = parseInt(parts[minutesIndex]);
  const secondsPart = parseInt(parts[secondsIndex]);

  if (isNaN(minutesPart) || minutesPart > 59 || isNaN(secondsPart) || secondsPart > 59) {
    return 0;
  }
  if (hasHours && !isNaN(parseInt(parts[0]))) {
    seconds += parseInt(parts[0]) * 3600;
  }
  seconds += minutesPart * 60;
  seconds += secondsPart;
  return seconds;
}

/**
 * Converting an input that represents seconds to valid time format (hh:mm:ss), i.e. 62 to 01:02
 *
 * @param {string} valInSeconds - the value in seconds to format
 * @returns {string} the formatted value
 */
function convertSecondsToTimeFormat(valInSeconds: string): string {
  const res = new Date(parseInt(valInSeconds) * 1000).toISOString().substr(11, 8);
  if (res.slice(0, 3) === '00:') {
    // check if we need to cut the hours part
    return res.substr(3, 5);
  }
  return res;
}

/**
 * Formatting input that has only numbers to valid time (hh:mm:ss), i.e. 1 to 00:01
 *
 * @param {string} val - the value to format
 * @returns {string} the formatted value
 */
function formatOnlyNumbersInput(val: string): string {
  if (val.length === 1) {
    return '00:0' + val;
  }
  if (val.length === 2 && parseInt(val) <= 59) {
    return '00:' + val;
  }
  // treat as seconds and convert to time
  return convertSecondsToTimeFormat(val);
}

/**
 * Checking whether the value parameter contains only numbers or not
 *
 * @param {any} value - the value to check
 * @returns {boolean} whether the value parameter contains only numbers or not
 */
function hasOnlyNumbers(value: any): boolean {
  if (typeof value === 'string') {
    return /^\d+$/.test(value);
  }
  return false;
}

export {toHHMMSS, toSecondsFromHHMMSS, formatOnlyNumbersInput, convertSecondsToTimeFormat, hasOnlyNumbers};
