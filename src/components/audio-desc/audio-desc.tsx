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
import {SmartContainer} from '..';
import {withEventManager} from '../../event';
import {getActiveAudioLanguage} from '../../utils/audio-description';

const COMPONENT_NAME = 'AudioDesc';

const mapStateToProps = ({config, shell, audioDescription, engine}) => ({
  isMobile: shell.isMobile,
  isSmallSize: shell.isSmallSize,
  audioDescriptionLanguages: audioDescription.audioDescriptionLanguages,
  advancedAudioDescriptionLanguages: audioDescription.advancedAudioDescriptionLanguages,
  openMenuFromAudioDescriptionButton: config.openMenuFromAudioDescriptionButton,
  audioTracks: engine.audioTracks,
  isPlaybackStarted: engine.isPlaybackStarted,
  isEnabled: audioDescription.isEnabled,
  selectedType: audioDescription.selectedType,
  showAudioDescriptionButton: config.showAudioDescriptionButton
});

const _AudioDesc = (props: any) => {
  const ref = useRef<any>(null);
  const [smartContainerOpen, setSmartContainerOpen] = useState(false);
  const [clickHandlerAdded, setClickHandlerAdded] = useState(false);
  const [isClickOutside, setIsClickOutside] = useState(false);

  const {eventManager, isSmallSize, isMobile, audioDescriptionLanguages, advancedAudioDescriptionLanguages, isEnabled, selectedType} = props;

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

  function getComponentText(): any {
    const activeAudioLanguage = getActiveAudioLanguage(props.player);
    const isActive = shouldActivate();

    if (!isActive) {
      return props.thereIsNoAudioDescriptionAvailableText + ` (${activeAudioLanguage})`;
    } else if (props.openMenuFromAudioDescriptionButton) {
      return props.audioDescriptionLabelText;
    } else {
      return props.isEnabled ? props.disableAudioDescriptionText : props.enableAudioDescriptionText;
    }
  }

  function shouldRender(): boolean {
    return props.showAudioDescriptionButton && (props.advancedAudioDescriptionLanguages.length > 0 || props.audioDescriptionLanguages.length > 0);
  }

  function shouldActivate(): boolean {
    const activeAudioLanguage = getActiveAudioLanguage(props.player);
    return Boolean(
      activeAudioLanguage &&
        (audioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage)) ||
          advancedAudioDescriptionLanguages.find(lang => lang.startsWith(activeAudioLanguage)))
    );
  }

  function onClick(): void {
    if (!shouldActivate()) {
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
    onClick,
    onKeyDown,
    props.isEnabled,
    getComponentText(),
    props.classNames?.includes(style.upperBarIcon),
    shouldActivate()
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
  isEnabled: boolean,
  label: string,
  isUpperBarIcon: boolean,
  isActive: boolean
) => {
  let iconType = IconType.AdvancedAudioDescriptionActive;
  if (!isActive) {
    iconType = IconType.AdvancedAudioDescriptionDisabled;
  } else if (!isEnabled) {
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
          disableAudioDescriptionText: 'audioDescription.disableAudioDescription',
          thereIsNoAudioDescriptionAvailableText: 'audioDescription.thereIsNoAudioDescriptionAvailable'
        })(_AudioDesc)
      )
    )
  )
);

AudioDesc.displayName = COMPONENT_NAME;

export {AudioDesc};
