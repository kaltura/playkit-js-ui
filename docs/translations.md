# Player UI Labels Translations 

The UI locale can be customized by adding translations to the dictionary object.
Dictionaries can be added via the config object and the UI language, can be set via the locale config.

* The ui language should be from the ISO Language Code List [ISO Language Codes](https://datahub.io/core/language-codes)

## Defining a new labels for a given language 

The language dictionary is a key-value store defining, where key is the UI placeholder name and value is the translated string to appear.

The app developer may change the default values for one of the supported languages or add support for unsupported language by deffining values for the player pre-defined labels keys

A value in a key-value may be a string or an object containing a list of key-value pairs.

### A sample *English Dictionary* may look like:

#### en = English

The application will set the "ui" configuration on the root level of the player's config

```json
"ui": {
	"translations": {
			en: {
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
						    "retry": "Retry"
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
				}
		}
}
```

For complete translation reference see [here](/translations/en.i18n.json).

Default locale is English.

A translation file may contain all the keys in the English translation, and any key not found in the new translation will fallback to using the English one.

## Choosing the display language (locale language)


Setting the display language is done by defining the `locale` config option, where English is the default one.

> Only a locale that exist in the translations dictionary may be set, and setting a locale that doesn't exist will result in keeping the default one set.

```json
ui: {
  locale: 'es', //set the desired locale
  translations: {
    en: {
      /*English dictionary like the above example*/
    },
    es: {
      /*Spanish dictionary like the above example*/
    },
    ar: {
      /*Arabic dictionary like the above example*/
    }
    .....
  }
}
```
