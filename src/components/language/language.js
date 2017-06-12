//@flow
import { h } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import BaseComponent from '../base';
import SmartContainer from '../smart-container/smart-container';
import SmartContainerItem from '../smart-container/smart-container-item';
import Icon from '../icon/icon';

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

  onAudioChange(o) {
    console.log(o);
  }

  onCaptionsChange(o) {
    console.log(o);
  }

  render() {
    var audioOptions = [
      { value: 1, label: 'English' },
      { value: 2, label: 'Hebrew' }
    ]
    var captionsOptions = [
      { value: 1, label: 'Disable' },
      { value: 2, label: 'English' },
      { value: 2, label: 'Spanish' }
    ]
    return (
      <div className='control-button-container control-language'>
        <Localizer>
          <button aria-label={<Text id="controls.language" />} className={this.state.smartContainerOpen ? 'control-button active' : 'control-button'} onClick={() => this.onControlButtonClick()}>
            <Icon type='language' />
          </button>
        </Localizer>
        { !this.state.smartContainerOpen ? '' :
        <SmartContainer>
          <Localizer>
            <SmartContainerItem label={<Text id="language.audio" />} options={audioOptions} onSelect={(o) => this.onAudioChange(o)} />
          </Localizer>
          <Localizer>
            <SmartContainerItem label={<Text id="language.captions" />} options={captionsOptions} onSelect={(o) => this.onCaptionsChange(o)} />
          </Localizer>
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
