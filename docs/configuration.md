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
  forceTouchUI: boolean, // optional
  logLevel: string, // optional
  components: Object // optional
}
```
## 
>### config.targetId
>##### Type: `string`
>##### Default: `-`
>##### Description: Defines the player container dom element id.
The UI manager needs this parameter since it renders the player UI below it. 
##
>### config.forceTouchUI
>##### Type: `boolean`
>##### Default: `false`
>##### Description: Defines the view type of the UI (mobile or desktop).
Useful for applications that wants to force mobile view of player UI.
## 
>### config.logLevel
>##### Type: `string`
>##### Default: `"ERROR"`
>##### Description: Defines the ui log level.
>Possible values: `"DEBUG", "INFO", "TIME", "WARN", "ERROR", "OFF"`
## 
>### config.components
>##### Type: `Object`
>##### Default: `-`
>##### Description: Defines the ui components configuration.
>Optional components to configure: `watermark`,`seekbar`
## 
>>### config.components.watermark
>>##### Type: `Object`
>>```js
>>{
>>    img: string,
>>    url: string, 
>>    placement: string, 
>>    timeout: number
>>}
>>```
>>##### Default: 
>>```js
>>{
>>    img: '',
>>    url: '',
>>    placement: 'top-left',
>>    timeout: 0
>>}
>>```
>>##### Description: Defines a watermark component.
>>>### config.components.watermark.img
>>>##### Type: `string`
>>>##### Default: `''`
>>>##### Description: The URL for the watermark image.
>>>## 
>>>### config.components.watermark.url
>>>##### Type: `string`
>>>##### Default: `''`
>>>##### Description: The URL to open on clicking the watermark.
>>>## 
>>>### config.components.watermark.placement
>>>##### Type: `string`
>>>##### Default: `'top-left'`
>>>##### Description: The placement of the watermark.
>>>Possible values: `'top-left', 'top-right', 'bottom-left', 'bottom-right'`
>>>## 
>>>### config.components.watermark.timeout
>>>##### Type: `number`
>>>##### Default: `0`
>>>##### Description: Timeout (in milliseconds) to hide the watermark.
>>##
>>### config.components.seekbar
>>##### Type: `Object`
>>```js
>>{
>>    thumbsSprite: string, 
>>    thumbsWidth: number, 
>>    thumbsSlices: number
>>}
>>```
>>##### Description: Defines the seekbar component optional configuration.
>>>### config.components.seekbar.thumbsSprite
>>>##### Type: `string`
>>>##### Default: `-`
>>>##### Description: The URL for the preview thumbnail image.
>>>## 
>>>### config.components.seekbar.thumbsWidth
>>>##### Type: `number`
>>>##### Default: `-`
>>>##### Description: The width of each preview thumbnail slice.
>>>## 
>>>### config.components.watermark.thumbsSlices
>>>##### Type: `number`
>>>##### Default: `-`
>>>##### Description: The amount of slices that the preview thumbnail image will divided into.
