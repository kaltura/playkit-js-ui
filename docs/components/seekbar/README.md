# Seekbar

A component that changes the seekbar state.

## Props

| Prop | Description |
|--- |--- |
| player | Player engine instance |
| showFramePreview | Boolean to show frame preview. default: false
| showTimeBubble | Boolean to show time bubble. default: false

## Usage Example

```html
//@flow
import { h, SeekBarControl } from 'playkit-js-ui';

export default function customUIPreset(props: any) {
  return (
    // show both frame preview and time bubble
    <SeekBarControl showFramePreview showTimeBubble player={props.player} />

    // show only time bubble
    <SeekBarControl showTimeBubble player={props.player} />
  )
}
```
