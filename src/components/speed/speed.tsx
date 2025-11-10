import {h} from 'preact';
import {useState} from 'preact/hooks';
import style from '../../styles/style.scss';
import {withPlayer} from '../player';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {ButtonControl} from '../button-control';
import {SmartContainer} from '../smart-container';
import {SpeedMenu} from '../speed-menu';
import {Icon, IconType} from '../icon';

const COMPONENT_NAME = 'Speed';

function _Speed(props): h.JSX.Element {
  function onKeyDown() {}
  function onControlButtonClick() {}

  const [smartContainerOpen, setSmartContainerOpen] = useState(false);

  return (
    <ButtonControl name={COMPONENT_NAME}>
      <Tooltip label={props.captionsLabelText} type={props.classNames?.includes(style.upperBarIcon) ? 'bottom-left' : 'top'} strictPosition>
        <Button
          tabIndex="0"
          aria-label={props.captionsLabelText}
          aria-haspopup="true"
          className={[style.controlButton, smartContainerOpen ? style.active : ''].join(' ')}
          onClick={onControlButtonClick}
          onKeyDown={onKeyDown}>
          <Icon type={IconType.Speed} />
        </Button>
      </Tooltip>
      {smartContainerOpen && (
        <SmartContainer targetId={props.player.config.targetId} onClose={() => setSmartContainerOpen(false)} title={<Text id="controls.language" />}>
          <SpeedMenu />
        </SmartContainer>
      )}
    </ButtonControl>
  );
}

const Speed = withPlayer(_Speed);

export {Speed};
