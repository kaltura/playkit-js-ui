//@flow
import { h, Component } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/shell';
import Icon from '../icon';

@connect(null, bindActions(actions))
class Overlay extends Component {
  _overlayElement: HTMLElement;

  componentWillMount() {
    this.props.addPlayerClass('overlay-active');
  }

  componentWillUnmount() {
    this.props.removePlayerClass('overlay-active');
  }

  componentDidMount() {
    this._overlayElement.focus();
  }

  render(props: any) {
    var overlayClass = 'overlay';
    if (props.type) overlayClass += ` ${props.type}-overlay`;
    if (props.open) overlayClass += ' active'

    return (
      <div
        className={overlayClass}
        role='dialog'
      >
        <Localizer>
          <button
            onClick={() => props.onClose()}
            ref={c => this._overlayElement=c}
            tabIndex='0' aria-label={<Text id='core.close' />}
            className='close-overlay'
          >
            <Icon type='close' />
          </button>
        </Localizer>
        <div className="overlay-contents">
          { props.children }
        </div>
      </div>
    )
  }
}

export default Overlay;
