// @flow
const namespace = 'playkit-ui';

const EventType: {[event: string]: string} = {
  UI_CLICKED: `${namespace}-uiclicked`,
  UI_VISIBILITY_CHANGED: `${namespace}-uivisibilitychanged`,
  USER_CLICKED_PLAY: `${namespace}-userclickedplay`,
  USER_CLICKED_PAUSE: `${namespace}-userclickedpause`,
  USER_CLICKED_REWIND: `${namespace}-userclickedrewind`,
  USER_CLICKED_LIVE_TAG: `${namespace}-userclickedlivetag`,
  USER_CLICKED_MUTE: `${namespace}-userclickedmute`,
  USER_CLICKED_UNMUTE: `${namespace}-userclickedunmute`,
  USER_CHANGED_VOLUME: `${namespace}-userchangedvolume`,
  USER_SELECTED_CAPTION_TRACK: `${namespace}-userselectedcaptiontrack`,
  USER_SELECTED_AUDIO_TRACK: `${namespace}-userselectedaudiotrack`,
  USER_SELECTED_QUALITY_TRACK: `${namespace}-userselectedqualitytrack`,
  USER_ENTERED_FULL_SCREEN: `${namespace}-userenteredfullscreen`,
  USER_EXITED_FULL_SCREEN: `${namespace}-userexitedfullscreen`,
  USER_SELECTED_CAPTIONS_STYLE: `${namespace}-userselectedcaptionsstyle`,
  USER_SELECTED_SPEED: `${namespace}-userselectedspeed`,
  USER_SEEKED: `${namespace}-userseeked`
};

export {EventType};
