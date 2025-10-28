import {useEffect, useState} from 'preact/hooks';
import {connect, useStore} from 'react-redux';
import {withPlayer} from '../player';
import {getAudioDescriptionLanguageKey, getAudioDescriptionStateFromStorage, getAudioLanguageKey} from '../../utils/audio-description';
import {AUDIO_DESCRIPTION_TYPE} from '../../types/reducers/audio-description';
import {registerToBottomBar, unregisterFromBottomBar} from '../bottom-bar';
import {registerComponent} from './audio-desc-mini';
import {AudioDesc} from './audio-desc';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/audio-description';
import {withEventDispatcher} from '../event-dispatcher';
import {withText} from 'preact-i18n';

const mapStateToProps = ({audioDescription, engine, config, bottomBar}) => ({
  controlsToMove: bottomBar.controlsToMove,
  audioDescriptionLanguages: audioDescription.audioDescriptionLanguages,
  advancedAudioDescriptionLanguages: audioDescription.advancedAudioDescriptionLanguages,
  openMenuFromAudioDescriptionButton: config.openMenuFromAudioDescriptionButton,
  audioTracks: engine.audioTracks
});

// This component is used to update the audio description state on entry change,
// and to register the audio description in the bottom bar.
// The button component doesn't always render (depends on configuration and available space),
// so we need a separate component which will react to every entry change and update the state accordingly.
const _AudioDescriptionActivator = props => {
  const {audioDescriptionLanguages, advancedAudioDescriptionLanguages, audioTracks} = props;
  const [isDefaultValueSet, setIsDefaultValueSet] = useState(false);
  const [isRegisteredToBottomBar, setIsRegisteredToBottomBar] = useState(true);

  const store = useStore();

  // reset flags on entry changed
  useEffect(() => {
    if (audioDescriptionLanguages.length === 0 && advancedAudioDescriptionLanguages.length === 0) {
      setIsDefaultValueSet(false);
      setIsRegisteredToBottomBar(false);
    }
  }, [audioDescriptionLanguages, advancedAudioDescriptionLanguages]);

  // handle register and unregister to bottom bar
  useEffect(() => {
    if (isRegisteredToBottomBar) return;

    unregisterFromBottomBar(AudioDesc.displayName, props.player);
    if (props.advancedAudioDescriptionLanguages.length > 0 || props.audioDescriptionLanguages.length > 0) {
      setIsRegisteredToBottomBar(true);
      registerToBottomBar(AudioDesc.displayName, props.player, () => registerComponent(props, store));
    }
  }, [props.player, advancedAudioDescriptionLanguages, audioDescriptionLanguages, isRegisteredToBottomBar]);

  // set default audio description on entry changed
  useEffect(() => {
    if (!audioDescriptionLanguages?.length) return;

    const audioDescription = getAudioDescriptionStateFromStorage();

    let isEnabledInStorage = null;
    let selectedTypeInStorage = null;
    if (audioDescription) {
      const {isEnabled, selectedType} = audioDescription;
      isEnabledInStorage = isEnabled;
      selectedTypeInStorage = selectedType;
    }

    const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');
    if (!isEnabledInStorage && selectedTypeInStorage === AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION) {
      props.updateAudioDescriptionEnabled?.(false);
      props.updateAudioDescriptionType(AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
      props.updateSelectionByLanguage(activeAudioLanguage, false, AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
      setIsDefaultValueSet(true);
    } else if (
      activeAudioLanguage &&
      !isDefaultValueSet &&
      audioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage)) &&
      (props.player.config.playback.prioritizeAudioDescription ||
        (isEnabledInStorage !== null && selectedTypeInStorage === AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION))
    ) {
      const isEnabled = isEnabledInStorage !== null ? isEnabledInStorage : true;

      props.updateAudioDescriptionEnabled?.(isEnabled);
      props.updateAudioDescriptionType(AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
      props.updateSelectionByLanguage(activeAudioLanguage, isEnabled, AUDIO_DESCRIPTION_TYPE.AUDIO_DESCRIPTION);
      setIsDefaultValueSet(true);

      const newLanguageKey = getAudioDescriptionLanguageKey(activeAudioLanguage);
      const newAudioTrack = props.player?.getTracks('audio')?.find(t => t.language === newLanguageKey);
      if (newAudioTrack) {
        props.player?.selectTrack(newAudioTrack);
      }
    }
  }, [audioDescriptionLanguages, isDefaultValueSet, audioTracks]);

  // set default extended audio description on entry changed
  useEffect(() => {
    if (!advancedAudioDescriptionLanguages?.length) return;

    const audioDescription = getAudioDescriptionStateFromStorage();

    let isEnabledInStorage = null;
    let selectedTypeInStorage = null;
    if (audioDescription) {
      const {isEnabled, selectedType} = audioDescription;
      isEnabledInStorage = isEnabled;
      selectedTypeInStorage = selectedType;
    }

    const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');

    if (
      activeAudioLanguage &&
      !isDefaultValueSet &&
      advancedAudioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage)) &&
      (props.player.config.playback.prioritizeAudioDescription ||
        (isEnabledInStorage !== null && selectedTypeInStorage === AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION))
    ) {
      const isEnabled = isEnabledInStorage !== null ? isEnabledInStorage : true;

      props.updateAudioDescriptionEnabled?.(isEnabled);
      props.updateAudioDescriptionType(AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION);
      props.updateSelectionByLanguage(activeAudioLanguage, isEnabled, AUDIO_DESCRIPTION_TYPE.EXTENDED_AUDIO_DESCRIPTION);
      setIsDefaultValueSet(true);
    }
  }, [advancedAudioDescriptionLanguages, isDefaultValueSet, audioTracks]);

  return null;
};

const AudioDescriptionActivator = withText({
  audioDescriptionLabelText: 'settings.audioDescription',
  enableAudioDescriptionText: 'audioDescription.enableAudioDescription',
  disableAudioDescriptionText: 'audioDescription.disableAudioDescription'
})(withEventDispatcher(AudioDesc.displayName)(withPlayer(connect(mapStateToProps, bindActions(actions))(_AudioDescriptionActivator))));

export {AudioDescriptionActivator};
