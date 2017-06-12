//@flow
import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/shell';
import Icon from '../icon/icon';

@connect(() => {}, bindActions(actions))
class Overlay extends Component {

  componentDidUpdate() {
    this.props.open ? this.props.addPlayerClass('overlay-active') : this.props.removePlayerClass('overlay-active');
  }

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
