# OverlayPlay

Component that toggles play when clicking on the whole video shell.

## Props

| Prop | Description |
|--- |--- |
| player | Player engine instance |

## Usage Example

```html
import OverlayPlay from './components/overlay-play/overlay-play';

<Provider store={store}>
  <IntlProvider definition={definition}>
    <Shell>
      <div id='player-holder' />
      <EngineConnector player={this.player} />

      <OverlayPlay player={this.player} />
    </Shell>
  </IntlProvider>
</Provider>
```
