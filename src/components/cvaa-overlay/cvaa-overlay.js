//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import {actions as cvaaActions } from '../../reducers/cvaa';
import { actions as shellActions } from '../../reducers/shell';
import BaseComponent from '../base';
import Overlay from '../overlay/overlay';
import DropDown from '../dropdown/dropdown';

const mapStateToProps = state => ({
  open: state.cvaa.overlayOpen,
  style: state.cvaa.style
});

const cvaaOverlayState = {
  Main: 'main',
  CustomCaptions: 'custom-captions'
}

@connect(mapStateToProps, bindActions({...cvaaActions, ...shellActions}))
class CVAAOverlay extends BaseComponent {
  constructor() {
    super({name: 'CVAAOverlay'});
  }

  componentWillUnmount() {
    this.setState({
      state: cvaaOverlayState.Main
    });
  }

  componentWillMount() {
    this.setState({
      state: cvaaOverlayState.Main
    });
  }

  transitionToState(stateName: string) {
    this.setState({state: stateName});
  }

  changeCaptionsStyle(style: string) {
    this.props.removePlayerClass(`captions-${this.props.style}`);
    this.props.addPlayerClass(`captions-${style}`);
    this.props.updateCaptionsStyle(style);
    this.props.onClose();
  }

  renderMainState() {
    return (
      <div className={this.state.state === cvaaOverlayState.Main ? 'overlay-screen active' : 'overlay-screen'}>
        <div className='title'>
          Advanced captions settings
        </div>
        <div>
          <div className='sample' onClick={() => this.changeCaptionsStyle('default')}>Sample</div>
          <div className='sample black-bg' onClick={() => this.changeCaptionsStyle('black-bg')}>Sample</div>
          <div className='sample yellow-text' onClick={() => this.changeCaptionsStyle('yellow-text')}>Sample</div>
        </div>
        <a className='button-save-cvaa' onClick={() => this.transitionToState(cvaaOverlayState.CustomCaptions)}>Set custom caption</a>
      </div>
    )
  }

  renderCustomCaptionsState() {
    var speedOptions = [
      { value: 1, label: 'Auto (360)', active: true },
      { value: 2, label: '240' },
      { value: 3, label: '144' }
    ];

    return (
      <div className={this.state.state === cvaaOverlayState.CustomCaptions ? 'overlay-screen active' : 'overlay-screen'}>
        <form className='form custom-caption-form'>
          <div className='form-group-row'>
            <label>Size</label>
            <DropDown options={speedOptions} />
          </div>
          <div className='form-group-row'>
            <label>Font color</label>
            <DropDown options={speedOptions} />
          </div>
          <div className='form-group-row'>
            <label>Font opacity</label>
            <DropDown options={speedOptions} />
          </div>
          <div className='form-group-row'>
            <label>Font family</label>
            <DropDown options={speedOptions} />
          </div>
          <div className='form-group-row'>
            <label>Font style</label>
            <DropDown options={speedOptions} />
          </div>
          <div className='form-group-row'>
            <label>Background color</label>
            <DropDown options={speedOptions} />
          </div>
          <div className='form-group-row'>
            <label>Background opacity</label>
            <DropDown options={speedOptions} />
          </div>
          <div className='form-group-row'>
            <a className='btn btn-branded btn-block'>Apply</a>
          </div>
        </form>
      </div>
    )
  }

  render(props: any) {
    return (
      <Overlay open onClose={() => props.onClose()} type='cvaa'>
        {this.renderMainState()}
        {this.renderCustomCaptionsState()}
      </Overlay>
    )
  }
}

export default CVAAOverlay;
