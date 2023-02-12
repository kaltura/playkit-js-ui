
# Setting Customized Loading Spinner

Sometimes we want to change the default spinner to our custom spinner, for example with our logo or brand,

The player allows the change of the spinner in a simple and easy way through the [player's areas mechanism](./ui-components.md) that allows adding/removing/replacing components by area,
as you can see in the following full working example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Customized Spinner</title>
    <script src="https://cdnapisec.kaltura.com/p/<YOUR-PARTNER-ID>/embedPlaykitJs/uiconf_id/<UICONF-ID>"></script>
  </head>
  <body>
    <div id="player-placeholder" style="width: 640px; height: 360px"></div>
    <script>

      // My Spinner Component
      const { ui } = KalturaPlayer;
      const { h, preact } = ui;

      function ExternalSpinner() {
        return h('div', {className: 'loading-spinner'});
      }


      // Player config
      const config = {
        logLevel: 'DEBUG',
        targetId: 'player-placeholder',
        provider: {
          partnerId: <YOUR-PARTNER-ID>
        },
        ui: {
          uiComponents: [
            {
              label: 'LoadingSpinner',
              presets: ['Playback', 'Live', 'Img'],
              area: 'LoadingSpinner',
              get: ExternalSpinner,
              replaceComponent: 'Spinner'
            }
          ]
        }
      };

      const player = KalturaPlayer.setup(config);
      player.loadMedia({ entryId: '1_ktrfo5hl' });

    </script>
  </body>
</html>
```

You can read more about the UI customization and player's areas mechanism here:

- [Player UI components](./ui-components.md)
- [Create Player UI component](./create-ui-component.md)
