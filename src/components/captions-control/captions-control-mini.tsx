import {createPortal, useEffect} from 'preact/compat';
import {registerToBottomBar} from '../bottom-bar';
import {redux, ReservedPresetNames, style} from '../../index';
import {Icon, IconType} from '../icon';
import {h, VNode} from 'preact';
import {ButtonControl} from '../button-control';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {CVAAOverlay} from '../cvaa-overlay';
import {useState} from 'preact/hooks';
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
  const targetId: HTMLDivElement | Document = (document.getElementById(player.config.targetId) as HTMLDivElement) || document;
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
        return getComp(props);
      },
      selfManagement: true
    };
  };

  useEffect(() => {
    setShouldRender(controlsToMove.includes(CaptionsControl.displayName));
  }, [controlsToMove]);

  const getIsTextOnFromStore = (): boolean => {
    return redux.useStore().getState().settings.isTextOn;
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
          createPortal(<CVAAOverlay onClose={() => removeCaptionsOverlay()}/>, targetId.querySelector(portalSelector)!)
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
          <Icon type={getIsTextOnFromStore() ? IconType.ClosedCaptionsOn : IconType.ClosedCaptionsOff} />
        </Button>
      </Tooltip>
    </ButtonControl>
  ) : undefined;
});

const getComp = (props: any): VNode => {
  return <CaptionsControlMini {...props} />;
}

CaptionsControlMini.displayName = COMPONENT_NAME;
export {CaptionsControlMini};
