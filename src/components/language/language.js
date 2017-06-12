//@flow
import { h } from 'preact';
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
    alert(o);
  }

  render() {
    var audioOptions = [
      { value: 1, label: 'English' },
      { value: 2, label: 'Hebrew' }
    ]
    var captionsOptions = [
      { value: 1, label: 'Enable' },
      { value: 2, label: 'Disable' }
    ]
    return (
      <div className='control-button-container control-language'>
        <button className='control-button' onClick={() => this.onControlButtonClick()}>
          <Icon type='language' />
        </button>
        { !this.state.smartContainerOpen ? '' :
        <SmartContainer>
          <SmartContainerItem label='Audio' options={audioOptions} onSelect={(o) => this.onAudioChange(o)} />
          <SmartContainerItem label='Captions' options={captionsOptions} onSelect={(o) => this.onCaptionsChange(o)} />
          <div className='smart-container-item'>
            <a href='#'>Advanced captions settings</a>
          </div>
        </SmartContainer>
        }
      </div>
    )
  }
}

export default LanguageControl;
