import style from '../../styles/style.scss';
import {Fragment, h} from 'preact';
import {useEffect, useRef, useState} from 'preact/hooks';
import {Icon, IconType} from '../icon';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {connect, useStore} from 'react-redux';
import {ButtonControl} from '../button-control';
import {bindActions, KeyCode} from '../../utils';
import {actions} from '../../reducers/audio-description';
import {AudioDescriptionMenu} from '../audio-description-menu';
import {AudioDesc, SmartContainer} from '..';
import {getAudioLanguageKey} from '../../utils/audio-description';
import {ReservedPresetNames} from '../../reducers/shell';

const COMPONENT_NAME = 'AudioDescMini';

const _AudioDescMini = (props: any) => {
  const ref = useRef<any>(null);
  const [smartContainerOpen, setSmartContainerOpen] = useState(false);
  const [isClickOutside, setIsClickOutside] = useState(false);

  const {eventManager, isSmallSize, isMobile} = props;

  const store = useStore();

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
    const {audioDescriptionLanguages, advancedAudioDescriptionLanguages} = props;
    const isEnabled = store.getState().audioDescription.isEnabled;
    const selectedType = store.getState().audioDescription.selectedType;

    const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');
    if (!shouldActivate(activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages)) {
      return;
    }

    if (!props.openMenuFromAudioDescriptionButton) {
      props.updateAudioDescriptionEnabled?.(!isEnabled);

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
  const icon = getSvgIcon(props, store);

  const innerButtonComponent = getButtonComponent(
    props.openMenuFromAudioDescriptionButton,
    ref,
    handleClick,
    onKeyDown,
    getComponentText(props, store),
    props.classNames?.includes(style.upperBarIcon),
    shouldActivate(activeAudioLanguage, props.audioDescriptionLanguages, props.advancedAudioDescriptionLanguages),
    icon
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
  label: string,
  isUpperBarIcon: boolean,
  isActive: boolean,
  icon
) => {
  return openMenuFromAudioDescriptionButton ? (
    <Button tabIndex="0" aria-label={label} className={`${style.controlButton}`} ref={innerRef} onClick={onClick} onKeyDown={onKeyDown}>
      <Icon color={isActive ? '' : '#888'} type={icon.type} />
    </Button>
  ) : (
    <Tooltip label={label} type={isUpperBarIcon ? 'bottom-left' : 'top'} strictPosition>
      <Button tabIndex="0" aria-label={label} className={`${style.controlButton}`} ref={innerRef} onClick={onClick} onKeyDown={onKeyDown}>
        <Icon type={icon.type} />
      </Button>
    </Tooltip>
  );
};

function getSvgIcon(props, store, isDropdown = false): any {
  const {audioDescription} = store.getState();
  const {isEnabled, audioDescriptionLanguages, advancedAudioDescriptionLanguages} = audioDescription;
  const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');
  const isActive = shouldActivate(activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages);

  let type = IconType.AdvancedAudioDescriptionActive;
  if (!isActive) {
    type = isDropdown ? IconType.AdvancedAudioDescriptionDisabledDropdown : IconType.AdvancedAudioDescriptionDisabled;
  } else if (!isEnabled) {
    type = IconType.AdvancedAudioDescription;
  }

  return {
    type
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

function getComponentText(props, store): any {
  const {audioDescriptionLanguages, advancedAudioDescriptionLanguages} = store.getState().audioDescription;
  const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');

  const isActive = shouldActivate(activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages);

  if (!isActive) {
    return props.thereIsNoAudioDescriptionAvailableText + ` (${activeAudioLanguage})`;
  } else if (props.openMenuFromAudioDescriptionButton) {
    return props.audioDescriptionLabelText;
  } else {
    return props.isEnabled ? props.disableAudioDescriptionText : props.enableAudioDescriptionText;
  }
}

function registerComponent(props, store): any {
  return {
    label: props.audioDescriptionLabelText,
    ariaLabel: () => getComponentText(props, store),
    displayName: AudioDesc.displayName,
    order: 5,
    svgIcon: () => getSvgIcon(props, store, true),
    onClick: () => handleIconClick(props, store),
    component: (): any => {
      return getComponent({...props, classNames: [style.upperBarIcon]});
    },
    isDisabled: (): boolean => {
      const {audioDescriptionLanguages, advancedAudioDescriptionLanguages} = store.getState().audioDescription;
      const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');
      return !shouldActivate(activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages);
    },
    shouldHandleOnClick: false
  };
}

const getComponent = (props: any) => {
  return <AudioDescMini {...props} />;
};

const AudioDescMini = connect(bindActions(actions))(_AudioDescMini);

AudioDescMini.displayName = COMPONENT_NAME;

export {AudioDescMini, registerComponent};
