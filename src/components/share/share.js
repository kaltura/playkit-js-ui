//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/share';
import BaseComponent from '../base';
import Icon from '../icon/icon';

const mapStateToProps = state => ({
  overlayOpen: state.share.overlayOpen
});

@connect(mapStateToProps, bindActions(actions))
class ShareControl extends BaseComponent {

  constructor(obj: IControlParams) {
    super({name: 'Share', player: obj.player});
  }

  render(props) {
    return (
      <div className='control-button-container control-share'>
        <button className='control-button control-button-rounded' onClick={() => props.toggleShareOverlay(!props.overlayOpen)} aria-label='Share'>
          <Icon type='share' />
        </button>
      </div>
    )
  }
}

export default ShareControl;
