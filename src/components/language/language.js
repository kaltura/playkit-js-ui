//@flow
import { h } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import BaseComponent from '../base';
import SmartContainer from '../smart-container/smart-container';
import SmartContainerItem from '../smart-container/smart-container-item';
import Icon from '../icon/icon';

const mapStateToProps = state => ({
  audioTracks: state.engine.audioTracks,
  textTracks: state.engine.textTracks
});

@connect(mapStateToProps)
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

  onAudioChange() {
    // change audio
  }

  onCaptionsChange() {
    // change captions
  }

  render(props) {
    return (
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
              <SmartContainerItem label={<Text id='language.audio' />} options={props.audioTracks} onSelect={(o) => this.onAudioChange(o)} />
            </Localizer>
          }
          {
            props.textTracks.length <= 0 ? '' :
            <Localizer>
              <SmartContainerItem label={<Text id='language.captions' />} options={props.textTracks} onSelect={(o) => this.onCaptionsChange(o)} />
            </Localizer>
          }
          <div className='smart-container-item'>
            <a href='#'><Text id='language.advanced_captions_settings'>Advanced captions settings</Text></a>
          </div>
        </SmartContainer>
        }
      </div>
    )
  }
}

export default LanguageControl;
