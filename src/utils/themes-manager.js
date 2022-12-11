//@flow

import {getHueComponentOfHEXColorFormat} from './color-format-convertors';
import {style} from '../index';

const cssVarNames: ThemesManagerConfig = {
  colors: {
    primary: '--playkit-primary-hsl-hue',
    secondary: '--playkit-secondary-hsl-hue',
    success: '--playkit-success-hsl-hue',
    danger: '--playkit-danger-hsl-hue',
    warning: '--playkit-warning-hsl-hue',
    live: '--playkit-live-color',
    playerBackground: '--playkit-player-background-color'
  }
};

const dynamicColoredIconsSvgUrlVars = [
  '--playkit-icon-check-active-url',
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
  constructor(player: Object, config: UserTheme) {
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
   * @param {ThemesManagerConfig} config  -
   * @returns {void}
   */
  setColors(config: ThemesManagerConfig): void {
    if (config.colors.primary) {
      this.setSvgFillColor(config.colors.primary);
    }

    for (const color in config.colors) {
      this.setColor(cssVarNames.colors[color], config.colors[color]);
    }
  }

  /**
   * Override the specified css var value.
   * @param {string} cssVarName -
   * @param {string} color  -
   * @returns {void}
   */
  setColor(cssVarName: string, color: string): void {
    const hue = getHueComponentOfHEXColorFormat(color);
    document.querySelector<HTMLElement>(`.${style.player}`).style.setProperty(cssVarName, `${hue}deg`);
  }

  /**
   * Update the SVG url (of dynamic SVGs) with the new primary color.
   * @param {string} color  -
   * @returns {void}
   */
  setSvgFillColor(color: string): void {
    for (const varName of dynamicColoredIconsSvgUrlVars) {
      const svgUrl = getComputedStyle(document.querySelector(`.${style.player}`)).getPropertyValue(varName);
      const newColor = color.replace('#', '%23');
      document
        .querySelector<HTMLElement>(`.${style.player}`)
        .style.setProperty(varName, svgUrl.replace(/fill='%23([a-f0-9]{3}){1,2}\b'/, `fill='${newColor}'`));
    }
  }
}
