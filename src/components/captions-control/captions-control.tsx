import {h, Fragment} from 'preact';
import {connect} from 'react-redux';
import {CaptionsMenu} from '../captions-menu';
import {ButtonControl} from '../button-control';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import style from '../../styles/style.scss';
import {Icon, IconType} from '../icon';
import {SmartContainer} from '../smart-container';
import {Text, withText} from 'preact-i18n';
import {useRef, useState, useEffect} from 'preact/hooks';
import {focusElement} from '../../utils';
import {createPortal} from 'preact/compat';
import {CVAAOverlay} from '../cvaa-overlay';
import {CaptionsControlMini} from './captions-control-mini';
import {getOverlayPortalElement} from '../overlay-portal';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  textTracks: state.engine.textTracks,
  showCCButton: state.config.showCCButton,
  openMenuFromCCButton: state.config.openMenuFromCCButton,
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  isCVAAOverlayOpen: state.shell.isCVAAOverlayOpen
});

const COMPONENT_NAME = 'CaptionsControl';

/**
 * CaptionsControl component
 *
 * @class CaptionsControl
 * @example <CaptionsControl />
 * @extends {Component}
 */
const CaptionsControl = connect(mapStateToProps)(
  withText({
    captionsLabelText: 'captions.captions'
  })((props, context) => {
    const [smartContainerOpen, setSmartContainerOpen] = useState(false);
    const [cvaaOverlay, setCVAAOverlay] = useState(false);
    const [ccOn, setCCOn] = useState(false);
    const buttonRef = useRef<HTMLElement>(null);
    const controlCaptionsElement = useRef<HTMLElement>(null);

    const {player} = context;
    const {isSmallSize, isMobile, textTracks} = props;
    const activeTextTrack = textTracks.find(textTrack => textTrack.active);

    const onControlButtonClick = (e?: KeyboardEvent, byKeyboard?: boolean): void => {
      setSmartContainerOpen(smartContainerOpen => !smartContainerOpen);
      if (byKeyboard && smartContainerOpen) {
        focusElement(buttonRef.current);
      }
    };

    const onKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Enter' || e.key === ' ' || e.keyCode === 13 || e.keyCode === 32) {
        e.preventDefault();
        onControlButtonClick(e, true);
      }
    };

    const toggleCVAAOverlay = (): void => {
      setCVAAOverlay(cvaaOverlay => !cvaaOverlay);
    };

    const onCVAAOverlayClose = (e?: KeyboardEvent, byKeyboard?: boolean): void => {
      toggleCVAAOverlay();
      onControlButtonClick(e, byKeyboard);
    };

    const handleClickOutside = (e: any) => {
      if (!isMobile && !isSmallSize && !!controlCaptionsElement.current && !controlCaptionsElement.current.contains(e.target)) {
        setSmartContainerOpen(false);
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }, [isSmallSize, isMobile]);

    useEffect(() => {
      setCCOn(activeTextTrack?.language !== 'off');
    }, [activeTextTrack]);

    const shouldRender = !!textTracks?.length && props.showCCButton && props.openMenuFromCCButton;
    props.onToggle(COMPONENT_NAME, shouldRender);
    if (!shouldRender) return undefined;

    return (
      <>
        <ButtonControl name={COMPONENT_NAME} ref={controlCaptionsElement}>
          <Tooltip label={props.captionsLabelText} type={props.classNames?.includes(style.upperBarIcon) ? 'bottom-left' : 'top'} strictPosition>
            <Button
              ref={buttonRef}
              tabIndex="0"
              aria-label={props.captionsLabelText}
              aria-haspopup="true"
              className={[style.controlButton, smartContainerOpen ? style.active : ''].join(' ')}
              onClick={onControlButtonClick}
              onKeyDown={onKeyDown}>
              <Icon type={ccOn ? IconType.ClosedCaptionsOn : IconType.ClosedCaptionsOff} />
            </Button>
          </Tooltip>
          {smartContainerOpen && !cvaaOverlay && (
            <SmartContainer targetId={player.config.targetId} onClose={() => setSmartContainerOpen(false)} title={<Text id="controls.language" />}>
              <CaptionsMenu asDropdown={false} onAdvancedCaptionsClick={toggleCVAAOverlay} />
            </SmartContainer>
          )}
          {cvaaOverlay ? createPortal(<CVAAOverlay onClose={onCVAAOverlayClose} />, getOverlayPortalElement(player)!) : <div />}
        </ButtonControl>
        <CaptionsControlMini {...props}/>
      </>
    );
  })
);

CaptionsControl.displayName = COMPONENT_NAME;
export {CaptionsControl};
