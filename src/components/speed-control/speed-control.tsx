import {h} from 'preact';
import {connect} from 'react-redux';
import {useRef, useState, useEffect, useMemo} from 'preact/hooks';
import {withText} from 'preact-i18n';
import {ButtonControl} from '../button-control';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {Icon, IconType} from '../icon';
import {SmartContainer} from '../smart-container';
import {focusElement} from '../../utils';
import {isEnter, isSpace} from '../../utils/key-map';
import style from '../../styles/style.scss';
import {registerToBottomBar} from '../bottom-bar';
import {SpeedMenu} from '../../components';
import {withEventManager} from '../../event';


const mapStateToProps = state => ({
  showSpeedButton: state.config.showSpeedButton,
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  isLive: state.engine.isLive,
  metadataLoaded: state.engine.metadataLoaded
});

const COMPONENT_NAME = 'SpeedControl';

const SpeedControl = connect(mapStateToProps)(
  withText({
      speedLabelText: 'settings.speed'
  })((props, context) => {
    const {player} = context;
    const {isSmallSize, isMobile} = props;
    const controlSpeedElement = useRef<any>(null);
    const buttonRef = useRef<HTMLElement>(null);
    const [smartContainerOpen, setSmartContainerOpen] = useState(false);
    const [speedIconType, setSpeedIconType] = useState(IconType.Speed);

    useEffect(() => {
        registerToBottomBar(COMPONENT_NAME, player, () => registerComponent());
    }, []);

    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, [isSmallSize, isMobile]);

    useEffect(() => {
      onSpeedChange();
    }, [player.playbackRate]);

    const handleClickOutside = (e) => {
      if (!isMobile && !isSmallSize && controlSpeedElement.current && !controlSpeedElement.current.contains(e.target)) {
        setSmartContainerOpen(false);
      }
    };

    const onKeyDown = (e) => {
      if (isEnter(e) || isSpace(e)) {
        e.preventDefault();
        handleClick(true);
      }
    };

    const onClose = (event?: any, byKeyboard?: boolean): void => {
      setSmartContainerOpen(false)
      if (buttonRef && buttonRef.current && byKeyboard) {
        focusElement(buttonRef.current);
      }
    }

    const onSpeedChange = () => {
      if (player.playbackRate > 1) {
        setSpeedIconType(IconType.SpeedUp);
      } else if (player.playbackRate < 1) {
        setSpeedIconType(IconType.SpeedDown);
      } else {
        setSpeedIconType(IconType.Speed);
      }
    }

    const registerComponent = () =>  {
      return {
        ariaLabel: props.speedLabelText,
        displayName: COMPONENT_NAME,
        order: 5,
        svgIcon: { type: speedIconType },
        onClick: () => handleClick(false),
        component: () => <SpeedControl {...props} classNames={[style.upperBarIcon]} />,
        shouldHandleOnClick: false
     };
    };

    const handleClick = (isComponent) => {
      if (isComponent) {
        setSmartContainerOpen(prev => !prev);
        return;
      }

      const removeOverlay = player.ui.addComponent({
        label: 'speed-overlay',
        area: 'GuiArea',
        presets: ['Playback', 'Live'],
        get: () => (
        <SmartContainer targetId={player.config.targetId} onClose={() => removeOverlay()} title={props.speedLabelText} label={props.speedLabelText}>
            <SpeedMenu />
        </SmartContainer>
        )
      });
    };

    if (!props.metadataLoaded || !props.showSpeedButton || player.playbackRates.length <= 1 || props.isLive) { return null};

    return (
        <ButtonControl name={COMPONENT_NAME} ref={controlSpeedElement} className={props.classNames ? props.classNames.join(' ') : ''}>
          <Tooltip label={props.speedLabelText} type={props.classNames?.includes(style.upperBarIcon) ? 'bottom-left' : 'top'} strictPosition>
            <Button
              ref={buttonRef}
              tabIndex="0"
              aria-label={props.speedLabelText}
              aria-haspopup="true"
              className={[
                style.controlButton, 
                smartContainerOpen ? style.active : '',
              ].join(' ')}
              onClick={() => handleClick(true)}
              onKeyDown={onKeyDown}>
              <Icon type={speedIconType} />
            </Button>
          </Tooltip>
          {smartContainerOpen && (
            <SmartContainer targetId={player.config.targetId} onClose={onClose} title={props.speedLabelText} label={props.speedLabelText}>
              <SpeedMenu onClick={onClose}  />
            </SmartContainer>
          )}
        </ButtonControl> 
    );
  })
);

SpeedControl.displayName = COMPONENT_NAME;
export {SpeedControl};