import {h} from 'preact';
import {connect} from 'react-redux';
import {useRef, useState, useEffect, useMemo} from 'preact/hooks';
import {withText} from 'preact-i18n';
import {ButtonControl} from '../button-control';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {Icon, IconType, BadgeType} from '../icon';
import {SmartContainer} from '../smart-container';
import {QualityMenu} from '../quality-menu';
import {focusElement} from '../../utils';
import {isEnter, isSpace} from '../../utils/key-map';
import style from '../../styles/style.scss';
import {registerToBottomBar} from '../bottom-bar';
import {getLabelBadgeType} from '../../components';

const mapStateToProps = state => ({
  showQualityButton: state.config.showQualityButton,
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  videoTracks: state.engine.videoTracks
});

const COMPONENT_NAME = 'QualityControl';

const QualityControl = connect(mapStateToProps)(
  withText({
    qualityLabelText: 'settings.quality',
    qualityHdLabel: 'settings.qualityHdLabel',
    quality4kLabel: 'settings.quality4kLabel',
    quality8kLabel: 'settings.quality8kLabel'
  })((props, context) => {
    const controlQualityElement = useRef<any>(null);
    const buttonRef = useRef<HTMLElement>(null);
    const [smartContainerOpen, setSmartContainerOpen] = useState(false);

    const {player} = context;
    const {isSmallSize, isMobile, videoTracks} = props;

    const handleClickOutside = (e) => {
      if (!isMobile && !isSmallSize && controlQualityElement.current && !controlQualityElement.current.contains(e.target)) {
        setSmartContainerOpen(false);
      }
    };

    useEffect(() => {
        registerToBottomBar(COMPONENT_NAME, player, () => registerComponent());
    }, []);

    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, [isSmallSize, isMobile]);

    const onKeyDown = (e) => {
      if (isEnter(e) || isSpace(e)) {
        e.preventDefault();
        handleClick(true);
      }
    };

    const registerComponent = () =>  {
      return {
        ariaLabel: props.qualityLabelText,
        displayName: COMPONENT_NAME,
        order: 5,
        svgIcon: { type: IconType.QualityButton },
        onClick: () => handleClick(false),
        component: () => <QualityControl {...props} classNames={[style.upperBarIcon]} />,
        shouldHandleOnClick: false
     };
    };

    const handleClick = (isComponent) => {
      if (isComponent) {
        setSmartContainerOpen(prev => !prev);
        return;
      }

      const removeOverlay = player.ui.addComponent({
        label: 'quality-overlay',
        area: 'GuiArea',
        presets: ['Playback', 'Live'],
        get: () => (
        <SmartContainer targetId={player.config.targetId} onClose={() => removeOverlay()} title={props.qualityLabelText}>
            <QualityMenu />
        </SmartContainer>
        )
      });
    };

    const hasQualityOptions = useMemo(() => {
      return videoTracks?.length > 1;
    }, [videoTracks]);

    const getButtonBadgeType = (): string | null => {
        const activeVideoTrackHeight: number = player.getActiveTracks()?.video?.height;
        return activeVideoTrackHeight ? getLabelBadgeType(activeVideoTrackHeight) : null;
    };

    const getQualityLabel = (buttonBadgeType): string => {
      switch (buttonBadgeType) {
        case 'qualityHd':
          return props.qualityHdLabel;
        case 'quality4k':
          return props.quality4kLabel;
        case 'quality8k':
          return props.quality8kLabel;
        default:
          return props.qualityLabelText;
        }
    };

    const onClose = (event?: any, byKeyboard?: boolean): void => {
      setSmartContainerOpen(false)
      if (buttonRef && buttonRef.current && byKeyboard) {
        focusElement(buttonRef.current);
      }
    }

    if (!props.showQualityButton || !hasQualityOptions) return null;

    const buttonBadgeType: string = getButtonBadgeType() || '';
    const buttonAriaLabel = `${getQualityLabel(buttonBadgeType)}`;

    return (
        <ButtonControl name={COMPONENT_NAME} ref={controlQualityElement} className={props.classNames ? props.classNames.join(' ') : ''}>
          <Tooltip label={props.qualityLabelText} type={props.classNames?.includes(style.upperBarIcon) ? 'bottom-left' : 'top'} strictPosition>
            <Button
              ref={buttonRef}
              tabIndex="0"
              aria-label={buttonAriaLabel}
              className={[
                style.controlButton, 
                style.buttonBadge,
                smartContainerOpen ? style.active : '',
                BadgeType[buttonBadgeType + 'Active'],
              ].join(' ')}
              onClick={(e) => handleClick(true)}
              onKeyDown={onKeyDown}>
              <Icon type={IconType.QualityButton} />
            </Button>
          </Tooltip>
          {smartContainerOpen && (
            <SmartContainer targetId={player.config.targetId} onClose={onClose} title={props.qualityLabelText}>
              <QualityMenu onClick={onClose}  />
            </SmartContainer>
          )}
        </ButtonControl>
    );
  })
);

QualityControl.displayName = COMPONENT_NAME;
export {QualityControl};