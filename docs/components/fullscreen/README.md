# Fullscreen

Component that toggles fullscreen state.

## Props

| Prop | Description |
|--- |--- |
| player | Player engine instance |

## Usage Example

```html
//@flow
import { h, FullscreenControl } from 'playkit-js-ui';

export default function customUIPreset(props: any) {
  return (
    <FullscreenControl player={props.player} />
  )
}
```
