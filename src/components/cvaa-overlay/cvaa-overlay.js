//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/cvaa';
import BaseComponent from '../base';
import Overlay from '../overlay/overlay';

const mapStateToProps = state => ({
  open: state.cvaa.overlayOpen
});

@connect(mapStateToProps, bindActions(actions))
class CVAAOverlay extends BaseComponent {
  constructor() {
    super({name: 'CVAAOverlay'});
  }

  render(props) {
    return !props.open ? '' : (
      <Overlay open={props.open} onClose={() => props.toggleCVAAOverlay(false)} type='cvaa'>
        <div className='title'>
          Advanced captions settings
        </div>
        <div>
          <div className='sample'>Sample</div>
          <div className='sample black-bg'>Sample</div>
          <div className='sample yellow-text'>Sample</div>
        </div>
        <a className='button-save-cvaa'>Set custom caption</a>
      </Overlay>
    )
  }
}

export default CVAAOverlay;
