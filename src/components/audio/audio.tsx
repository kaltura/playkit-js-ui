import style from '../../styles/style.scss';
import {h, VNode} from 'preact';
import {useEffect, useRef, useState, useMemo} from 'preact/hooks';
import {withText} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {KeyCode} from '../../utils';
import {connect} from 'react-redux';
import {withPlayer} from '../player';
import {withLogger} from '../logger';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {ButtonControl} from '../button-control';
import {AudioMenu, SmartContainer} from '..';
import {withEventManager} from '../../event';
import {registerToBottomBar} from '../bottom-bar';
import {ReservedPresetNames} from '../../reducers/shell';

const mapStateToProps = state => {
  return {
    showAudioButton: state.config.showAudioButton,
    isMobile: state.shell.isMobile,
    isSmallSize: state.shell.isSmallSize,
    audioTracks: state.engine.audioTracks,
    audioDescriptionLanguages: state.audioDescription.audioDescriptionLanguages
  };
};

const COMPONENT_NAME = 'Audio';

const _Audio = (props: any) => {
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
    registerToBottomBar(Audio.displayName, props.player, () => registerComponent());
  }, []);

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
      ariaLabel: getComponentText,
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

  function getSvgIcon(): any {
    return {
      type: IconType.Audio
    };
  }

  function getComponentText(): any {
    return props.audioLabelText;
  }

  function handleClick(isComponent: boolean): void {
    // this is a full component and not just a dropdown menu icon
    if (isComponent) {
      setSmartContainerOpen(prev => !prev);
      return;
    }

    const removeOverlay = props.player.ui.addComponent({
      label: 'audio-overlay',
      area: 'GuiArea',
      presets: [ReservedPresetNames.Playback, ReservedPresetNames.Live],
      get: () => {
        return (
          <SmartContainer targetId={props.player.config.targetId} onClose={() => removeOverlay()} title={getComponentText()}>
            <AudioMenu />
          </SmartContainer>
        );
      }
    });
  }

  function onClose(): void {
    setSmartContainerOpen(false);
  }

  function onKeyDown(e: KeyboardEvent): void {
    if ([KeyCode.Enter, KeyCode.Space].includes(e.code)) {
      e.preventDefault();
      handleClick(true);
    }
  }

  const hasAudioOptions = useMemo(() => {
    return props.audioTracks?.filter(t => t.label || t.language).length > 1;
  }, [props.audioTracks]);
  if (!props.showAudioButton || !hasAudioOptions) return null;

  return (
    <ButtonControl ref={ref} name={COMPONENT_NAME} className={props.classNames ? props.classNames.join(' ') : ''}>
      <Tooltip label={props.audioLabelText} type={props.classNames?.includes(style.upperBarIcon) ? 'bottom-left' : 'top'} strictPosition>
        <Button
          tabIndex="0"
          aria-label={props.audioLabelText}
          className={style.controlButton}
          onClick={() => handleClick(true)}
          onKeyDown={onKeyDown}>
          <Icon type={IconType.Audio} />
        </Button>
      </Tooltip>
      {smartContainerOpen && (
        <SmartContainer targetId={props.player.config.targetId} onClose={onClose} title={getComponentText()}>
          <AudioMenu onClick={onClose} />
        </SmartContainer>
      )}
    </ButtonControl>
  );
};

const Audio = connect(mapStateToProps)(
  withPlayer(
    withEventManager(
      withLogger(COMPONENT_NAME)(
        withText({
          audioLabelText: 'settings.audio'
        })(_Audio)
      )
    )
  )
);

const getComponent = (props: any): VNode => <Audio {...props} />;

Audio.displayName = COMPONENT_NAME;

export {Audio};
