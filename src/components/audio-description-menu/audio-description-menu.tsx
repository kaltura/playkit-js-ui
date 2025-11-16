import {h} from 'preact';
import {withText} from 'preact-i18n';
import {useMemo} from 'preact/hooks';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/audio-description';
import {Menu, SmartContainerItem} from '../../components';
import {IconType} from '../icon';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {AUDIO_DESCRIPTION_TYPE} from '../../types/reducers/audio-description';
import {getActiveAudioLanguage} from '../../utils/audio-description';
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
  updateSelectionByLanguage?: (languageKey: string) => void;
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
    const isEnabled = enabledState !== 0;
    const selectedType = isEnabled ? enabledState : audioDescriptionType;

    props.updateAudioDescriptionEnabled!(isEnabled);
    props.updateAudioDescriptionType?.(selectedType!);

    // notify the player of a change in audio description settings
    props.notifyClick?.({
      type: 'advancedAudioDescription',
      settings: true,
      isEnabled,
      selectedType
    });
  };

  const audioLanguage = getActiveAudioLanguage(player);

  const hasAudioDescription = useMemo(() => {
    return !!audioDescriptionLanguages?.find(lang => lang.startsWith(audioLanguage));
  }, [audioDescriptionLanguages, audioLanguage]);

  const hasAdvancedAudioDescription = useMemo(() => {
    return !!advancedAudioDescriptionLanguages?.find(lang => lang.startsWith(audioLanguage));
  }, [advancedAudioDescriptionLanguages, audioLanguage]);

  const options: Array<{
    disabled: boolean;
    label: string;
    ariaLabel?: string;
    value: number;
    active: boolean;
  }> = [
    {
      disabled: false,
      label: disableText as string,
      value: 0,
      active: !audioDescriptionEnabled
    },
    {
      disabled: !hasAudioDescription,
      label: standardAudioDescriptionText as string,
      ariaLabel: hasAudioDescription ? standardAudioDescriptionAvailableText : noStandardAudioDescriptionAvailableText,
      value: AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION,
      active: (audioDescriptionEnabled && audioDescriptionType === AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION) as boolean
    },
    {
      disabled: !hasAdvancedAudioDescription,
      label: advancedAudioDescriptionText as string,
      ariaLabel: hasAdvancedAudioDescription ? advancedAudioDescriptionAvailableText : noAdvancedAudioDescriptionAvailableText,
      value: AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION,
      active: (audioDescriptionEnabled && audioDescriptionType === AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION) as boolean
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
