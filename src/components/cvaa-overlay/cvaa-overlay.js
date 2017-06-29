//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import {actions as cvaaActions } from '../../reducers/cvaa';
import { actions as shellActions } from '../../reducers/shell';
import BaseComponent from '../base';
import Overlay from '../overlay/overlay';
// import DropDownMenu from '../dropdown-menu/dropdown-menu';

const mapStateToProps = state => ({
  open: state.cvaa.overlayOpen,
  style: state.cvaa.style
});

@connect(mapStateToProps, bindActions({...cvaaActions, ...shellActions}))
class CVAAOverlay extends BaseComponent {
  constructor() {
    super({name: 'CVAAOverlay'});
  }

  changeCaptionsStyle(style) {
    this.props.removePlayerClass(`captions-${this.props.style}`);
    this.props.addPlayerClass(`captions-${style}`);
    this.props.updateCaptionsStyle(style);
    this.props.toggleCVAAOverlay(false);
  }

  render(props) {
    // var speedOptions = [
    //   { value: 1, label: 'Auto (360)', active: true },
    //   { value: 2, label: '240' },
    //   { value: 3, label: '144' }
    // ];
    return !props.open ? '' : (
      <Overlay open={props.open} onClose={() => props.toggleCVAAOverlay(false)} type='cvaa'>
        <div className='title'>
          Advanced captions settings
        </div>
        <div>
          <div className='sample' onClick={() => this.changeCaptionsStyle('default')}>Sample</div>
          <div className='sample black-bg' onClick={() => this.changeCaptionsStyle('black-bg')}>Sample</div>
          <div className='sample yellow-text' onClick={() => this.changeCaptionsStyle('yellow-text')}>Sample</div>
        </div>
        <a className='button-save-cvaa'>Set custom caption</a>
        {/*<div className='custom-caption-form'>
          <div className='row'>
            <label>Size</label>
            <DropDownMenu options={speedOptions} />
          </div>
        </div>*/}
      </Overlay>
    )
  }
}

export default CVAAOverlay;
