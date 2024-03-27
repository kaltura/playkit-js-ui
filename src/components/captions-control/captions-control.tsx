import {h} from 'preact';
import {connect, useSelector} from 'react-redux';
import {ClosedCaptions} from '../closed-captions';
import {CaptionsMenu} from '../captions-menu';
import {ButtonControl} from '../button-control';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import style from '../../styles/style.scss';
import {Icon, IconType} from '../icon';
import {SmartContainer} from '../smart-container';
import {Text, withText} from 'preact-i18n';
import {useRef, useState, useEffect, useCallback} from 'preact/hooks';
import {focusElement} from '../../utils';
import {createPortal} from 'preact/compat';
import {CVAAOverlay} from '../cvaa-overlay';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  textTracks: state.engine.textTracks,
  showCCButton: state.config.showCCButton,
  openMenuFromCCCButton: state.config.openMenuFromCCCButton,
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
    captionsLabelText: 'captions.captions',
    advancedCaptionsSettingsText: 'captions.advanced_captions_settings'
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

    const shouldRender = !!textTracks?.length && props.showCCButton;
    props.onToggle(COMPONENT_NAME, shouldRender);
    if (!shouldRender) return undefined;

    const targetId: HTMLDivElement | Document = (document.getElementById(player.config.targetId) as HTMLDivElement) || document;
    const portalSelector = `.overlay-portal`;

    return props.openMenuFromCCCButton ? (
      <ButtonControl name={COMPONENT_NAME} ref={controlCaptionsElement}>
        <Tooltip label={props.captionsLabelText}>
          <Button
            ref={buttonRef}
            tabIndex="0"
            aria-label={props.captionsLabelText}
            aria-haspopup="true"
            className={[style.controlButton, smartContainerOpen ? style.active : ''].join(' ')}
            onClick={onControlButtonClick}>
            <Icon type={ccOn ? IconType.ClosedCaptionsOn : IconType.ClosedCaptionsOff} />
          </Button>
        </Tooltip>
        {smartContainerOpen && !cvaaOverlay && (
          <SmartContainer targetId={player.config.targetId} onClose={() => setSmartContainerOpen(false)} title={<Text id="controls.language" />}>
            <CaptionsMenu asDropdown={false} onAdvancedCaptionsClick={toggleCVAAOverlay} />
          </SmartContainer>
        )}
        {cvaaOverlay ? createPortal(<CVAAOverlay onClose={onCVAAOverlayClose} />, targetId.querySelector(portalSelector)!) : <div />}
      </ButtonControl>
    ) : (
      <ClosedCaptions />
    );
  })
);

CaptionsControl.displayName = COMPONENT_NAME;
export {CaptionsControl};
