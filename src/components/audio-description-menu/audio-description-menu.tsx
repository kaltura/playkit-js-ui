import {h} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import audioDescription, {actions} from '../../reducers/audio-description';
import {Menu, SmartContainerItem} from '../../components';
import {IconType} from '../icon';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {AUDIO_DESCRIPTION_TYPE} from '../../types/reducers/audio-description';
import {getAudioDescriptionLanguageKey, getAudioLanguageKey} from '../../utils/audio-description';
import {EventType} from '../../event';
import {FakeEvent} from '@playkit-js/playkit-js';

import {Component, VNode} from 'preact';

// TODO convert into functional component

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
  noExtendedAudioDescriptionAvailableText?: string;
  extendedAudioDescriptionAvailableText?: string;
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
    audioTracks,
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
    noExtendedAudioDescriptionAvailableText,
    extendedAudioDescriptionAvailableText,
    player,
    pushRef
  } = props;

  const onAudioDescriptionChange = (enabledState: number): void => {
    const activeAudioLanguage = getAudioLanguageKey(player?.getActiveTracks()['audio']?.language || '');

    if (enabledState === AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION && !audioDescriptionLanguages?.includes(activeAudioLanguage)) {
      updateAudioDescriptionEnabled?.(audioDescriptionEnabled ?? false);
      updateAudioDescriptionType?.(audioDescriptionType ?? AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
      return;
    }

    if (enabledState === AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION && !advancedAudioDescriptionLanguages?.includes(activeAudioLanguage)) {
      updateAudioDescriptionEnabled?.(audioDescriptionEnabled ?? false);
      updateAudioDescriptionType?.(audioDescriptionType ?? AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
      return;
    }

    const isEnabled = enabledState !== 0;
    const selectedType = enabledState === 0 ? AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION : enabledState;

    updateAudioDescriptionEnabled?.(isEnabled);
    updateAudioDescriptionType?.(selectedType);

    const currLanguageKey = player?.getActiveTracks()['audio'].language;
    const newLanguageKey = audioDescriptionEnabled ? getAudioDescriptionLanguageKey(currLanguageKey) : getAudioLanguageKey(currLanguageKey);

    const newAudioTrack = player?.getTracks('audio')?.find(t => t.language === newLanguageKey);
    if (newAudioTrack) {
      player?.selectTrack(newAudioTrack);
    }

    // TODO use event dispatcher ?
    player?.dispatchEvent(new FakeEvent(EventType.USER_CLICKED_AUDIO_DESCRIPTION, {isEnabled, selectedType}));
  };

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
      ariaLabel: hasAdvancedAudioDescription ? extendedAudioDescriptionAvailableText : noExtendedAudioDescriptionAvailableText,
      value: AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION,
      active: audioDescriptionEnabled && audioDescriptionType === AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION
    }
  ];

  if (asDropdown) {
    return (
      <SmartContainerItem
        pushRef={el => {
          pushRef?.(el);
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
          // TODO where does this come from ?
          //props.addAccessibleChild(el);
          pushRef?.(el);
        }}
        options={options}
        onMenuChosen={enabledState => onAudioDescriptionChange(enabledState)}
        onClose={() => {}}
      />
    );
  }
};

const AudioDescriptionMenu = connect(mapStateToProps)(
  withPlayer(
    withEventDispatcher(COMPONENT_NAME)(
      withText({
        audioDescriptionText: 'settings.audioDescription',
        disableText: 'audioDescription.disable',
        standardAudioDescriptionText: 'audioDescription.standardAudioDescription',
        advancedAudioDescriptionText: 'audioDescription.advancedAudioDescription',
        noStandardAudioDescriptionAvailableText: 'audioDescription.noStandardAudioDescriptionAvailable',
        standardAudioDescriptionAvailableText: 'audioDescription.standardAudioDescriptionAvailable',
        noExtendedAudioDescriptionAvailableText: 'audioDescription.noExtendedAudioDescriptionAvailable',
        extendedAudioDescriptionAvailableText: 'audioDescription.extendedAudioDescriptionAvailable'
      })(_AudioDescriptionMenu)
    )
  )
);
AudioDescriptionMenu.displayName = COMPONENT_NAME;

export {AudioDescriptionMenu};
