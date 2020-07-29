# Loading

Component that shows black overlay with loading spinner when player is not in `idle`, `loading` or `paused` state.

## Props

| Prop   | Description            |
| ------ | ---------------------- |
| player | Player engine instance |

## Usage Example

```html
//@flow import { h, Loading } from 'playkit-js-ui'; export default function customUIPreset(props: any) { return (
<Loading />
) }
```
