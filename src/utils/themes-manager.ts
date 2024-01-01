import {hexToHsl, hslToHex} from './color-format-convertors';
import style from '../styles/style.scss';
import {UserTheme} from '../types';

const PREFIX = 'playkit';
const ACTUAL_USED_CSS_VAR = `--${PREFIX}-{name}-color`;
const HSL_HUE_CSS_VAR = `--${PREFIX}-{name}-hsl-hue`;
const HSL_SATURATION_CSS_VAR = `--${PREFIX}-{name}-hsl-saturation`;
const HSL_LIGHTNESS_CSS_VAR = `--${PREFIX}-{name}-hsl-lightness`;

const cssVarNames = {
  colors: {
    live: '--playkit-live-color',
    playerBackground: '--playkit-player-background-color',
    paper: '--playkit-paper-color',
    tone1: '--playkit-tone-1-color'
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

const TEXT_CONTRAST_SUFFIX = 'text-contrast';

// eslint-disable-next-line require-jsdoc
export class ThemesManager {
  private player: any;
  private readonly config?: UserTheme;
  private playerContainerElement: HTMLElement;

  // eslint-disable-next-line require-jsdoc
  constructor(player: any, config: UserTheme | undefined, targetId: string) {
    this.player = player;
    this.config = config;
    this.playerContainerElement = document.querySelector<HTMLDivElement>(`#${targetId}`)!;
  }

  /**
   * Apply the user theme from config (should be called only after the UI was build and the css vars are exist in the DOM).
   * @returns {void}
   */
  public applyUserTheme(): void {
    if (this.config) {
      this.setColors(this.config);
    }
  }

  /**
   * Makes color value for text.
   * @param {string} inputColor  - css color in HEX format
   * @returns {string} hex  - css color in HEX format
   */
  private makeTextContrastColor(inputColor: string): string {
    const hsl = hexToHsl(inputColor);
    const hue = hsl[0];
    const saturation = hsl[1];
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
  private setColors(config: UserTheme): void {
    if (config.colors.primary) {
      this.setSvgFillColor(config.colors.primary);
    }

    for (const color in config.colors) {
      if (ACCENT_AND_ACKNOWLEDGEMENT_COLORS.includes(color)) {
        const colorValue = config.colors[color];
        this.setAccentOrAcknowledgementColor(`${color}-${TEXT_CONTRAST_SUFFIX}`, this.makeTextContrastColor(colorValue));
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
  private setAccentOrAcknowledgementColor(colorTitle: string, color: string): void {
    const [hue, saturation, lightness] = hexToHsl(color);
    this.setCSSVariable(ACTUAL_USED_CSS_VAR.replace('{name}', colorTitle), color);
    this.setCSSVariable(HSL_HUE_CSS_VAR.replace('{name}', colorTitle), `${Math.round(hue)}deg`);
    this.setCSSVariable(HSL_SATURATION_CSS_VAR.replace('{name}', colorTitle), `${Math.round(saturation)}%`);
    this.setCSSVariable(HSL_LIGHTNESS_CSS_VAR.replace('{name}', colorTitle), `${Math.round(lightness)}%`);
  }

  /**
   * Override the specified css var value.
   * @param {string} cssVarName -
   * @param {string} color  -
   * @returns {void}
   */
  private setColor(cssVarName: string, color: string): void {
    this.setCSSVariable(cssVarName, color);
  }

  /**
   * Update the SVG url (of dynamic SVGs) with the new primary color.
   * @param {string} color  -
   * @returns {void}
   */
  private setSvgFillColor(color: string): void {
    for (const varName of dynamicColoredIconsSvgUrlVars) {
      // $FlowFixMe
      const svgUrl = this.getCSSVariable(varName);
      const newColor = color.replace('#', '%23');
      this.setCSSVariable(varName, svgUrl.replace(/fill='%23([a-f0-9]{3}){1,2}\b'/, `fill='${newColor}'`));
    }
  }

  /**
   * Return a css variable value
   * @param {string} variableName - CSS variable name
   * @returns {string} CSS variable value
   */
  public getCSSVariable(variableName: string): string {
    return (
      getComputedStyle(this.playerContainerElement.querySelector<HTMLDivElement>(`.${style.player}`) as HTMLDivElement).getPropertyValue(
        variableName
      ) || ''
    );
  }

  /**
   * Return a css variable name
   * @param {string} variableName - CSS variable name
   * @param {string} value - CSS variable value
   * @returns {void}
   */
  public setCSSVariable(variableName: string, value: string): void {
    const playkitPlayerElement = this.playerContainerElement.querySelector<HTMLDivElement>(`.${style.player}`)!;
    const playkitPlayerElementStyle = playkitPlayerElement.style;

    playkitPlayerElementStyle.setProperty(variableName, value);
  }
}
