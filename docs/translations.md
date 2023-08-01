# Adding translations and choosing locale language

The UI locale can be customized by adding translations to the dictionary object.
Dictionaries can be added via the config object and the UI language, can be set via the locale config.

## Defining a new language

The language dictionary is a key-value store defining, where key is the UI placeholder name and value is the translated string to appear.

A value in a key-value may be a string or an object containing a list of key-value pairs.

A sample English dictionary may look like:

```json
{
  "controls": {
    "play": "Play",
    "pause": "Pause",
    "language": "Language",
    "settings": "Settings",
    "fullscreen": "Fullscreen",
    "rewind": "Rewind",
    "vrStereo": "vrStereo",
    "live": "Live",
    "unmute": "Unmute",
    "next": "Next",
    "prev": "Prev"
  },
  "settings": {
    "quality": "Quality",
    "speed": "Speed"
  },
  "language": {
    "audio": "Audio",
    "captions": "Captions",
    "advanced_captions_settings": "Advanced captions settings"
  },
  "overlay": {
    "close": "Close"
  },
  "error": {
    "default_error": "Something went wrong",
    "default_session_text": "Session ID",
    "retry": "Try again",
    "network_error": "No internet connection check your network"
  },
  "ads": {
    "ad_notice": "Advertisement",
    "learn_more": "Learn more",
    "skip_ad": "Skip ad",
    "skip_in": "Skip in"
  },
  "cvaa": {
    "title": "Advanced captions settings",
    "sample_caption_tag": "Sample",
    "set_custom_caption": "Set custom caption",
    "edit_caption": "Edit caption",
    "size_label": "Size",
    "font_color_label": "Font color",
    "font_family_label": "Font family",
    "font_style_label": "Font style",
    "font_opacity_label": "Font opacity",
    "background_color_label": "Background color",
    "background_opacity_label": "Background opacity",
    "apply": "Apply",
    "caption_preview": "This is your caption preview"
  }
}
```

For complete translation reference see [here](/translations/en.i18n.json).

Default locale is English.

A translation file may contain all the keys in the English translation, and any key not found in the new translation will fallback to using the English one.

## Choosing the display language

Setting the display language is done by defining the `locale` config option, where English is the default one.

> Only a locale that exist in the translations dictionary may be set, and setting a locale that doesn't exist will result in keeping the default one set.

```json5
{
  locale: 'es', //set the desired locale
  translations: {
    en: {
      /*English dictionary*/
    },
    es: {
      /*Spanish dictionary*/
    }
  }
}
```
