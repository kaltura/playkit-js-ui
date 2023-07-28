# ErrorOverlay

Component that renders to indicate user when player got an error

## Props

| Prop      | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| errorHead | Valid Preact node                                                    |
| permanent | Render ErrorOverlay component despite if player got and error or not |

## Player configuration

in order to override error-overlay background or error message

> This guide assumes you are using the [Kaltura Player]

[kaltura player]: https://github.com/kaltura/kaltura-player-js/

### ErrorOverlay config example

```js
const config = {
    ...
    ui: {
        errorOverlay: {
            backgroundUrl: "https://custom-error-overlay-image",
            errorMessage: "Custom error message"
        }
    }
    ...
}

const player = KalturaPlayer.setup(config);
```

## Usage Example

```html
//@flow import { h, ErrorOverlay } from 'playkit-js-ui'; export default function customUIPreset(props: any) { return (
<ErrorOverlay />
) }
```
