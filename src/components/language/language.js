//@flow
import { h } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/cvaa';
import BaseComponent from '../base';
import SmartContainer from '../smart-container/smart-container';
import SmartContainerItem from '../smart-container/smart-container-item';
import Icon from '../icon/icon';

const mapStateToProps = state => ({
  audioTracks: state.engine.audioTracks,
  textTracks: state.engine.textTracks,
  overlayOpen: state.cvaa.overlayOpen
});

@connect(mapStateToProps, bindActions(actions))
class LanguageControl extends BaseComponent {
  constructor(obj: IControlParams) {
    super({name: 'LanguageControl', player: obj.player});
  }

  componentDidMount() {
    this.setState({smartContainerOpen: false});
  }

  onControlButtonClick() {
    this.setState({smartContainerOpen: !this.state.smartContainerOpen});
  }

  onAudioChange(audioTrack) {
    this.player.selectTrack(audioTrack);
  }

  onCaptionsChange(textTrack) {
    this.player.selectTrack(textTrack);
  }

  render(props) {
    var audioOptions = props.audioTracks.map(t => ({ label: t.label || t.language, active: t.active, value: t }));
    var textOptions = props.textTracks.filter(t => t.kind === 'subtitles').map(t => ({ label: t.label || t.language, active: t.active, value: t }));

    return props.audioTracks.length === 0 && props.audioTracks.length === 0 ? false : (
      <div className='control-button-container control-language'>
        <Localizer>
          <button aria-label={<Text id='controls.language' />} className={this.state.smartContainerOpen ? 'control-button active' : 'control-button'} onClick={() => this.onControlButtonClick()}>
            <Icon type='language' />
          </button>
        </Localizer>
        { !this.state.smartContainerOpen ? '' :
        <SmartContainer>
          {
            props.audioTracks.length <= 0 ? '' :
            <Localizer>
              <SmartContainerItem label={<Text id='language.audio' />} options={audioOptions} onSelect={audioTrack => this.onAudioChange(audioTrack)} />
            </Localizer>
          }
          {
            props.textTracks.length <= 0 ? '' :
            <Localizer>
              <SmartContainerItem label={<Text id='language.captions' />} options={textOptions} onSelect={textTrack => this.onCaptionsChange(textTrack)} />
            </Localizer>
          }
          {
            props.textTracks.length <= 0 ? '' :
            <div className='smart-container-item'>
              <a onClick={() => props.toggleCVAAOverlay(!props.overlayOpen)}><Text id='language.advanced_captions_settings'>Advanced captions settings</Text></a>
            </div>
          }
        </SmartContainer>
        }
      </div>
    )
  }
}

export default LanguageControl;
