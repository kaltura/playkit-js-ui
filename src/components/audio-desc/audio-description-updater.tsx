import {useEffect, useState} from 'preact/hooks';
import {connect, useStore} from 'react-redux';
import {withPlayer} from '../player';
import {getActiveAudioLanguage, getAudioDescriptionLanguageKey, getAudioDescriptionStateFromStorage} from '../../utils/audio-description';
import {AUDIO_DESCRIPTION_TYPE} from '../../types/reducers/audio-description';
import {registerToBottomBar, unregisterFromBottomBar} from '../bottom-bar';
import {registerComponent} from './audio-desc-mini';
import {AudioDesc} from './audio-desc';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/audio-description';
import {withEventDispatcher} from '../event-dispatcher';
import {withText} from 'preact-i18n';
import {withEventManager} from '../../event/with-event-manager';

const mapStateToProps = ({audioDescription, engine, config, bottomBar}) => ({
  controlsToMove: bottomBar.controlsToMove,
  audioDescriptionLanguages: audioDescription.audioDescriptionLanguages,
  advancedAudioDescriptionLanguages: audioDescription.advancedAudioDescriptionLanguages,
  openMenuFromAudioDescriptionButton: config.openMenuFromAudioDescriptionButton,
  audioTracks: engine.audioTracks,
  isDefaultValueSet: audioDescription.isDefaultValueSet,
  isEnabled: audioDescription.isEnabled,
  selectedType: audioDescription.selectedType,
  showAudioDescriptionButton: config.showAudioDescriptionButton,
  selectedAudioLanguage: audioDescription.selectedAudioLanguage
});

const COMPONENT_NAME = 'AudioDescriptionUpdater';

// This component is used to update the audio description state.
// The button components don't always render (depends on configuration and available space),
// so we need a separate component which can update the state when needed.
const _AudioDescriptionUpdater = props => {
  const {
    audioDescriptionLanguages,
    advancedAudioDescriptionLanguages,
    isDefaultValueSet,
    isEnabled,
    selectedType,
    showAudioDescriptionButton,
    selectedAudioLanguage,
    audioTracks
  } = props;
  const [isRegisteredToBottomBar, setIsRegisteredToBottomBar] = useState(true);

  const store = useStore();

  // reset flags on entry changed
  useEffect(() => {
    if (audioDescriptionLanguages.length === 0 && advancedAudioDescriptionLanguages.length === 0) {
      setIsRegisteredToBottomBar(false);
    }
  }, [audioDescriptionLanguages, advancedAudioDescriptionLanguages]);

  // handle register and unregister to bottom bar
  useEffect(() => {
    if (isRegisteredToBottomBar || !showAudioDescriptionButton) return;

    unregisterFromBottomBar(AudioDesc.displayName, props.player);
    if (props.advancedAudioDescriptionLanguages.length > 0 || props.audioDescriptionLanguages.length > 0) {
      setIsRegisteredToBottomBar(true);
      registerToBottomBar(AudioDesc.displayName, props.player, () => registerComponent(props, store));
    }
  }, [props.player, advancedAudioDescriptionLanguages, audioDescriptionLanguages, isRegisteredToBottomBar, showAudioDescriptionButton]);

  // set default extended audio description on entry changed
  useEffect(() => {
    if (!isDefaultValueSet) {
      updateDefaultAdvancedAudioDescription(props, advancedAudioDescriptionLanguages, audioTracks);
    }
  }, [advancedAudioDescriptionLanguages, isDefaultValueSet]);

  // update audio track selection when audio description is turned on or off
  useEffect(() => {
    if (!isDefaultValueSet) return;
    if (!isEnabled) {
      onDisableSelected(selectedAudioLanguage);
    } else if (selectedType === AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION) {
      onAudioDescriptionSelected(selectedAudioLanguage);
    } else {
      onAdvancedAudioDescriptionSelected(selectedAudioLanguage);
    }
  }, [isDefaultValueSet, isEnabled, selectedType, selectedAudioLanguage]);

  function onDisableSelected(currLanguageKey: string): void {
    props.updateSelectionByLanguage?.(currLanguageKey, false, props.audioDescriptionType || AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
    // restore audio track to normal if AD audio track was active
    changeAudioTrack(props.player.getActiveTracks()['audio']?.language || '', currLanguageKey);
  }

  function onAudioDescriptionSelected(currLanguageKey: string): void {
    props.updateSelectionByLanguage?.(currLanguageKey, true, AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
    const newLanguageKey = getAudioDescriptionLanguageKey(currLanguageKey);
    // activate AD audio track
    changeAudioTrack(currLanguageKey, newLanguageKey);
  }

  function onAdvancedAudioDescriptionSelected(currLanguageKey: string): void {
    props.updateSelectionByLanguage?.(currLanguageKey, true, AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION);
    // restore audio track to normal if AD audio track was active
    changeAudioTrack(props.player.getActiveTracks()['audio']?.language || '', currLanguageKey);
  }

  function changeAudioTrack(currLanguageKey: string, newLanguageKey: string): void {
    const newAudioTrack = props.player?.getTracks('audio')?.find(t => t.language === newLanguageKey);
    if (currLanguageKey !== newLanguageKey && newAudioTrack) {
      props.player?.selectTrack(newAudioTrack);

      props.notifyClick?.({
        type: props.player.Track.AUDIO,
        track: newAudioTrack
      });
    }
  }

  return null;
};

function updateDefaultAudioDescription(props, audioDescriptionLanguages): boolean {
  if (!audioDescriptionLanguages?.length) return false;

  const audioDescription = getAudioDescriptionStateFromStorage();

  let isEnabledInStorage = null;
  let selectedTypeInStorage = null;
  if (audioDescription) {
    const {isEnabled, selectedType} = audioDescription;
    isEnabledInStorage = isEnabled;
    selectedTypeInStorage = selectedType;
  }

  const activeAudioLanguage = getActiveAudioLanguage(props.player);
  if (!isEnabledInStorage && selectedTypeInStorage === AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION) {
    props.updateAudioDescriptionEnabled?.(false);
    props.updateAudioDescriptionType(AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
    props.updateSelectionByLanguage(activeAudioLanguage, false, AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
    props.updateDefaultValueSet(true);

    return true;
  } else if (
    activeAudioLanguage &&
    audioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage)) &&
    (props.player.config.playback.prioritizeAudioDescription ||
      (isEnabledInStorage !== null && selectedTypeInStorage === AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION))
  ) {
    let isEnabled;
    if (props.player.config.playback.prioritizeAudioDescription || isEnabledInStorage === null) {
      isEnabled = true;
    } else {
      isEnabled = isEnabledInStorage;
    }

    props.updateAudioDescriptionEnabled?.(isEnabled);
    props.updateAudioDescriptionType(AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
    props.updateSelectionByLanguage(activeAudioLanguage, isEnabled, AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
    props.updateDefaultValueSet(true);

    const newLanguageKey = getAudioDescriptionLanguageKey(activeAudioLanguage);
    const newAudioTrack = props.player?.getTracks('audio')?.find(t => t.language === newLanguageKey);
    if (newAudioTrack) {
      props.player?.selectTrack(newAudioTrack);
    }

    return true;
  }

  return false;
}

function updateDefaultAdvancedAudioDescription(props, advancedAudioDescriptionLanguages, audioTracks): boolean {
  if (!advancedAudioDescriptionLanguages?.length) return false;

  const audioDescription = getAudioDescriptionStateFromStorage();

  let isEnabledInStorage = null;
  let selectedTypeInStorage = null;
  if (audioDescription) {
    const {isEnabled, selectedType} = audioDescription;
    isEnabledInStorage = isEnabled;
    selectedTypeInStorage = selectedType;
  }

  const activeAudioLanguage = getActiveAudioLanguage(props.player);

  const isActive = activeAudioLanguage && advancedAudioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage));
  const isNoAudioEAD = audioTracks?.filter(t => t.language !== '' || t.label !== '').length === 0 && advancedAudioDescriptionLanguages.length === 1;

  if (
    (isActive || isNoAudioEAD) &&
    (props.player.config.playback.prioritizeAudioDescription ||
      (isEnabledInStorage !== null && selectedTypeInStorage === AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION))
  ) {
    let isEnabled;
    if (props.player.config.playback.prioritizeAudioDescription || isEnabledInStorage === null) {
      isEnabled = true;
    } else {
      isEnabled = isEnabledInStorage;
    }

    props.updateAudioDescriptionEnabled?.(isEnabled);
    props.updateAudioDescriptionType(AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION);
    props.updateSelectionByLanguage(activeAudioLanguage, isEnabled, AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION);
    props.updateDefaultValueSet(true);

    return true;
  }

  return false;
}

const AudioDescriptionUpdater = connect(
  mapStateToProps,
  bindActions(actions)
)(
  withEventManager(
    withEventDispatcher(COMPONENT_NAME)(
      withPlayer(
        withText({
          audioDescriptionLabelText: 'settings.audioDescription',
          enableAudioDescriptionText: 'audioDescription.enableAudioDescription',
          disableAudioDescriptionText: 'audioDescription.disableAudioDescription',
          thereIsNoAudioDescriptionAvailableText: 'audioDescription.thereIsNoAudioDescriptionAvailable'
        })(_AudioDescriptionUpdater)
      )
    )
  )
);

AudioDescriptionUpdater.displayName = COMPONENT_NAME;

export {AudioDescriptionUpdater, updateDefaultAudioDescription, updateDefaultAdvancedAudioDescription};
