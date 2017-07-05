//@flow
import { h, Component } from 'preact';
import { isMobile } from '../../utils/is-mobile';
import Overlay from '../overlay/overlay';
import Portal from 'preact-portal';

class SmartContainer extends Component {

  render(props: any) {
    return isMobile() ? (
      <Portal into="#player-gui">
        <Overlay open onClose={() => props.onClose()}>
          <div className='title'>{props.title}</div>
          {props.children}
        </Overlay>
      </Portal>
    ) : (
      <div className='smart-container top left'>
        {props.children}
      </div>
    )
  }
}

export default SmartContainer;
