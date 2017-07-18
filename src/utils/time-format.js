//@flow

function toHHMMSS(input: number) {
  var sec_num = parseInt(input, 10);
  var hours   = Math.floor(sec_num / 3600);
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);

  if (hours   < 10) {hours   = '0'+hours;}
  if (minutes < 10) {minutes = '0'+minutes;}
  if (seconds < 10) {seconds = '0'+seconds;}

  return `${hours !== '00' ? hours + ':' : ''}${minutes}:${seconds}`;
}

function toSecondsFromHHMMSS(input: string) {
  var parts = input.split(':');
  var seconds = 0;
  if (parts.length === 2) {
    if (parseInt(parts[0]) > 59 || parseInt(parts[1]) > 59) {
      return 0;
    }
    seconds += parseInt(parts[0]) * 60;
    seconds += parseInt(parts[1]);
  }
  return seconds;
}

export {toHHMMSS, toSecondsFromHHMMSS};
