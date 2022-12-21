
# Customize the player colors

in order to override the player default colors you can pass your own color (in HEX color format!) in the `ui` section in player config

> This guide assumes you are using the [Kaltura Player]

[kaltura player]: https://github.com/kaltura/kaltura-player-js/

### Example
```js
const config = {
  targetId: 'player-placeholder',
  provider: {
    partnerId: 1234567,
  },
  ui: {
    userTheme: {
      colors: {
        primary: '#da3633',
        secondary: '#c4da33'
      }
    }
  }
}

const player = KalturaPlayer.setup(config);
```
> Note: only HEX color format is excepted

[See here for full configuration options](https://github.com/kaltura/playkit-js-ui/tree/master/flow-typed/types/user-theme.js)

  <style>
    :root {
      --playkit-primary-hsl-hue: 215deg;
      --playkit-secondary-hsl-hue: 40deg;
      --playkit-success-hsl-hue: 136deg;
      --playkit-danger-hsl-hue: 355deg;
      --playkit-warning-hsl-hue: 21deg;
      --playkit-hsl-saturation: 100%;
      --playkit-hsl-lightness: 50%;
      --playkit-primary-color: hsl(var(--playkit-primary-hsl-hue) var(--playkit-hsl-saturation) var(--playkit-hsl-lightness));
      --playkit-primary-darker-color: hsl(var(--playkit-primary-hsl-hue) var(--playkit-hsl-saturation) calc(var(--playkit-hsl-lightness) - 15%));
      --playkit-primary-brighter-color: hsl(var(--playkit-primary-hsl-hue) var(--playkit-hsl-saturation) calc(var(--playkit-hsl-lightness) + 15%));
      --playkit-primary-text-contrast-color: #ffffff;
      --playkit-secondary-color: hsl(var(--playkit-secondary-hsl-hue) var(--playkit-hsl-saturation) var(--playkit-hsl-lightness));
      --playkit-secondary-darker-color: hsl(var(--playkit-secondary-hsl-hue) var(--playkit-hsl-saturation) calc(var(--playkit-hsl-lightness) - 15%));
      --playkit-secondary-brighter-color: hsl(var(--playkit-secondary-hsl-hue) var(--playkit-hsl-saturation) calc(var(--playkit-hsl-lightness) + 15%));
      --playkit-secondary-text-contrast-color: #ffffff;
      --playkit-success-color: hsl(var(--playkit-success-hsl-hue) var(--playkit-hsl-saturation) var(--playkit-hsl-lightness));
      --playkit-success-darker-color: hsl(var(--playkit-success-hsl-hue) var(--playkit-hsl-saturation) calc(var(--playkit-hsl-lightness) - 15%));
      --playkit-success-brighter-color: hsl(var(--playkit-success-hsl-hue) var(--playkit-hsl-saturation) calc(var(--playkit-hsl-lightness) + 15%));
      --playkit-success-text-contrast-color: #ffffff;
      --playkit-danger-color: hsl(var(--playkit-danger-hsl-hue) var(--playkit-hsl-saturation) var(--playkit-hsl-lightness));
      --playkit-danger-darker-color: hsl(var(--playkit-danger-hsl-hue) var(--playkit-hsl-saturation) calc(var(--playkit-hsl-lightness) - 15%));
      --playkit-danger-brighter-color: hsl(var(--playkit-danger-hsl-hue) var(--playkit-hsl-saturation) calc(var(--playkit-hsl-lightness) + 15%));
      --playkit-danger-text-contrast-color: #ffffff;
      --playkit-warning-color: hsl(var(--playkit-warning-hsl-hue) var(--playkit-hsl-saturation) var(--playkit-hsl-lightness));
      --playkit-warning-darker-color: hsl(var(--playkit-warning-hsl-hue) var(--playkit-hsl-saturation) calc(var(--playkit-hsl-lightness) - 15%));
      --playkit-warning-brighter-color: hsl(var(--playkit-warning-hsl-hue) var(--playkit-hsl-saturation) calc(var(--playkit-hsl-lightness) + 15%));
      --playkit-warning-text-contrast-color: #ffffff;
      --playkit-tone-1-color: #ffffff;
      --playkit-tone-2-color: #cccccc;
      --playkit-tone-3-color: #999999;
      --playkit-tone-4-color: #888888;
      --playkit-tone-5-color: #666666;
      --playkit-tone-6-color: #444444;
      --playkit-tone-7-color: #222222;
      --playkit-tone-8-color: #000000;
      --playkit-live-color: #e12536;
      --playkit-player-background-color: #000000;
    }

    .container {
      width: 1000px;
      display: flex;
    }
    .col1 {
      width: 20px;
      flex-direction: column;
      display: flex;
    }

    .col2 {
      flex: 10;
      flex-direction: column;
      display: flex;
    }

    .aaa {
      flex: 1;
      display: flex;
      padding: 3px;
      margin-bottom: 1px;
    }

    .bbb {
      flex: 1;
      display: flex;
      padding: 3px;
      margin-bottom: 1px;
      background-color: #e3e3e3;
    }

    .ggg {
      flex: 1;
      display: flex;
      padding: 20px 0 9px 0;
    }
  </style>

<div class="container">
  <div class="col1">
    <div class="ggg"></div>
    <div style="background-color: var(--playkit-primary-darker-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-primary-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-primary-brighter-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-primary-text-contrast-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-secondary-darker-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-secondary-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-secondary-brighter-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-secondary-text-contrast-color)"class="aaa"></div>
    <div class="ggg"></div>
    <div style="background-color: var(--playkit-success-darker-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-success-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-success-brighter-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-success-text-contrast-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-danger-darker-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-danger-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-danger-brighter-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-danger-text-contrast-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-warning-darker-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-warning-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-warning-brighter-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-warning-text-contrast-color)"class="aaa"></div>
    <div class="ggg"></div>
    <div style="background-color: var(--playkit-tone-1-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-tone-2-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-tone-3-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-tone-4-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-tone-5-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-tone-6-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-tone-7-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-tone-8-color)"class="aaa"></div>
    <div class="ggg"></div>
    <div style="background-color: var(--playkit-live-color)"class="aaa"></div>
    <div style="background-color: var(--playkit-player-background-color)"class="aaa"></div>
  </div>
  <div class="col2">
    <div class="ggg">Accent Colors</div>
    <div class="bbb">primary color</div>
    <div class="bbb">primary darker color</div>
    <div class="bbb">primary brighter color</div>
    <div class="bbb">primary text contrast color</div>
    <div class="bbb">secondary color</div>
    <div class="bbb">secondary darker color</div>
    <div class="bbb">secondary brighter color</div>
    <div class="bbb">secondary text contrast color</div>
    <div class="ggg">Acknowledgement Colors</div>
    <div class="bbb">success color</div>
    <div class="bbb">success darker color</div>
    <div class="bbb">success brighter color</div>
    <div class="bbb">success text contrast color</div>
    <div class="bbb">danger color</div>
    <div class="bbb">danger darker color</div>
    <div class="bbb">danger brighter color</div>
    <div class="bbb">danger text contrast color</div>
    <div class="bbb">warning color</div>
    <div class="bbb">warning darker color</div>
    <div class="bbb">warning brighter color</div>
    <div class="bbb">warning text contrast color</div>
    <div class="ggg">Tone Ramp</div>
    <div class="bbb">tone 1</div>
    <div class="bbb">tone 2</div>
    <div class="bbb">tone 3</div>
    <div class="bbb">tone 4</div>
    <div class="bbb">tone 5</div>
    <div class="bbb">tone 6</div>
    <div class="bbb">tone 7</div>
    <div class="bbb">tone 8</div>
    <div class="ggg">colors</div>
    <div class="bbb">live color</div>
    <div class="bbb">player background color</div>
  </div>
</div>










f
