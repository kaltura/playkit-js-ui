import style from '../../styles/style.scss';
import {h} from 'preact';
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
import {registerToBottomBar} from '../bottom-bar';
import {withPlayer} from '../player';
import {AudioDescriptionMenu} from '../audio-description-menu';
import {SmartContainer} from '..';
import {withEventManager} from '../../event';
import {getAudioLanguageKey} from '../../utils/audio-description';

const COMPONENT_NAME = 'AudioDesc';

const mapStateToProps = ({config, shell, audioDescription}) => ({
  isMobile: shell.isMobile,
  isSmallSize: shell.isSmallSize,
  audioDescriptionLanguages: audioDescription.audioDescriptionLanguages,
  advancedAudioDescriptionLanguages: audioDescription.advancedAudioDescriptionLanguages,
  openMenuFromAudioDescriptionButton: config.openMenuFromAudioDescriptionButton,
  audioDescriptionEnabled: audioDescription.isEnabled
});

const _AudioDesc = (props: any) => {
  const ref = useRef<any>(null);
  const [smartContainerOpen, setSmartContainerOpen] = useState(false);
  const [clickHandlerAdded, setClickHandlerAdded] = useState(false);
  const [isClickOutside, setIsClickOutside] = useState(false);

  const {eventManager, isSmallSize, isMobile} = props;

  useEffect(() => {
    if (!isClickOutside) return;

    if (!isMobile && !isSmallSize) {
      setSmartContainerOpen(false);
    }

    setIsClickOutside(false);
  }, [isClickOutside, isMobile, isSmallSize]);

  useEffect(() => {
    registerToBottomBar(COMPONENT_NAME, props.player, () => registerComponent());
  }, [props.player]);

  useEffect(() => {
    if (clickHandlerAdded) return;
    setClickHandlerAdded(true);
    eventManager.listen(document, 'click', e => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsClickOutside(true);
      }
    });
  }, [eventManager, clickHandlerAdded]);

  function registerComponent(): any {
    return {
      ariaLabel: () => getComponentText(),
      displayName: COMPONENT_NAME,
      order: 5,
      svgIcon: () => getSvgIcon(),
      onClick: () => onClick(),
      component: () => {
        return getComponent({...props, classNames: [style.upperBarIcon]});
      },
      shouldHandleOnClick: false
    };
  }

  function getComponentText(): any {
    return props.audioDescriptionEnabled ? props.enableAudioDescriptionText : props.disableAudioDescriptionText;
  }

  function getSvgIcon(): any {
    return {
      type: props.audioDescriptionEnabled ? IconType.AdvancedAudioDescriptionActive : IconType.AdvancedAudioDescription
    };
  }

  function shouldRender(): boolean {
    return props.advancedAudioDescriptionLanguages.length > 0 || props.audioDescriptionLanguages.length > 0;
  }

  function onClick(): void {
    const activeAudioLanguage = getAudioLanguageKey(props.player.getActiveTracks()['audio']?.language || '');
    if (
      !activeAudioLanguage ||
      !(props.audioDescriptionLanguages.includes(activeAudioLanguage) || props.advancedAudioDescriptionLanguages.includes(activeAudioLanguage))
    ) {
      return;
    }
    if (!props.openMenuFromAudioDescriptionButton) {
      props.updateAudioDescriptionEnabled?.(!props.audioDescriptionEnabled);
    }
    setSmartContainerOpen(prev => !prev);
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
    props.audioDescriptionEnabled,
    getComponentText(),
    props.classNames?.includes(style.upperBarIcon)
  );

  return (
    <ButtonControl ref={ref} name={COMPONENT_NAME} className={[style.noIdleControl, props.classNames ? props.classNames.join(' ') : ''].join(' ')}>
      {innerButtonComponent}
      {smartContainerOpen && props.openMenuFromAudioDescriptionButton && (
        <SmartContainer targetId={props.player.config.targetId} onClose={onClose} title={props.audioDescriptionLabelText}>
          <AudioDescriptionMenu />
        </SmartContainer>
      )}
    </ButtonControl>
  );
};

const getButtonComponent = (
  openMenuFromAudioDescriptionButton: boolean,
  innerRef: any,
  onClick: (e: MouseEvent) => void,
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
