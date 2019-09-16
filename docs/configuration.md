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
  log?: UILogConfigObject, // optional
  components?: Object, // optional
  uiComponents: Array<Object>, //optional
  translations: Object, // optional
  locale: Object // optional  
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
> ##### Default: `see en.json`
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
> > ### config.components.seekbar
> >
> > ##### Type: `Object`
> >
> > ```js
> > {
> >    thumbsSprite: string,
> >    thumbsWidth: number,
> >    thumbsSlices: number
> > }
> > ```
> >
> > ##### Description: Defines the seekbar component optional configuration.
> >
> > > ### config.components.seekbar.thumbsSprite
> > >
> > > ##### Type: `string`
> > >
> > > ##### Default: `-`
> > >
> > > ##### Description: The URL for the preview thumbnail image.
> > >
> > > ##
> > >
> > > ### config.components.seekbar.thumbsWidth
> > >
> > > ##### Type: `number`
> > >
> > > ##### Default: `-`
> > >
> > > ##### Description: The width of each preview thumbnail slice.
> > >
> > > ##
> > >
> > > ### config.components.watermark.thumbsSlices
> > >
> > > ##### Type: `number`
> > >
> > > ##### Default: `-`
> > >
> > > ##### Description: The amount of slices that the preview thumbnail image will divided into.

##

> > ### config.components.fullscreen (Deprecated)
> >
> > #### Moved under playback.inBrowserFullscreen
> >
> > ##### Type: `Object`
> >
> > ```js
> > {
> >   inBrowserFullscreenForIOS: boolean;
> > }
> > ```
> >
> > ##### Default:
> >
> > ```js
> > {
> >   inBrowserFullscreenForIOS: false;
> > }
> > ```
> >
> > ##### Description: Defines a fullscreen component.
> >
> > > ### config.components.fullscreen.inBrowserFullscreenForIOS
> > >
> > > ##### Type: `boolean`
> > >
> > > ##### Default: `false`
> > >
> > > ##### Description: Gives the ability to choose an in-browser fullscreen experience on iOS devices which will replace the native fullscreen of the AV player.

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
>  render: Function 
>  props?: {} 
>  beforeComponent?: string,
>  afterComponent?: string,
>  replaceComponent?: string
>  }>
>  ```
>
>
> ##### Description: Defines ui components to be injected into the player ui.
>
> See guide [ui-components](./ui-components.md)
