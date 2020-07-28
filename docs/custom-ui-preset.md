# Custom UI Preset

## General

UI presets are used to define the player GUI based on conditions.

The UI Manager accepts an array of UI presets.

The preset list may contain one default preset and additional conditional presets.

A conditional preset will only be shown if it's defined condition is met.

The UI manager has a list of pre-defined conditions, and custom conditions can be defined as well, see [below](#defining-ui-conditions).

The order that the UI presets are defined and their respective conditions define the priority which they'll be rendered, where the order is ascending, so first UI preset condition will be evaluated first and last will be evaluated last.

The last preset should always be the default one that has no condition.

> :information_source:
> This guide assumes you are using the [Kaltura Player].</br>
> If you intend to build a new preset that will be compiled as part of the library then you can import the components and use JSX for building the preset.</br>
> Each section will also contain a collapsable section to show snippet for testing the UI application in standalone mode - where it is imported directly and not used as part of the Kaltura Player.

[kaltura player]: https://github.com/kaltura/kaltura-player-js/

## Defining a preset

A preset is a simple function that returns a tree that defines the compoentns structure to be used in a layout.

For example- Let's say that we want our fullscreen UI to have only the bottom bar with the fullscreen control. nothing else.

this is a UI preset that will define the look of fullscreen state, which uses the built-in components `BottomBar` and `Fullscreen`

```javascript
//fullscreen-preset.js
const h = KalturaPlayer.ui.h;
const components = KalturaPlayer.ui.components;
const fullscreenUI = function (props) {
  return h('div', {className: 'playback-gui-wrapper'}, h(components.BottomBar, h(components.Fullscreen, {}, {className: 'playkit-left-controls'})));
};
```

### Using JSX

If your app is using [Babel] for transpiling you can use [JSX] syntax which will be transpiled to the above code.
In order to do this do the following:

1.  Install [transform-react-jsx](https://www.npmjs.com/package/babel-plugin-transform-react-jsx) with your favoruite package manager

```bash
yarn add -D babel-plugin-transform-react-jsx
//or
npm install --save-dev babel-plugin-transform-react-jsx
```

2.  in your babel config (most likely in your `.babelrc` file) add:

```javascript
"plugins": [
  [
    "transform-react-jsx",
    {
      "pragma": "KalturaPlayer.ui.h"
    }
  ]
]
```

3.  change the UI markup to use JSX syntax:

```javascript
//fullscreen-preset.js
const components = KalturaPlayer.ui.components;
const fullscreenUI = function (props) {
  return (
    <div className="playback-gui-wrapper" style="height: 100%">
      <BottomBar>
        <Fullscreen />
      </BottomBar>
    </div>
  );
};
```

[jsx]: https://reactjs.org/docs/jsx-in-depth.html
[babel]: http://babeljs.io/

<details>
  <summary>Example if importing the UI in standalone mode</summary>

```javascript
//fullscreen-preset.js
//@flow
import {h, BottomBar, Fullscreen} from 'playkit-js-ui';

export default function fullscreenUI(props: any) {
  return (
    <div className="playback-gui-wrapper" style="height: 100%">
      <BottomBar>
        <Fullscreen />
      </BottomBar>
    </div>
  );
}
```

</details>

## Attaching the preset to the fullscreen state

In order to use a preset we pass our custom preset function to the UI manager.

```javascript
//@flow
// the new preset we created
import fullscreenUI from './fullscreen-preset.js';

// Get the player default presets
const Presets = KalturaPlayer.ui.Presets;
const uis = [
  { template: props => fullscreenUI(props), condition: state => state.fullscreen.fullscreen },
  { template: props => Presets.playbackUI(props) }
];
const config = {
  ui: {
    customPreset: uis;
  }
};
//Call th eplayer with the new UI presets
const kalturaPlayer = KalturaPlayer.setup(config);
```

<details>
  <summary>Example if importing the UI in standalone mode</summary>

```javascript
//@flow
import {default as PlaykitUI, Presets} from 'playkit-js-ui';

// the new preset we created
import fullscreenUI from './fullscreen-preset.js';

function buildUI(player: Player, config: Object): void {
  const uis = [
    {template: props => fullscreenUI(props), condition: state => state.fullscreen.fullscreen},
    {template: props => Presets.playbackUI(props)}
  ];

  let playerUIManager = new PlaykitUI(player, config);
  playerUIManager.buildCustomUI(uis);
}
```

</details>

## Defining UI conditions

A preset condition is a simple method that returns a boolean.

Once a boolean is returned, either `true` or `false`, the UI will be rendered.

The UI Manager has three pre-defined conditions:

1. Error state: `state.engine.hasError`
2. Ad break state: `state.engine.adBreak`
3. Live state: `state.engine.isLive`
4. Idle state: `state.engine.isIdle`

## Using custom components

Presets can be created by using the player default library components, but you can also create and use your own components to define the layout.

See example on how to create and use your own components [here](create-ui-component.md)

```

```
