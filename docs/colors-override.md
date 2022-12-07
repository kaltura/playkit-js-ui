
#Customize the player colors

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
