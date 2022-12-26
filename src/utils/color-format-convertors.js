// These color convertors based on https://www.npmjs.com/package/color-convert
/**
 * Convert css color form HEX to RGB format.
 * @param {string} args  - css color in HEX format
 * @returns {string} - css color in RGB format
 */
export function hexToRgb(args) {
  const match = args.toString().match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
  if (!match) {
    return [0, 0, 0];
  }

  let colorString = match[0];

  if (match[0].length === 3) {
    colorString = colorString
      .split('')
      .map(char => {
        return char + char;
      })
      .join('');
  }

  const integer = parseInt(colorString, 16);
  const r = (integer >> 16) & 0xff;
  const g = (integer >> 8) & 0xff;
  const b = integer & 0xff;

  return [r, g, b];
}

/**
 * Convert css color form RGB to HSL format.
 * @param {string} rgb  - css color in RGB format
 * @returns {string} - css color in HSL format
 */
export function rgbToHsl(rgb) {
  const r = rgb[0] / 255;
  const g = rgb[1] / 255;
  const b = rgb[2] / 255;
  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);
  const delta = max - min;
  let h;
  let s;

  if (max === min) {
    h = 0;
  } else if (r === max) {
    h = (g - b) / delta;
  } else if (g === max) {
    h = 2 + (b - r) / delta;
  } else if (b === max) {
    h = 4 + (r - g) / delta;
  }

  h = Math.min(h * 60, 360);

  if (h < 0) {
    h += 360;
  }

  const l = (min + max) / 2;

  if (max === min) {
    s = 0;
  } else if (l <= 0.5) {
    s = delta / (max + min);
  } else {
    s = delta / (2 - max - min);
  }

  return [h, s * 100, l * 100];
}

/**
 * Convert css color form HEX to HSL format.
 * @param {string} hex  - css color in HEX format
 * @returns {string} - css color in HSL format
 */
function hexToHsl(hex) {
  return rgbToHsl(hexToRgb(hex));
}

/**
 * Extract the Hue parameter from HSL color format.
 * @param {string} hex  - css color in HEX format
 * @returns {void}
 */
export function getHueComponentOfHEXColorFormat(hex) {
  const hsl = hexToHsl(hex);
  return hsl[0];
}
