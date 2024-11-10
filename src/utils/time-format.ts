/**
 * Formatting seconds input into time format
 *
 * @param {number} input number of seconds
 * @returns {string} formatted time string
 */
function toHHMMSS(input: string | number): string {
  const secNum = parseInt(input as string, 10);
  const hours: number = Math.floor(secNum / 3600);
  const minutes: number = Math.floor((secNum - hours * 3600) / 60);
  const seconds: number = secNum - hours * 3600 - minutes * 60;

  let hoursFormat = hours as unknown as string;
  let minutesFormat = minutes as unknown as string;
  let secondsFormat = seconds as unknown as string;

  if (hours < 10) {
    hoursFormat = '0' + hours;
  }
  if (minutes < 10) {
    minutesFormat = '0' + minutes;
  }
  if (seconds < 10) {
    secondsFormat = '0' + seconds;
  }

  return `${hoursFormat !== '00' ? hoursFormat + ':' : ''}${minutesFormat}:${secondsFormat}`;
}

/**
 * Convert seconds into hours, minutes and seconds
 *
 * @param {number} input number of seconds
 * @returns {Array} array with hours, minutes and seconds
 */
function convertToHMS(input: string | number): Array<number> {
  const secNum = parseInt(input as string, 10);
  const hours: number = Math.floor(secNum / 3600);
  const minutes: number = Math.floor((secNum - hours * 3600) / 60);
  const seconds: number = secNum - hours * 3600 - minutes * 60;
  const times = [hours, minutes, seconds];

  return times;
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

export {toHHMMSS, convertToHMS, toSecondsFromHHMMSS, formatOnlyNumbersInput};
