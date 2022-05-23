## Configuration

Configuration parameters could be provided upon instantiation of the UI manager instance.

```js
var config = {
  // Configuration here
};
var uiManager = new playkit.ui.UIManager(player, config);
```

#### Configuration Structure

```js
{
  targetId: string,
  debugActions?: boolean, // optional
  forceTouchUI?: boolean, // optional
  showCCButton?: boolean, // optional
  hoverTimeout?: number, // optional
  logger?: loggerType, // optional
  components?: Object, // optional
  uiComponents: Array<Object>, //optional
  translations: Object, // optional
  locale: string // optional
}
```

##

> ### config.targetId
>
> ##### Type: `string`
>
> ##### Default: `-`
>
> ##### Description: Defines the player container dom element id.
>
> The UI manager needs this parameter since it renders the player UI below it.

##

> ### config.debugActions
>
> ##### Type: `boolean`
>
> ##### Default: `false`
>
> ##### Description: Whether to print the fired redux actions.

##

> ### config.forceTouchUI
>
> ##### Type: `boolean`
>
> ##### Default: `false`
>
> ##### Description: Defines the view type of the UI (mobile or desktop).
>
> Useful for applications that wants to force mobile view of player UI.

##

> ### config.showCCButton
>
> ##### Type: `boolean`
>
> ##### Default: `false`
>
> ##### Description: Whether to show enable/disable captions button in the bottom bar.

##

> ### config.hoverTimeout
>
> ##### Type: `number`
>
> ##### Default: `3000`
>
> ##### Description: Defines the timeout for control bar hover, 0 - always show.
>
> Useful for applications that wants to set different hover timeout duration for player controls.

##

> ### config.logLevel
>
> ##### Type: `string`
>
> ##### Default: `"ERROR"`
>
> ##### Description: Defines the ui log level.
>
> Possible values: `"DEBUG", "INFO", "TIME", "WARN", "ERROR", "OFF"`

##

> ### config.translations
>
> ##### Type: `{[langKey: string]: Object}`
>
> ##### Default: see [`en.i18n.json`](../translations/en.i18n.json)
>
> ##### Description: Defines the ui translation dictionary configuration.
>
> Optional components to configure: `watermark`,`seekbar`, `fullscreen`

##

> ### config.locale
>
> ##### Type: `string`
>
> ##### Default: `en`
>
> ##### Description: Defines the ui locale configuration.
>
> Determine the translation dictionary to be used

##

> ### config.components
>
> ##### Type: `Object`
>
> ##### Default: `-`
>
> ##### Description: Defines the ui components configuration.
>
> Optional components to configure: `watermark`,`seekbar`, `fullscreen`

##

> > ### config.components.seekbar
> >
> > ##### Type: `Object`
> >
> > ```js
> > {
> >    thumbsWidth: number,
> >    thumbsHeight: number,
> >    thumbsSlices: number,
> >    thumbsSprite: string
> > }
> > ```
> >
> > ##### Default:
> >
> > ```js
> > {
> >    thumbsWidth: 164,
> >    thumbsHeight: 92,
> >    thumbsSlices: 100,
> >    thumbsSprite: '{POSTER_URL}/p/{PID}/sp/{PID}00/thumbnail/entry_id/{ENTRY_ID}/version/100042/width/{THUMBS_WIDTH}/vid_slices/{THUMBS_SLICES}'
> > }
> > ```
> >
> > ##### Description: Defines a seekbar component.
> >
> > > ### config.components.seekbar.thumbsWidth
> > >
> > > ##### Type: `number`
> > >
> > > ##### Default: `164`
> > >
> > > ##### Description: The width of the thumbnail image.
> > >
> > > ##
> > >
> > > ### config.components.seekbar.thumbsHeight
> > >
> > > ##### Type: `number`
> > >
> > > ##### Default: `92`
> > >
> > > ##### Description: The height of the thumbnail image.
> > >
> > > ##
> > >
> > > ### config.components.seekbar.thumbsSlices
> > >
> > > ##### Type: `number`
> > >
> > > ##### Default: `100`
> > >
> > > ##### Description: The number of slices to cut from the thumbnail image.
> > >
> > > ##
> > >
> > > ### config.components.seekbar.thumbsSprite
> > >
> > > ##### Type: `string`
> > >
> > > ##### Default: '{POSTER_URL}/p/{PID}/sp/{PID}00/thumbnail/entry_id/{ENTRY_ID}/version/100042/width/{THUMBS_WIDTH}/vid_slices/{THUMBS_SLICES}'
> > >
> > > ##### Description: The url of the thumbnail image.
> > >
> > > Possible values: `'', custom url`
> > > > Notes:
> > > > * Passing empty string will disable thumbnail on the seekbar.
> > > > * The default value is for OVP only.
> > ##
> >
> > ### config.components.watermark
> >
> > ##### Type: `Object`
> >
> > ```js
> > {
> >    img: string,
> >    url: string,
> >    placement: string,
> >    timeout: number
> > }
> > ```
> >
> > ##### Default:
> >
> > ```js
> > {
> >    img: '',
> >    url: '',
> >    placement: 'top-left',
> >    timeout: 0
> > }
> > ```
> >
> > ##### Description: Defines a watermark component.
> >
> > > ### config.components.watermark.img
> > >
> > > ##### Type: `string`
> > >
> > > ##### Default: `''`
> > >
> > > ##### Description: The URL for the watermark image.
> > >
> > > ##
> > >
> > > ### config.components.watermark.url
> > >
> > > ##### Type: `string`
> > >
> > > ##### Default: `''`
> > >
> > > ##### Description: The URL to open on clicking the watermark.
> > >
> > > ##
> > >
> > > ### config.components.watermark.placement
> > >
> > > ##### Type: `string`
> > >
> > > ##### Default: `'top-left'`
> > >
> > > ##### Description: The placement of the watermark.
> > >
> > > Possible values: `'top-left', 'top-right', 'bottom-left', 'bottom-right'`
> > >
> > > ##
> > >
> > > ### config.components.watermark.timeout
> > >
> > > ##### Type: `number`
> > >
> > > ##### Default: `0`
> > >
> > > ##### Description: Timeout (in milliseconds) to hide the watermark.
> >
> > ##
> >
> > ### config.components.fullscreen
> >
> > ##### Type: `Object`
> >
> > ```js
> > {
> >   disableDoubleClick: boolean;
> > }
> > ```
> >
> > ##### Default:
> >
> > ```js
> > {
> >   disableDoubleClick: false;
> > }
> > ```
> >
> > ##### Description: Defines a fullscreen component.
> >
> > > ### config.components.fullscreen.inBrowserFullscreenForIOS (Deprecated)
> > >
> > > #### Moved to [`playback.inBrowserFullscreen`](https://github.com/kaltura/playkit-js/blob/master/docs/configuration.md#configplaybackinbrowserfullscreen)
> > >
> > > ##
> > >
> > > ### config.components.fullscreen.disableDoubleClick
> > >
> > > ##### Type: `boolean`
> > >
> > > ##### Default: `false`
> > >
> > > ##### Description: Disable entering to full screen by double clicking the player.

##

> ### config.uiComponents
>
> ##### Type: `Object`
>
> ```
>  Array<{
>  label: string,
>  presets: Array<string>,
>  container: string,
>  get: Function
>  props?: {}
>  beforeComponent?: string,
>  afterComponent?: string,
>  replaceComponent?: string
>  }>
> ```
>
> ##### Description: Defines ui components to be injected into the player ui.
>
> See guide [ui-components](./ui-components.md)
