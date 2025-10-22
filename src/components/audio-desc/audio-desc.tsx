import style from '../../styles/style.scss';
import {Fragment, h} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';
import {withText} from 'preact-i18n';
import {Icon, IconType} from '../icon';
import {withEventDispatcher} from '../event-dispatcher';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {connect, useStore} from 'react-redux';
import {ButtonControl} from '../button-control';
import {bindActions, KeyCode} from '../../utils';
import {actions} from '../../reducers/audio-description';
import {registerToBottomBar, unregisterFromBottomBar} from '../bottom-bar';
import {withPlayer} from '../player';
import {AudioDescriptionMenu} from '../audio-description-menu';
import {SmartContainer} from '..';
import {withEventManager} from '../../event';
import {getAudioDescriptionLanguageKey, getAudioDescriptionStateFromStorage, getAudioLanguageKey} from '../../utils/audio-description';
import {AUDIO_DESCRIPTION_TYPE} from '../../types/reducers/audio-description';
import {ReservedPresetNames} from '../../reducers/shell';

const COMPONENT_NAME = 'AudioDesc';

const mapStateToProps = ({config, shell, audioDescription, engine}) => ({
  isMobile: shell.isMobile,
  isSmallSize: shell.isSmallSize,
  audioDescriptionLanguages: audioDescription.audioDescriptionLanguages,
  advancedAudioDescriptionLanguages: audioDescription.advancedAudioDescriptionLanguages,
  openMenuFromAudioDescriptionButton: config.openMenuFromAudioDescriptionButton,
  audioDescriptionEnabled: audioDescription.isEnabled,
  audioDescriptionType: audioDescription.selectedType,
  audioTracks: engine.audioTracks,
  isPlaybackStarted: engine.isPlaybackStarted,
  isRegisteredToBottomBar: audioDescription.isRegisteredToBottomBar,
  isDefaultValueSet: audioDescription.isDefaultValueSet
});

const _AudioDesc = (props: any) => {
  const ref = useRef<any>(null);
  const [smartContainerOpen, setSmartContainerOpen] = useState(false);
  const [clickHandlerAdded, setClickHandlerAdded] = useState(false);
  const [isClickOutside, setIsClickOutside] = useState(false);
  const [isDefaultValueSet, setIsDefaultValueSet] = useState(false);

  const store = useStore();

  const {eventManager, isSmallSize, isMobile, audioDescriptionLanguages, advancedAudioDescriptionLanguages, audioTracks, isRegisteredToBottomBar} =
    props;

  // // handle register and unregister to bottom bar
  useEffect(() => {
    if (shouldRender() && !isRegisteredToBottomBar) {
      registerToBottomBar(COMPONENT_NAME, props.player, () => registerComponent());
      props.updateIsRegisteredToBottomBar(true);
    }

    return unregisterFromBottomBar(COMPONENT_NAME, props.player);
  }, [props.player, isRegisteredToBottomBar, props.advancedAudioDescriptionLanguages, props.audioDescriptionLanguages]);

  useEffect(() => {
    if (!isRegisteredToBottomBar) {
      unregisterFromBottomBar(COMPONENT_NAME, props.player);
    }
  }, [isRegisteredToBottomBar]);

  // handle default audio description
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

  // handle click outside
  useEffect(() => {
    if (clickHandlerAdded) return;
    setClickHandlerAdded(true);
    eventManager.listen(document, 'click', e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsClickOutside(true);
      }
    });
  }, [eventManager, clickHandlerAdded]);

  useEffect(() => {
    if (!isClickOutside) return;

    if (!isMobile && !isSmallSize) {
      setSmartContainerOpen(false);
    }

    setIsClickOutside(false);
  }, [isClickOutside, isMobile, isSmallSize]);

  function registerComponent(): any {
    return {
      ariaLabel: () => (props.openMenuFromAudioDescriptionButton ? props.audioDescriptionLabelText : getComponentText()),
      displayName: COMPONENT_NAME,
      order: 5,
      svgIcon: getSvgIcon,
      onClick: () => handleClick(false),
      component: () => {
        return getComponent({...props, classNames: [style.upperBarIcon]});
      },
      shouldHandleOnClick: false
    };
  }

  function getComponentText(): any {
    return props.audioDescriptionEnabled ? props.disableAudioDescriptionText : props.enableAudioDescriptionText;
  }

  function getSvgIcon(): any {
    const {audioDescription} = store.getState();

    return {
      type: audioDescription.isEnabled ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription
    };
  }

  function shouldRender(): boolean {
    return props.advancedAudioDescriptionLanguages.length > 0 || props.audioDescriptionLanguages.length > 0;
  }

  function shouldActivate(): boolean {
    const {audioDescription} = store.getState();
    const {audioDescriptionLanguages, advancedAudioDescriptionLanguages} = audioDescription;

    const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');
    return (
      activeAudioLanguage &&
      (audioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage)) ||
        advancedAudioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage)))
    );
  }

  function handleClick(isComponent = false): void {
    const {audioDescription} = store.getState();
    const {isEnabled, selectedType} = audioDescription;

    const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');
    if (!shouldActivate()) {
      return;
    }

    if (!props.openMenuFromAudioDescriptionButton) {
      props.updateAudioDescriptionEnabled?.(!isEnabled);
      props.updateSelectionByLanguage(activeAudioLanguage, !isEnabled, selectedType);

      props.notifyClick({
        type: 'advancedAudioDescription',
        settings: false,
        isEnabled: !isEnabled,
        selectedType
      });
    } else if (isComponent) {
      setSmartContainerOpen(prev => !prev);
    } else {
      const removeOverlay = props.player.ui.addComponent({
        label: 'audio-overlay',
        area: 'GuiArea',
        presets: [ReservedPresetNames.Playback, ReservedPresetNames.Live],
        get: () => {
          return (
            <SmartContainer targetId={props.player.config.targetId} onClose={() => removeOverlay()} title={props.audioDescriptionLabelText}>
              <AudioDescriptionMenu />
            </SmartContainer>
          );
        }
      });
    }
  }

  function onKeyDown(e: KeyboardEvent): void {
    if ([KeyCode.Enter, KeyCode.Space].includes(e.code)) {
      e.preventDefault();
      onClick();
    }
  }

  function onClose(): void {
    setSmartContainerOpen(false);
  }

  if (!shouldRender()) return null;

  const innerButtonComponent = getButtonComponent(
    props.openMenuFromAudioDescriptionButton,
    ref,
    () => handleClick(true),
    onKeyDown,
    props.audioDescriptionEnabled,
    getComponentText(),
    props.classNames?.includes(style.upperBarIcon)
  );

  return (
    <Fragment>
      <ButtonControl
        ref={ref}
        name={COMPONENT_NAME}
        className={[!shouldActivate() ? style.audioDescDisabled : '', props.classNames ? props.classNames.join(' ') : ''].join(' ')}>
        {innerButtonComponent}
        {smartContainerOpen && props.openMenuFromAudioDescriptionButton && (
          <SmartContainer targetId={props.player.config.targetId} onClose={onClose} title={props.audioDescriptionLabelText}>
            <AudioDescriptionMenu />
          </SmartContainer>
        )}
      </ButtonControl>
    </Fragment>
  );
};

const getButtonComponent = (
  openMenuFromAudioDescriptionButton: boolean,
  innerRef: any,
  onClick: () => void,
  onKeyDown: (e: KeyboardEvent) => void,
  audioDescriptionEnabled: boolean,
  label: string,
  isUpperBarIcon: boolean
) => {
  return openMenuFromAudioDescriptionButton ? (
    <Button tabIndex="0" aria-label={label} className={`${style.controlButton}`} ref={innerRef} onClick={onClick} onKeyDown={onKeyDown}>
      <Icon type={audioDescriptionEnabled ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription} />
    </Button>
  ) : (
    <Tooltip label={label} type={isUpperBarIcon ? 'bottom-left' : 'top'} strictPosition>
      <Button tabIndex="0" aria-label={label} className={`${style.controlButton}`} ref={innerRef} onClick={onClick} onKeyDown={onKeyDown}>
        <Icon type={audioDescriptionEnabled ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription} />
      </Button>
    </Tooltip>
  );
};

const getComponent = (props: any) => {
  return <AudioDesc {...props} />;
};

const AudioDesc = connect(
  mapStateToProps,
  bindActions(actions)
)(
  withPlayer(
    withEventDispatcher(COMPONENT_NAME)(
      withEventManager(
        withText({
          audioDescriptionLabelText: 'settings.audioDescription',
          enableAudioDescriptionText: 'audioDescription.enableAudioDescription',
          disableAudioDescriptionText: 'audioDescription.disableAudioDescription'
        })(_AudioDesc)
      )
    )
  )
);

AudioDesc.displayName = COMPONENT_NAME;

export {AudioDesc};
