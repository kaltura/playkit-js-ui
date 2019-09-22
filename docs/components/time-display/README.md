# TimeDisplay

Component that display the current time, duration and time left based on format.

## Props

| Prop | Description |
|--- |--- |
| player | Player engine instance |
| format | Options are `total`, `current` and `left`. Default is: `current of total` |

## Usage Example

```html
//@flow
import { h, TimeDisplay } from 'playkit-js-ui';

export default function customUIPreset(props: any) {
  return (
    <TimeDisplay format='current / total' />
  )
}
```
