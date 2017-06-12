# TimeDisplay

Component that display the current time, duration and time left based on format.

## Props

| Prop | Description |
|--- |--- |
| player | Player engine instance |
| format | Options are `total`, `current` and `left`. Default is: `current of total` |

## Usage Example

```html
import TimeDisplay from './components/time-display/time-display';

<Provider store={store}>
  <IntlProvider definition={definition}>
    <Shell>
      <div id='player-holder' />
      <EngineConnector player={this.player} />

      <TimeDisplay format='current / total' player={this.player} />
    </Shell>
  </IntlProvider>
</Provider>
```
