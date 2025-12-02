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
import {getActiveAudioLanguage} from '../../utils/audio-description';
import {ReservedPresetNames} from '../../reducers/shell';

const COMPONENT_NAME = 'AudioDescMini';

// the props that are coming from AudioDescriptionUpdater won't be up-to-date,
// because they are set at the point of registration to the bottom bar.
// to trigger re-render when audioDescription state changes, we bind it to a new prop.
const mapStateToProps = (state: any) => ({
  audioDescription: state.audioDescription
});

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
    const {audioDescriptionLanguages, advancedAudioDescriptionLanguages} = store.getState().audioDescription;
    return advancedAudioDescriptionLanguages.length > 0 || audioDescriptionLanguages.length > 0;
  }

  function handleClick(): void {
    const {engine} = store.getState();
    const {isEnabled, selectedType, audioDescriptionLanguages, advancedAudioDescriptionLanguages} = store.getState().audioDescription;

    const activeAudioLanguage = getActiveAudioLanguage(props.player);
    if (!shouldActivate(engine.audioTracks, activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages)) {
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

  const {engine} = store.getState();
  const activeAudioLanguage = getActiveAudioLanguage(props.player);
  const icon = getSvgIcon(props, store);
  const {audioDescriptionLanguages, advancedAudioDescriptionLanguages} = store.getState().audioDescription;

  const innerButtonComponent = getButtonComponent(
    props.openMenuFromAudioDescriptionButton,
    ref,
    handleClick,
    onKeyDown,
    getComponentText(props, store),
    props.classNames?.includes(style.upperBarIcon),
    shouldActivate(engine.audioTracks, activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages),
    icon
  );

  return (
    <Fragment>
      <ButtonControl
        ref={ref}
        name={COMPONENT_NAME}
        className={[
          !shouldActivate(engine.audioTracks, activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages)
            ? style.audioDescDisabled
            : '',
          props.classNames ? props.classNames.join(' ') : ''
        ].join(' ')}>
        {innerButtonComponent}
        {smartContainerOpen && props.openMenuFromAudioDescriptionButton && (
          <SmartContainer targetId={props.player.config.targetId} onClose={onClose} title={props.audioDescriptionLabelText}>
            <AudioDescriptionMenu onClick={onClose} />
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
        <Icon color={isActive ? '' : '#888'} type={icon.type} />
      </Button>
    </Tooltip>
  );
};

function getSvgIcon(props, store, isDropdown = false): any {
  const {audioDescription, engine} = store.getState();
  const {isEnabled, audioDescriptionLanguages, advancedAudioDescriptionLanguages} = audioDescription;
  const activeAudioLanguage = getActiveAudioLanguage(props.player);
  const isActive = shouldActivate(engine.audioTracks, activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages);

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

function shouldActivate(audioTracks, activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages): boolean {
  const isEADWithoutAudioTracks = audioTracks.length === 0 && advancedAudioDescriptionLanguages.length === 1;
  const isActive =
    activeAudioLanguage &&
    Boolean(
      audioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage)) ||
        advancedAudioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage))
    );

  return isActive || isEADWithoutAudioTracks;
}

function handleIconClick(props, store): void {
  const {audioDescription, engine} = store.getState();
  const {isEnabled, selectedType, audioDescriptionLanguages, advancedAudioDescriptionLanguages} = audioDescription;

  const activeAudioLanguage = getActiveAudioLanguage(props.player);
  if (!shouldActivate(engine.audioTracks, activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages)) {
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
  const {engine} = store.getState();
  const {audioDescriptionLanguages, advancedAudioDescriptionLanguages, isEnabled} = store.getState().audioDescription;
  const activeAudioLanguage = getActiveAudioLanguage(props.player);

  const isActive = shouldActivate(engine.audioTracks, activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages);
  if (!isActive) {
    return `${props.thereIsNoAudioDescriptionAvailableText} (${activeAudioLanguage})`;
  } else if (props.openMenuFromAudioDescriptionButton) {
    return props.audioDescriptionLabelText;
  } else {
    return isEnabled ? props.disableAudioDescriptionText : props.enableAudioDescriptionText;
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
      const {engine} = store.getState();
      const {audioDescriptionLanguages, advancedAudioDescriptionLanguages} = store.getState().audioDescription;
      const activeAudioLanguage = getActiveAudioLanguage(props.player);
      return !shouldActivate(engine.audioTracks, activeAudioLanguage, audioDescriptionLanguages, advancedAudioDescriptionLanguages);
    },
    shouldHandleOnClick: false
  };
}

const getComponent = (props: any) => {
  return <AudioDescMini {...props} />;
};

const AudioDescMini = connect(mapStateToProps, bindActions(actions))(_AudioDescMini);

AudioDescMini.displayName = COMPONENT_NAME;

export {AudioDescMini, registerComponent};
