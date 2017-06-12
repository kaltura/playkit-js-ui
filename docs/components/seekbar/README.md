# Seekbar

Component that toggles fullscreen state.

## Props

| Prop | Description |
|--- |--- |
| player | Player engine instance |
| showFramePreview | Boolean to show frame preview. default: false
| showTimeBubble | Boolean to show time bubble. default: false

## Usage Example

```html
import SeekBarControl from './components/seekbar/seekbar';

<Provider store={store}>
  <IntlProvider definition={definition}>
    <Shell>
      <div id='player-holder' />
      <EngineConnector player={this.player} />

      // show both frame preview and time bubble
      <SeekBarControl showFramePreview showTimeBubble player={this.player} />

      // show only time bubble
      <SeekBarControl showTimeBubble player={this.player} />
    </Shell>
  </IntlProvider>
</Provider>
```
