# Fullscreen

Component that toggles fullscreen state.

## Props

| Prop | Description |
|--- |--- |
| player | Player engine instance |

## Usage Example

```html
import FullscreenControl from './components/fullscreen/fullscreen';

<Provider store={store}>
  <IntlProvider definition={definition}>
    <Shell>
      <div id='player-holder' />
      <EngineConnector player={this.player} />

      <FullscreenControl player={this.player} />
    </Shell>
  </IntlProvider>
</Provider>
```
