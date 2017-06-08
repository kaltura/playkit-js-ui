//@flow
import { h, Component } from 'preact';
import Icon from '../icon/icon';

class Overlay extends Component {
  render(props) {
    var overlayClass = 'overlay';
    if (props.type) overlayClass += ` ${props.type}-overlay`;
    if (props.open) overlayClass += ' active'

    return (
      <div className={overlayClass}>
        <a onClick={() => props.onClose()} className='close-overlay'>
          <Icon type='close' />
        </a>
        { props.children }
      </div>
    )
  }
}

export default Overlay;
