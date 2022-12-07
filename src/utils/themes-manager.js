//@flow

import {hexToHsl} from './color-format-convertors';
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

  // eslint-disable-next-line require-jsdoc
  applyUserTheme(): void {
    if (this.config) {
      this.setColors(this.config);
    }
  }

  // eslint-disable-next-line require-jsdoc
  getHueComponent(hex: string): number {
    const hsl = hexToHsl(hex);
    return hsl[0];
  }

  // eslint-disable-next-line require-jsdoc
  setColors(config: ThemesManagerConfig): void {
    if (config.colors.primary) {
      // this.setColor(cssVarNames.colors.primary, config.colors.primary);
      this.setSvgFillColor(config.colors.primary);
    }

    for (const color in config.colors) {
      this.setColor(cssVarNames.colors[color], config.colors[color]);
    }
  }

  // eslint-disable-next-line require-jsdoc
  setColor(cssVarName: string, color: string): void {
    const hue = this.getHueComponent(color);
    document.querySelector<HTMLElement>('.playkit-player').style.setProperty(cssVarName, `${hue}deg`);
  }

  // eslint-disable-next-line require-jsdoc
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
