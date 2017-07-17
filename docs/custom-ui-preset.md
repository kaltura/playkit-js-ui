## Custom UI Preset

### General

UI presets are used to define the player GUI based on conditions.

### Usage example

For example- UI preset that will be activated only when the player is on fullscreen state.
Let's say that we want our fullscreen UI to have only the bottom bar with the fullscreen control. nothing else.

```javascript
//fullscreen-preset.js
//@flow
import { h, BottomBar, FullscreenControl  } from 'playkit-js-ui';

export default function fullscreenUI(props: any) {
  return (
    <div className='playback-gui-wrapper' style='height: 100%'>
      <BottomBar>
        <FullscreenControl player={props.player} />
      </BottomBar>
    </div>
  )
}
```

### Attaching the preset to the fullscreen state

```javascript
//@flow
import { default as playbackUI, playbackUI } from 'playkit-js-ui';

// the new preset we created
import fullscreenUI from './fullscreen-preset.js';

function buildUI(player: Player, config: Object): void {
  const uis = [
    { template: props => fullscreenUI(props), condition: state => state.fullscreen.fullscreen },
    { template: props => playbackUI(props) }
  ];

  let playerUIManager = new PlaykitUI(player, config);
  playerUIManager.buildDefaultUI(uis);
}

```
