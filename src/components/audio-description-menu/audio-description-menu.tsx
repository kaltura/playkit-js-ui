import {h} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/audio-description';
import {Menu, SmartContainerItem} from '../../components';
import {IconType} from '../icon';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {AUDIO_DESCRIPTION_TYPE} from '../../types/reducers/audio-description';
import {getAudioDescriptionLanguageKey, getAudioLanguageKey} from '../../utils/audio-description';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';

type AudioDescriptionMenuProps = {
  asDropdown?: boolean;
  audioTracks?: any[];
  audioDescriptionText?: string;
  audioDescriptionEnabled?: boolean;
  audioDescriptionType?: AUDIO_DESCRIPTION_TYPE;
  audioDescriptionLanguages?: string[];
  advancedAudioDescriptionLanguages?: string[];
  updateAudioDescriptionEnabled?: (isEnabled: boolean) => void;
  updateAudioDescriptionType?: (selectedType: AUDIO_DESCRIPTION_TYPE) => void;
  disableText?: string;
  standardAudioDescriptionText?: string;
  advancedAudioDescriptionText?: string;
  standardAudioDescriptionAvailableText?: string;
  noStandardAudioDescriptionAvailableText?: string;
  noAdvancedAudioDescriptionAvailableText?: string;
  advancedAudioDescriptionAvailableText?: string;
  notifyClick?: (payload: any) => void;
  addAccessibleChild?: (el: HTMLElement) => void;
  pushRef?: (el: HTMLElement) => void;
  player: KalturaPlayer;
};

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  audioTracks: state.engine.audioTracks,
  audioDescriptionLanguages: state.audioDescription.audioDescriptionLanguages,
  advancedAudioDescriptionLanguages: state.audioDescription.advancedAudioDescriptionLanguages,
  audioDescriptionEnabled: state.audioDescription.isEnabled,
  audioDescriptionType: state.audioDescription.selectedType
});

const COMPONENT_NAME = 'AudioDescriptionMenu';

const _AudioDescriptionMenu = (props: AudioDescriptionMenuProps) => {
  const {
    asDropdown,
    audioDescriptionText,
    audioDescriptionEnabled,
    audioDescriptionType,
    audioDescriptionLanguages,
    advancedAudioDescriptionLanguages,
    updateAudioDescriptionEnabled,
    updateAudioDescriptionType,
    disableText,
    standardAudioDescriptionText,
    advancedAudioDescriptionText,
    standardAudioDescriptionAvailableText,
    noStandardAudioDescriptionAvailableText,
    noAdvancedAudioDescriptionAvailableText,
    advancedAudioDescriptionAvailableText,
    player
  } = props;

  const onAudioDescriptionChange = (enabledState: number): void => {
    const selectedType = enabledState === 0 ? AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION : enabledState;

    updateAudioDescriptionType?.(selectedType);

    const currLanguageKey = player?.getActiveTracks()['audio'].language;
    if (enabledState === 0) {
      onDisableSelected(currLanguageKey);
    } else if (enabledState === AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION) {
      onAudioDescriptionSelected(currLanguageKey);
    } else {
      onAdvancedAudioDescriptionSelected(currLanguageKey);
    }

    // fire an event notifying that EAD has been turned on or off
    props.notifyClick?.({
      type: 'audioDescription'
    });
  };

  function onDisableSelected(currLanguageKey: string): void {
    updateAudioDescriptionEnabled?.(false);
    const newLanguageKey = getAudioLanguageKey(currLanguageKey);
    // restore audio track to normal if AD audio track was active
    changeAudioTrack(currLanguageKey, newLanguageKey);
  }

  function onAudioDescriptionSelected(currLanguageKey: string): void {
    updateAudioDescriptionEnabled?.(true);
    updateAudioDescriptionType?.(AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
    const newLanguageKey = getAudioDescriptionLanguageKey(currLanguageKey);
    // activate AD audio track
    changeAudioTrack(currLanguageKey, newLanguageKey);
  }

  function onAdvancedAudioDescriptionSelected(currLanguageKey: string): void {
    updateAudioDescriptionEnabled?.(true);
    updateAudioDescriptionType?.(AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION);
    // restore audio track to normal if AD audio track was active
    const newLanguageKey = getAudioLanguageKey(currLanguageKey);
    changeAudioTrack(currLanguageKey, newLanguageKey);
  }

  function changeAudioTrack(currLanguageKey: string, newLanguageKey: string): void {
    const newAudioTrack = player?.getTracks('audio')?.find(t => t.language === newLanguageKey);
    if (currLanguageKey !== newLanguageKey && newAudioTrack) {
      player?.selectTrack(newAudioTrack);

      props.notifyClick?.({
        type: props.player.Track.AUDIO,
        track: newAudioTrack
      });
    }
  }

  const audioLanguage = player?.getActiveTracks()['audio']?.language || '';
  const hasAudioDescription = !!audioDescriptionLanguages?.includes(audioLanguage);
  const hasAdvancedAudioDescription = !!advancedAudioDescriptionLanguages?.includes(audioLanguage);

  const options = [
    {
      label: disableText,
      value: 0,
      active: !audioDescriptionEnabled
    },
    {
      label: standardAudioDescriptionText,
      ariaLabel: hasAudioDescription ? standardAudioDescriptionAvailableText : noStandardAudioDescriptionAvailableText,
      value: AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION,
      active: audioDescriptionEnabled && audioDescriptionType === AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION
    },
    {
      label: advancedAudioDescriptionText,
      ariaLabel: hasAdvancedAudioDescription ? advancedAudioDescriptionAvailableText : noAdvancedAudioDescriptionAvailableText,
      value: AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION,
      active: audioDescriptionEnabled && audioDescriptionType === AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION
    }
  ];

  if (asDropdown) {
    return (
      <SmartContainerItem
        pushRef={el => {
          props.pushRef?.(el);
        }}
        icon={IconType.Captions}
        label={audioDescriptionText}
        options={options}
        onMenuChosen={enabledState => onAudioDescriptionChange(enabledState)}
      />
    );
  } else {
    return (
      <Menu
        pushRef={el => {
          props.addAccessibleChild?.(el);
          props.pushRef?.(el);
        }}
        options={options}
        onMenuChosen={enabledState => onAudioDescriptionChange(enabledState)}
        onClose={() => {}}
      />
    );
  }
};

const AudioDescriptionMenu = connect(
  mapStateToProps,
  bindActions(actions)
)(
  withPlayer(
    withEventDispatcher(COMPONENT_NAME)(
      withText({
        audioDescriptionText: 'settings.audioDescription',
        disableText: 'audioDescription.disable',
        standardAudioDescriptionText: 'audioDescription.standardAudioDescription',
        advancedAudioDescriptionText: 'audioDescription.advancedAudioDescription',
        noStandardAudioDescriptionAvailableText: 'audioDescription.noStandardAudioDescriptionAvailable',
        standardAudioDescriptionAvailableText: 'audioDescription.standardAudioDescriptionAvailable',
        noAdvancedAudioDescriptionAvailableText: 'audioDescription.noAdvancedAudioDescriptionAvailable',
        advancedAudioDescriptionAvailableText: 'audioDescription.advancedAudioDescriptionAvailable'
      })(_AudioDescriptionMenu)
    )
  )
);
AudioDescriptionMenu.displayName = COMPONENT_NAME;

export {AudioDescriptionMenu};
