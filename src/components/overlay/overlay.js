//@flow
import { h, Component } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/shell';
import Icon from '../icon/icon';

@connect(null, bindActions(actions))
class Overlay extends Component {

  componentWillMount() {
    console.log('componentWillMount');
    this.props.addPlayerClass('overlay-active');
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.props.removePlayerClass('overlay-active');
  }

  render(props: any) {
    var overlayClass = 'overlay';
    if (props.type) overlayClass += ` ${props.type}-overlay`;
    if (props.open) overlayClass += ' active'

    return (
      <div className={overlayClass} role='dialog'>
        <Localizer>
          <a onClick={() => props.onClose()} aria-label={<Text id='core.close' />} className='close-overlay'><Icon type='close' /></a>
        </Localizer>
        { props.children }
      </div>
    )
  }
}

export default Overlay;
