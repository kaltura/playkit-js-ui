# UI Events

| Events List                                                     |
| --------------------------------------------------------------- |
| [`UI_CLICKED`](#UI_CLICKED)                                     |
| [`UI_VISIBILITY_CHANGED`](#UI_VISIBILITY_CHANGED)               |
| [`UI_PRESET_CHANGE`](#UI_PRESET_CHANGE)                         |
| [`USER_CLICKED_PLAY`](#USER_CLICKED_PLAY)                       |
| [`USER_CLICKED_PAUSE`](#USER_CLICKED_PAUSE)                     |
| [`USER_CLICKED_REWIND`](#USER_CLICKED_REWIND)                   |
| [`USER_CLICKED_LIVE_TAG`](#USER_CLICKED_LIVE_TAG)               |
| [`USER_CLICKED_MUTE`](#USER_CLICKED_MUTE)                       |
| [`USER_CLICKED_UNMUTE`](#USER_CLICKED_UNMUTE)                   |
| [`USER_CHANGED_VOLUME`](#USER_CHANGED_VOLUME)                   |
| [`USER_SELECTED_CAPTION_TRACK`](#USER_SELECTED_CAPTION_TRACK)   |
| [`USER_SELECTED_AUDIO_TRACK`](#USER_SELECTED_AUDIO_TRACK)       |
| [`USER_SELECTED_QUALITY_TRACK`](#USER_SELECTED_QUALITY_TRACK)   |
| [`USER_ENTERED_FULL_SCREEN`](#USER_ENTERED_FULL_SCREEN)         |
| [`USER_EXITED_FULL_SCREEN`](#USER_EXITED_FULL_SCREEN)           |
| [`USER_SELECTED_CAPTIONS_STYLE`](#USER_SELECTED_CAPTIONS_STYLE) |
| [`USER_SELECTED_SPEED`](#USER_SELECTED_SPEED)                   |
| [`USER_SEEKED`](#USER_SEEKED)                                   |

## Events

> ### <a name="UI_CLICKED"></a>UI_CLICKED
>
> Fires on any user interaction with the UI.

#

> ### <a name="UI_VISIBILITY_CHANGED"></a>UI_VISIBILITY_CHANGED
>
> Fires when the UI visibility state changes from visible to hidden or from hidden to visible.
> <br><br>_payload parameters:_
>
> | Name      | Type      | Description                                            |
> | --------- | --------- | ------------------------------------------------------ |
> | `visible` | `boolean` | True when the UI is shown, false when the UI is hidden |

#

#

> ### <a name="UI_PRESET_CHANGE"></a>UI_PRESET_CHANGE
>
> Fires when preset change.
> <br><br>_payload parameters:_
>
> | Name   | Type     | Description                        |
> | ------ | -------- | ---------------------------------- |
> | `from` | `string` | Preset name before change          |
> | `to`   | `string` | Preset name after change           |

#

> ### <a name="ACTIVE_PRESET_RESIZE"></a>ACTIVE_PRESET_RESIZE
>
> Fires when the active preset is resized.
> <br><br>_payload parameters:_
>
> | Name      | Type      | Description                                            |
> | --------- | --------- | ------------------------------------------------------ |
> SAKAL tbd

#

> ### <a name="USER_CLICKED_PLAY"></a>USER_CLICKED_PLAY
>
> Fires when the user initiated play by the UI.<br>
> It will fires neither by clicking the play button or by clicking the video area.

#

> ### <a name="USER_CLICKED_PAUSE"></a>USER_CLICKED_PAUSE
>
> Fires when the user initiated pause by the UI.<br>
> It will fires neither by clicking the pause button or by clicking the video area.

#

> ### <a name="USER_CLICKED_REWIND"></a>USER_CLICKED_REWIND
>
> Fires when the rewind button has been clicked by the user.
> <br><br>_payload parameters:_
>
> | Name   | Type     | Description                        |
> | ------ | -------- | ---------------------------------- |
> | `from` | `number` | The playback time before the click |
> | `to`   | `number` | The playback time after the click  |

#

> ### <a name="USER_CLICKED_LIVE_TAG"></a>USER_CLICKED_LIVE_TAG
>
> Fires when the live tag button has been clicked by the user.<br>

#

> ### <a name="USER_CLICKED_MUTE"></a>USER_CLICKED_MUTE
>
> Fires when the user clicked the volume button and changed his state to mute.

#

> ### <a name="USER_CLICKED_UNMUTE"></a>USER_CLICKED_UNMUTE
>
> Fires when the user clicked the volume button and changed his state to unmute.

#

> ### <a name="USER_CHANGED_VOLUME"></a>USER_CHANGED_VOLUME
>
> Fires when the user dragged the volume bar and changed its value.
> <br><br>_payload parameters:_
>
> | Name     | Type     | Description    |
> | -------- | -------- | -------------- |
> | `volume` | `number` | The new volume |

#

> ### <a name="USER_SELECTED_CAPTION_TRACK"></a>USER_SELECTED_CAPTION_TRACK
>
> Fires when the user selected a caption from the Captions dropdown.
> <br><br>_payload parameters:_
>
> | Name           | Type     | Description                |
> | -------------- | -------- | -------------------------- |
> | `captionTrack` | `Object` | The selected caption track |

#

> ### <a name="USER_SELECTED_AUDIO_TRACK"></a>USER_SELECTED_AUDIO_TRACK
>
> Fires when the user selected an audio track from the Audio dropdown.
> <br><br>_payload parameters:_
>
> | Name         | Type     | Description              |
> | ------------ | -------- | ------------------------ |
> | `audioTrack` | `Object` | The selected audio track |

#

> ### <a name="USER_SELECTED_QUALITY_TRACK"></a>USER_SELECTED_QUALITY_TRACK
>
> Fires when the user selected quality from the Quality dropdown.
> <br><br>_payload parameters:_
>
> | Name           | Type     | Description                |
> | -------------- | -------- | -------------------------- |
> | `qualityTrack` | `Object` | The selected quality track |

#

> ### <a name="USER_ENTERED_FULL_SCREEN"></a>USER_ENTERED_FULL_SCREEN
>
> Fires when the UI is entered to full screen mode due to user gesture.<br>
> This can be done neither by clicking the full screen button or by double clicking the video area.

#

> ### <a name="USER_EXITED_FULL_SCREEN"></a>USER_EXITED_FULL_SCREEN
>
> Fires when the UI is exited from full screen mode due to user gesture.<br>
> This can be done neither by clicking the full screen button or by double clicking the video area.

#

> ### <a name="USER_SELECTED_CAPTIONS_STYLE"></a>USER_SELECTED_CAPTIONS_STYLE
>
> Fires when the user selected a captions style from the Advanced Captions Settings menu.
> <br><br>_payload parameters:_
>
> | Name            | Type     | Description                 |
> | --------------- | -------- | --------------------------- |
> | `captionsStyle` | `Object` | The selected captions style |

#

> ### <a name="USER_SELECTED_SPEED"></a>USER_SELECTED_SPEED
>
> Fires when the user selected a certain speed from the Speed dropdown.
> <br><br>_payload parameters:_
>
> | Name    | Type     | Description        |
> | ------- | -------- | ------------------ |
> | `speed` | `number` | The selected speed |

#

> ### <a name="USER_SEEKED"></a>USER_SEEKED
>
> Fires when the user initiated seek by dragging the seek bar.
> <br><br>_payload parameters:_
>
> | Name   | Type     | Description                       |
> | ------ | -------- | --------------------------------- |
> | `from` | `number` | The playback time before the seek |
> | `to`   | `number` | The playback time after the seek  |

#
