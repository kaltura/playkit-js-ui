# UI Customization

The UI can be customized by either CSS overrides or by composing UI tree and style from the framework's built-in components and also by application supplied components.

## CSS overrides

Styling and theming the UI can be done easily by overwriting the default styles.

For complete class reference see [here](css-classes-override.md).

## Building your own UI

The player builds its UI by definfing presets which are built upon the application components library.

An application can define its own UI layout and styling, by defining its presets, which can be built from custom components and/or the default components library.

More information on how to build custom components and composing your own UI layout see [here](custom-ui-preset.md).

In addition, specific UI components can be defined and/or override instead of defining an entire UI preset

More information on how to build UI components and injecting them to UI see:

- [Create UI Component](./create-ui-component.md)
- [Inject UI Component](./ui-components.md)

## Removing style settings from the captions menu

The captions customizing level can be modified by removing settings from the captions setting menu.

More information on removing settings from the menu can be found [here](cvaa-override.md).

## Override Player Theme (Main colors)

Some style (currently - mainly the player primary colors) can be configured
