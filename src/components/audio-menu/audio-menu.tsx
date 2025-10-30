import {h} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions as settingsActions} from '../../reducers/settings';
import {actions as audioDescriptionActions} from '../../reducers/audio-description';
import {Menu, SmartContainerItem} from '../../components';
import {IconType} from '../icon';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {AUDIO_DESCRIPTION_TYPE} from '../../types/reducers/audio-description';
import {getActiveAudioLanguage} from '../../utils/audio-description';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';

type AudioMenuProps = {
  audioTracks?: any[];
  audioLabelText?: string;
  audioDescriptionAvailableText?: string;
  thereIsAudioDescriptionAvailableText?: string;
  thereIsNoAudioDescriptionAvailableText?: string;
  advancedAudioDescriptionLanguages?: string[];
  audioDescriptionLanguages?: string[];
  asDropdown?: boolean;
  audioDescriptionEnabled?: boolean;
  audioDescriptionType?: AUDIO_DESCRIPTION_TYPE;
  selectionByLanguage?: Map<string, [boolean, AUDIO_DESCRIPTION_TYPE]>;
  updateAudioDescriptionEnabled?: (isEnabled: boolean) => void;
  updateAudioDescriptionType?: (selectedType: AUDIO_DESCRIPTION_TYPE) => void;
  player?: KalturaPlayer;
  notifyClick?: (payload: any) => void;
  pushRef?: (el: HTMLElement) => void;
  addAccessibleChild?: (el: HTMLElement) => void;
};

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = (state: any): any => ({
  audioTracks: state.engine.audioTracks,
  audioDescriptionLanguages: state.audioDescription.audioDescriptionLanguages,
  advancedAudioDescriptionLanguages: state.audioDescription.advancedAudioDescriptionLanguages,
  audioDescriptionEnabled: state.audioDescription.isEnabled,
  selectionByLanguage: state.audioDescription.selectionByLanguage
});

const COMPONENT_NAME = 'AudioMenu';

const _AudioMenu = (props: AudioMenuProps) => {
  const activeAudioLanguage = props.player ? getActiveAudioLanguage(props.player) : undefined;
  const audioOptions = props.audioTracks?.length
    ? props.audioTracks
        .filter((t: any) => t.label || t.language)
        .map((t: any) => {
          const hasAudioDescription = !!props.audioDescriptionLanguages?.find((l: string) => l === t.language);
          const hasAdvancedAudioDescription = !!props.advancedAudioDescriptionLanguages?.find((l: string) => l === t.language);

          const label = `${t.label || t.language} ${
            hasAudioDescription || hasAdvancedAudioDescription ? `(${props.audioDescriptionAvailableText})` : ''
          }`;
          const ariaLabel = `${t.label || t.language} - ${
            hasAudioDescription || hasAdvancedAudioDescription
              ? props.thereIsAudioDescriptionAvailableText
              : props.thereIsNoAudioDescriptionAvailableText
          }`;

          return {
            label,
            ariaLabel,
            active: t.language === activeAudioLanguage,
            value: t
          };
        })
    : [];

  function onAudioChange(audioTrack: any): void {
    const currLanguageKey = audioTrack.language;
    const hasAudioDescription = !!props.audioDescriptionLanguages?.find((l: string) => l === currLanguageKey);
    const hasAdvancedAudioDescription = !!props.advancedAudioDescriptionLanguages?.find((l: string) => l.startsWith(currLanguageKey));

    if (props.selectionByLanguage?.has(audioTrack.language)) {
      const [isEnabled, selectedType] = props.selectionByLanguage.get(audioTrack.language)!;
      props.updateAudioDescriptionEnabled?.(isEnabled);
      props.updateAudioDescriptionType?.(selectedType);
    } else if (props.audioDescriptionEnabled) {
      if (!hasAudioDescription && !hasAdvancedAudioDescription) {
        props.updateAudioDescriptionEnabled?.(false);
      } else if (hasAudioDescription && !hasAdvancedAudioDescription) {
        props.updateAudioDescriptionType?.(AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
      } else if (!hasAudioDescription && hasAdvancedAudioDescription) {
        props.updateAudioDescriptionType?.(AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION);
      }
    }

    if (props.player) {
      props.player.selectTrack(audioTrack);

      props.notifyClick?.({
        type: props.player.Track.AUDIO,
        track: audioTrack
      });
    }
  }

  if (props.asDropdown) {
    return (
      <SmartContainerItem
        pushRef={el => props.pushRef?.(el)}
        icon={IconType.Captions}
        label={props.audioLabelText}
        options={audioOptions}
        onMenuChosen={(audioTrack: any) => onAudioChange(audioTrack)}
        onClose={() => {}}
      />
    );
  } else {
    return (
      <Menu
        pushRef={el => {
          props.addAccessibleChild?.(el);
          props.pushRef?.(el);
        }}
        options={audioOptions}
        onMenuChosen={(audioTrack: any) => onAudioChange(audioTrack)}
        onClose={() => {}}
      />
    );
  }
};

const AudioMenu = connect(
  mapStateToProps,
  bindActions({...settingsActions, ...audioDescriptionActions})
)(
  withPlayer(
    withEventDispatcher(COMPONENT_NAME)(
      withText({
        audioLabelText: 'settings.audio',
        audioDescriptionAvailableText: 'audioDescription.audioDescriptionAvailable',
        thereIsAudioDescriptionAvailableText: 'audioDescription.thereIsAudioDescriptionAvailable',
        thereIsNoAudioDescriptionAvailableText: 'audioDescription.thereIsNoAudioDescriptionAvailable'
      })(_AudioMenu)
    )
  )
);

AudioMenu.displayName = COMPONENT_NAME;

export {AudioMenu};
