# UI Components

## General

UI components are used to extend the player UI presets. Every preset layout contains logical `containers` that allow injecting components into. For example- a `playback` and `live` presets have the following containers `top-bar__left-controls`, `top-bar__right-controls`, `bottom-bar__left-controls`, `preset-overlay`, etc...

This support allow runtime customization of the preset by adding new components or replacing existing components with new ones. A developer can define ui components from the configuration provided to the player or as part of a plugin. Any component must be associated to one or more presets and given a valid container name it will be injected once that preset/container is available in the player dom. 


> :information_source:
> This guide assumes you are using the [Kaltura Player].</br>
> Each section will also contain a collapsable section to show snippet for testing the UI application in standalone mode - where it is imported directly and not used as part of the Kaltura Player.

[kaltura player]: https://github.com/kaltura/kaltura-player-js/

## Defining a UI component from configuration 

> The definition of each ui component is described [here](configuration.md#configuicomponents).

A UI component can be anything that transpile to valid DOM element (using plain html, jquery, preact etc)

For example- Let's say that we want to add new component into the bottom-bar in presets 'live' and 'playback'.

You will need to find first the name of the `container` you want to inject into. To resolve the name of the `container` you should refer to the source code of the relevant `preset` and find the `name` property of the `container`. In the following example we resolved the name of the container from [playback.js](../src/ui-presets/playback.js).

```javascript
XXX
```

### Injecting a component relative to existing component

The example above append the new button into that container. If you with to control the exact position relative to existing component you can use property xxxx.

You will need to find first the name of the `component` you want to inject relative to or to replace. To resolve the name of the `component` you should refer to the source code of the relevant `component` and get find the `displayName` provided to that component (usually located at the bottom of the file). For example- in [volume.js](../src/components/volume/volume.js) the display name is `volume`.

```javascript
XXX
```

## Defining a UI component from within a plugin

> The definition of each ui component is described [here](configuration.md#configuicomponents).

The `BasePlugin` expose a method `getUIComponents` that is called once when the plugin is being created. Use that method to declare UI component to be injected. 

```
export class MyCustomPlugin extends KalturaPlayer.core.BasePlugin {
  getUIComponents() {
    return [
    
    ];
  }
}
```

### Important behaviors to be aware of
1. The player will add your component only once matching a relevant preset and container. If you fail to see your components review again the configuration and make sure the preset and container names are correct.
2. Your component will probably be added and removed multiple times so you sould avoid storing persist state in your component. If using global configuration, use the page to persist state. If using a plugin, use the plugin instance to persist state.    
3. See example on how to create and use your own components [here](create-new-component.md)
4. Use `InjectedComponent` to handle add/remove of component life cycle. see [create-new-component / Injected Component life-cycle](create-new-component.md).

