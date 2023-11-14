// @ts-nocheck
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
  let seconds = 0;
  let multiplier = 1;

  for (let i = parts.length - 1; i >= 0; i--) {
    const currentValue = parseInt(parts[i]);
    if (isNaN(currentValue) || currentValue > 59) {
      seconds = 0;
      break;
    }
    seconds += currentValue * multiplier;
    multiplier *= 60;
  }

  return seconds;
}

/**
 * Formatting input that has only numbers to valid time (hh:mm:ss), i.e. 1 to 00:01
 *
 * @param {string} val - the value to format
 * @returns {string} the formatted value
 */
function formatOnlyNumbersInput(val: string): string {
  const valueAsNumber = parseInt(val);
  if (valueAsNumber < 10) {
    return '00:0' + val;
  }
  if (valueAsNumber <= 59) {
    return '00:' + val;
  }
  // treat as seconds and convert to time format
  return toHHMMSS(valueAsNumber);
}

export {toHHMMSS, toSecondsFromHHMMSS, formatOnlyNumbersInput};
