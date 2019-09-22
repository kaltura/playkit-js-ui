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
import { h, SeekBar } from 'playkit-js-ui';

export default function customUIPreset(props: any) {
  return (
    // show both frame preview and time bubble
    <SeekBar showFramePreview showTimeBubble />

    // show only time bubble
    <SeekBar showTimeBubble />
  )
}
```
