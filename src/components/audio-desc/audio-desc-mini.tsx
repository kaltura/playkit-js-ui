import style from '../../styles/style.scss';
import {Fragment, h} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';
import {withText} from 'preact-i18n';
import {Icon, IconType} from '../icon';
import {withEventDispatcher} from '../event-dispatcher';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {connect} from 'react-redux';
import {ButtonControl} from '../button-control';
import {bindActions, KeyCode} from '../../utils';
import {actions} from '../../reducers/audio-description';
import {withPlayer} from '../player';
import {AudioDescriptionMenu} from '../audio-description-menu';
import {AudioDesc, SmartContainer} from '..';
import {withEventManager} from '../../event';
import {getAudioLanguageKey} from '../../utils/audio-description';
import {ReservedPresetNames} from '../../reducers/shell';

const COMPONENT_NAME = 'AudioDescMini';

const mapStateToProps = ({config, shell, audioDescription, engine}) => ({
  isMobile: shell.isMobile,
  isSmallSize: shell.isSmallSize,
  audioDescriptionLanguages: audioDescription.audioDescriptionLanguages,
  advancedAudioDescriptionLanguages: audioDescription.advancedAudioDescriptionLanguages,
  openMenuFromAudioDescriptionButton: config.openMenuFromAudioDescriptionButton,
  audioDescriptionEnabled: audioDescription.isEnabled,
  audioDescriptionType: audioDescription.selectedType,
  audioTracks: engine.audioTracks,
  isEnabled: audioDescription.isEnabled,
  selectedType: audioDescription.selectedType
});

const _AudioDescMini = (props: any) => {
  const ref = useRef<any>(null);
  const [smartContainerOpen, setSmartContainerOpen] = useState(false);
  const [isClickOutside, setIsClickOutside] = useState(false);
  const {eventManager, isSmallSize, isMobile} = props;

  // handle click outside
  useEffect(() => {
    function handleClickOutside(e): void {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsClickOutside(true);
      }
    }

    eventManager.unlisten(document, 'click', handleClickOutside);
    eventManager.listen(document, 'click', handleClickOutside);
  }, [eventManager]);

  useEffect(() => {
    if (!isClickOutside) return;

    if (!isMobile && !isSmallSize) {
      setSmartContainerOpen(false);
    }

    setIsClickOutside(false);
  }, [isClickOutside, isMobile, isSmallSize]);

  function shouldRender(): boolean {
    return props.advancedAudioDescriptionLanguages.length > 0 || props.audioDescriptionLanguages.length > 0;
  }

  function handleClick(): void {
    const {isEnabled, selectedType, audioDescriptionLanguages, advancedAudioDescriptionLanguages} = props;

    const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');
    if (!shouldActivate(activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages)) {
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
    } else {
      setSmartContainerOpen(prev => !prev);
    }
  }

  function onKeyDown(e: KeyboardEvent): void {
    if ([KeyCode.Enter, KeyCode.Space].includes(e.code)) {
      e.preventDefault();
      handleClick();
    }
  }

  function onClose(): void {
    setSmartContainerOpen(false);
  }

  if (!shouldRender()) return null;

  const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');

  const innerButtonComponent = getButtonComponent(
    props.openMenuFromAudioDescriptionButton,
    ref,
    handleClick,
    onKeyDown,
    props.audioDescriptionEnabled,
    props.audioDescriptionEnabled ? props.disableAudioDescriptionText : props.enableAudioDescriptionText,
    props.classNames?.includes(style.upperBarIcon),
    shouldActivate(activeAudioLanguage, props.audioDescriptionLanguages, props.advancedAudioDescriptionLanguages)
  );

  return (
    <Fragment>
      <ButtonControl
        ref={ref}
        name={COMPONENT_NAME}
        className={[
          !shouldActivate(activeAudioLanguage, props.audioDescriptionLanguages, props.advancedAudioDescriptionLanguages)
            ? style.audioDescDisabled
            : '',
          props.classNames ? props.classNames.join(' ') : ''
        ].join(' ')}>
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
  isUpperBarIcon: boolean,
  isActive: boolean
) => {
  let iconType = IconType.AdvancedAudioDescriptionActive;
  if (!isActive) {
    iconType = IconType.AdvancedAudioDescriptionDisabled;
  } else if (!audioDescriptionEnabled) {
    iconType = IconType.AdvancedAudioDescription;
  }

  return openMenuFromAudioDescriptionButton ? (
    <Button tabIndex="0" aria-label={label} className={`${style.controlButton}`} ref={innerRef} onClick={onClick} onKeyDown={onKeyDown}>
      <Icon color={isActive ? '' : '#888'} type={iconType} />
    </Button>
  ) : (
    <Tooltip label={label} type={isUpperBarIcon ? 'bottom-left' : 'top'} strictPosition>
      <Button tabIndex="0" aria-label={label} className={`${style.controlButton}`} ref={innerRef} onClick={onClick} onKeyDown={onKeyDown}>
        <Icon type={iconType} />
      </Button>
    </Tooltip>
  );
};

function getSvgIcon(store): any {
  const {audioDescription} = store.getState();

  return {
    type: audioDescription.isEnabled ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription
  };
}

function shouldActivate(activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages): boolean {
  return Boolean(
    activeAudioLanguage &&
      (audioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage)) ||
        advancedAudioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage)))
  );
}

function handleIconClick(props, store): void {
  const {audioDescription} = store.getState();
  const {isEnabled, selectedType, audioDescriptionLanguages, advancedAudioDescriptionLanguages} = audioDescription;

  const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');
  if (!shouldActivate(activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages)) {
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

function registerComponent(props, store): any {
  const menuButtonLabel = props.isEnabled ? props.disableAudioDescriptionText : props.enableAudioDescriptionText;

  return {
    ariaLabel: () => (props.openMenuFromAudioDescriptionButton ? props.audioDescriptionLabelText : menuButtonLabel),
    displayName: AudioDesc.displayName,
    order: 5,
    svgIcon: () => getSvgIcon(store),
    onClick: () => handleIconClick(props, store),
    component: (): any => {
      return getComponent({...props, classNames: [style.upperBarIcon]});
    },
    shouldHandleOnClick: false
  };
}

const getComponent = (props: any) => {
  return <AudioDescMini {...props} />;
};

const AudioDescMini = connect(
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
        })(_AudioDescMini)
      )
    )
  )
);

AudioDescMini.displayName = COMPONENT_NAME;

export {AudioDescMini, registerComponent};
