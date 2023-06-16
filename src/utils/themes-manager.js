//@flow

import {hexToHsl, hslToHex} from './color-format-convertors';
import {style} from '../index';

const PREFIX = 'playkit';
const ACTUAL_USED_CSS_VAR = `--${PREFIX}-{name}-color`;
const HSL_HUE_CSS_VAR = `--${PREFIX}-{name}-hsl-hue`;
const HSL_SATURATION_CSS_VAR = `--${PREFIX}-{name}-hsl-saturation`;
const HSL_LIGHTNESS_CSS_VAR = `--${PREFIX}-{name}-hsl-lightness`;

const cssVarNames = {
  colors: {
    live: '--playkit-live-color',
    playerBackground: '--playkit-player-background-color'
  }
};

const ACCENT_AND_ACKNOWLEDGEMENT_COLORS = ['primary', 'secondary', 'success', 'danger', 'warning'];

const dynamicColoredIconsSvgUrlVars = [
  '--playkit-icon-data-url',
  '--playkit-icon-chromecast-url',
  '--playkit-icon-quality-HD-active-url',
  '--playkit-icon-quality-4K-active-url',
  '--playkit-icon-quality-8K-active-url'
];

const textContrastSuffix = 'text-contrast';

// eslint-disable-next-line require-jsdoc
export class ThemesManager {
  player: Object;
  config: Object;
  playerContainerElement: HTMLElement | null;

  // eslint-disable-next-line require-jsdoc
  constructor(player: Object, config: ?UserTheme, targetId: string) {
    this.player = player;
    this.config = config;
    this.playerContainerElement = document.querySelector(`#${targetId}`);
  }

  /**
   * Apply the user theme from config (should be called only after the UI was build and the css vars are exist in the DOM).
   * @returns {void}
   */
  applyUserTheme(): void {
    if (this.config) {
      this.setColors(this.config);
    }
  }

  /**
   * Makes color value for text.
   * @param {string} inputColor  - css color in HEX format
   * @returns {string} hex  - css color in HEX format
   */
  makeTextContrastColor(inputColor: string) {
    const hsl = hexToHsl(inputColor);
    let hue = hsl[0];
    let saturation = hsl[1];
    let lightness = hsl[2];

    if (hue < 30 || hue > 205) {
      if (lightness < 70) {
        lightness = 100;
      } else {
        lightness = 0;
      }
    }
    if (hue > 30 && hue < 205) {
      if (lightness < 40) {
        lightness = 100;
      } else {
        lightness = 0;
      }
    }
    return hslToHex(hue, saturation, lightness);
  }

  /**
   * Override the colors from config.
   * @param {UserTheme} config  -
   * @returns {void}
   */
  setColors(config: UserTheme): void {
    if (config.colors.primary) {
      this.setSvgFillColor(config.colors.primary);
    }

    for (const color in config.colors) {
      if (ACCENT_AND_ACKNOWLEDGEMENT_COLORS.includes(color)) {
        const colorValue = config.colors[color];
        this.setAccentOrAcknowledgementColor(`${color}-${textContrastSuffix}`, this.makeTextContrastColor(colorValue));
        this.setAccentOrAcknowledgementColor(color, colorValue);
      } else {
        this.setColor(cssVarNames.colors[color], config.colors[color]);
      }
    }
  }

  /**
   * Override the specified css var value.
   * @param {string} colorTitle -
   * @param {string} color  -
   * @returns {void}
   */
  setAccentOrAcknowledgementColor(colorTitle: string, color: string): void {
    const [hue, saturation, lightness] = hexToHsl(color);
    this.playerContainerElement?.querySelector(`.${style.player}`)?.style.setProperty(ACTUAL_USED_CSS_VAR.replace('{name}', colorTitle), color);
    this.playerContainerElement
      ?.querySelector(`.${style.player}`)
      ?.style.setProperty(HSL_HUE_CSS_VAR.replace('{name}', colorTitle), `${Math.round(hue)}deg`);
    this.playerContainerElement
      ?.querySelector(`.${style.player}`)
      ?.style.setProperty(HSL_SATURATION_CSS_VAR.replace('{name}', colorTitle), `${Math.round(saturation)}%`);
    this.playerContainerElement
      ?.querySelector(`.${style.player}`)
      ?.style.setProperty(HSL_LIGHTNESS_CSS_VAR.replace('{name}', colorTitle), `${Math.round(lightness)}%`);
  }

  /**
   * Override the specified css var value.
   * @param {string} cssVarName -
   * @param {string} color  -
   * @returns {void}
   */
  setColor(cssVarName: string, color: string): void {
    this.playerContainerElement?.querySelector(`.${style.player}`)?.style.setProperty(cssVarName, color);
  }

  /**
   * Update the SVG url (of dynamic SVGs) with the new primary color.
   * @param {string} color  -
   * @returns {void}
   */
  setSvgFillColor(color: string): void {
    for (const varName of dynamicColoredIconsSvgUrlVars) {
      // $FlowFixMe
      const svgUrl = getComputedStyle(this.playerContainerElement?.querySelector(`.${style.player}`)).getPropertyValue(varName);
      const newColor = color.replace('#', '%23');
      this.playerContainerElement
        ?.querySelector(`.${style.player}`)
        ?.style.setProperty(varName, svgUrl.replace(/fill='%23([a-f0-9]{3}){1,2}\b'/, `fill='${newColor}'`));
    }
  }
}
