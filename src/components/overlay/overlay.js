//@flow
import { h, Component } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/shell';
import { default as Icon, IconType } from '../icon';

@connect(null, bindActions(actions))
class Overlay extends Component {

  componentWillMount() {
    this.props.addPlayerClass('overlay-active');
  }

  componentWillUnmount() {
    this.props.removePlayerClass('overlay-active');
  }

  render(props: any) {
    var overlayClass = 'overlay';
    if (props.type) overlayClass += ` ${props.type}-overlay`;
    if (props.open) overlayClass += ' active'

    return (
      <div className={overlayClass} role='dialog'>
        <div className="overlay-contents">
          { props.children }
        </div>
        <Localizer>
          <a onClick={() => props.onClose()} aria-label={<Text id='core.close' />} className='close-overlay'><Icon type={IconType.Close} /></a>
        </Localizer>
      </div>
    )
  }
}

export default Overlay;
