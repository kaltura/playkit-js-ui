import {createPortal} from 'preact/compat';
import {registerToBottomBar} from '../bottom-bar';
import {redux, ReservedPresetNames, style} from '../../index';
import {Icon, IconType} from '../icon';
import {h, VNode} from 'preact';
import {ButtonControl} from '../button-control';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {CVAAOverlay} from '../cvaa-overlay';
import {useState, useEffect} from 'preact/hooks';
import {connect} from 'react-redux';
import {Text} from 'preact-i18n';
import {CaptionsMenu} from '../captions-menu';
import {SmartContainer} from '../smart-container';
import {CaptionsControl} from './captions-control';

const mapStateToProps = state => ({
  controlsToMove: state.bottomBar.controlsToMove
});

const COMPONENT_NAME = 'CaptionsControlMini';
const CaptionsControlMini = connect(mapStateToProps)((props, context) => {
  const [shouldRender, setShouldRender] = useState(false);

  const {player} = context;
  const {controlsToMove} = props;
  const targetOverlayEl: HTMLDivElement | Document = (document.getElementById(player.config.targetId) as HTMLDivElement) || document;
  const portalSelector = `.overlay-portal`;
  let removeOverlay: any = null;

  useEffect(() => {
    registerToBottomBar(CaptionsControl.displayName, player, () => registerComponent());
  }, []);

  const registerComponent = (): any => {
    return {
      ariaLabel: props.captionsLabelText,
      displayName: COMPONENT_NAME,
      order: 5,
      svgIcon: {type: IconType.ClosedCaptionsOn},
      onClick: () => onButtonClick(),
      component: () => {
        return getComponent(props);
      },
      shouldHandleOnClick: false
    };
  };

  useEffect(() => {
    setShouldRender(controlsToMove.includes(CaptionsControl.displayName));
  }, [controlsToMove]);

  const isCaptionsEnabled = (): boolean => {
    return redux.useStore().getState().settings.isCaptionsEnabled;
  };

  const removeCaptionsOverlay = () => {
    if (removeOverlay) {
      removeOverlay();
      removeOverlay = null;
    }
  }

  const openCVAAOverlay = () => {
    removeCaptionsOverlay();
    removeOverlay = player.ui.addComponent({
      label: 'cvaa-overlay',
      area: 'GuiArea',
      presets: [ReservedPresetNames.Playback, ReservedPresetNames.Live],
      get: () => {
        return (
          createPortal(<CVAAOverlay onClose={() => removeCaptionsOverlay()}/>, targetOverlayEl.querySelector(portalSelector)!)
        )}
    });
  };

  const onButtonClick = () => {
    removeOverlay = player.ui.addComponent({
      label: 'captions-overlay',
      area: 'GuiArea',
      presets: [ReservedPresetNames.Playback, ReservedPresetNames.Live],
      get: () => {
        return (
        <SmartContainer targetId={player.config.targetId} onClose={() => removeCaptionsOverlay()} title={<Text id="controls.language" />}>
          <CaptionsMenu asDropdown={false} onAdvancedCaptionsClick={openCVAAOverlay}/>
        </SmartContainer>
        )}
    });
  };

  return shouldRender ? (
    <ButtonControl name={COMPONENT_NAME} className={style.upperBarIcon}>
      <Tooltip label={props.captionsLabelText}>
        <Button
          tabIndex="0"
          aria-label={props.captionsLabelText}
          aria-haspopup="true"
          className={style.controlButton}
          onClick={onButtonClick}>
          <Icon type={isCaptionsEnabled() ? IconType.ClosedCaptionsOn : IconType.ClosedCaptionsOff} />
        </Button>
      </Tooltip>
    </ButtonControl>
  ) : undefined;
});

const getComponent = (props: any): VNode => {
  return <CaptionsControlMini {...props} />;
}

CaptionsControlMini.displayName = COMPONENT_NAME;
export {CaptionsControlMini};
