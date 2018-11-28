# Removing style settings from the captions menu

The player captions style can be modified by the viewer.

It can be done by opening the 'Advanced captions settings' in the language menu and clicking on the 
'Set custom caption' button.

Each of these style options can be hidden by overloading it's css class and adding ```display: none``` to it.

For example, adding the below will remove the ability to change the captions color:

```
.playkit-font-color {
  display: none
}
```

## Captions settings class list


| Class Name                             | Description                                          |
| -------------------------------------- | ---------------------------------------------------- |
| `.playkit-font-size`                   | Changing the size of the captions                    |
| `.playkit-font-color`                  | Changing the color of the captions                   |
| `.playkit-font-family`                 | Changing the font family of the captions             |
| `.playkit-font-style`                  | Changing the weight of the captions                  |
| `.playkit-font-opacity`                | Changing the opacity of the captions                 |
| `.playkit-background-color`            | Changing the color of the captions background        |
| `.playkit-background-opacity`          | Changing the opacity of the captions background      |
