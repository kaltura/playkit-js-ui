# ErrorOverlay

Component that renders to indicate user when Kaltura player got an error

## Props

| Prop      | Description                                                          |
| --------- | -------------------------------------------------------------------- |
| errorHead | Valid Preact node                                                    |
| permanent | Render ErrorOverlay component despite if player got and error or not |

## Player configuration

> This guide assumes you are using the [Kaltura Player]

[kaltura player]: https://github.com/kaltura/kaltura-player-js/

In order to override error-overlay background add `backgroundUrl` link to player config

```js
const config = {
    ...
    ui: {
        errorOverlay: {
            backgroundUrl: "https://custom-error-overlay-image-url"
        }
    }
    ...
}

const player = KalturaPlayer.setup(config);
```

## Usage Example

```html
//@flow import { h, ErrorOverlay } from 'playkit-js-ui';

export default function customUIPreset(props: any) {
    return (
        <ErrorOverlay />
    );
}
```
