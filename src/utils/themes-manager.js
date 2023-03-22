//@flow

import {hexToHsl} from './color-format-convertors';
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

// eslint-disable-next-line require-jsdoc
export class ThemesManager {
  player: Object;
  config: Object;

  // eslint-disable-next-line require-jsdoc
  constructor(player: Object, config: ?UserTheme) {
    this.player = player;
    this.config = config;
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
        this.setAccentOrAcknowledgementColor(color, config.colors[color]);
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
    document.querySelector(`.${style.player}`)?.style.setProperty(ACTUAL_USED_CSS_VAR.replace('{name}', colorTitle), color);
    document.querySelector(`.${style.player}`)?.style.setProperty(HSL_HUE_CSS_VAR.replace('{name}', colorTitle), `${Math.round(hue)}deg`);
    document.querySelector(`.${style.player}`)?.style.setProperty(HSL_SATURATION_CSS_VAR.replace('{name}', colorTitle), `${Math.round(saturation)}%`);
    document.querySelector(`.${style.player}`)?.style.setProperty(HSL_LIGHTNESS_CSS_VAR.replace('{name}', colorTitle), `${Math.round(lightness)}%`);
  }

  /**
   * Override the specified css var value.
   * @param {string} cssVarName -
   * @param {string} color  -
   * @returns {void}
   */
  setColor(cssVarName: string, color: string): void {
    document.querySelector(`.${style.player}`)?.style.setProperty(cssVarName, color);
  }

  /**
   * Update the SVG url (of dynamic SVGs) with the new primary color.
   * @param {string} color  -
   * @returns {void}
   */
  setSvgFillColor(color: string): void {
    for (const varName of dynamicColoredIconsSvgUrlVars) {
      // $FlowFixMe
      const svgUrl = getComputedStyle(document.querySelector(`.${style.player}`))?.getPropertyValue(varName);
      const newColor = color.replace('#', '%23');
      document.querySelector(`.${style.player}`)?.style.setProperty(varName, svgUrl.replace(/fill='%23([a-f0-9]{3}){1,2}\b'/, `fill='${newColor}'`));
    }
  }
}
