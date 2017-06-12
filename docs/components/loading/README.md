# Loading

Component that shows black overlay with loading spinner when player is not in `idle`, `loading` or `paused` state.

## Props

| Prop | Description |
|--- |--- |
| player | Player engine instance |

## Usage Example

```html
import Loading from './components/loading/loading';

<Provider store={store}>
  <IntlProvider definition={definition}>
    <Shell>
      <div id='player-holder' />
      <EngineConnector player={this.player} />

      <Loading player={this.player} />
    </Shell>
  </IntlProvider>
</Provider>
```
