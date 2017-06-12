//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import SmartContainer from '../smart-container/smart-container';
import SmartContainerItem from '../smart-container/smart-container-item';
import Icon from '../icon/icon';

class SettingsControl extends BaseComponent {

  constructor(obj: IControlParams) {
    super({name: 'Settings', player: obj.player});
  }

  componentDidMount() {
    this.setState({smartContainerOpen: false});
  }

  onControlButtonClick() {
    this.setState({smartContainerOpen: !this.state.smartContainerOpen});
  }

  onSpeedChange(o) {
    alert(o.id)
  }

  onQualityChange(o) {
    alert(o.id)
  }

  render() {
    var qualityOptions = [
      { id: 1, label: 'Auto' },
      { id: 2, label: 'Not Auto' }
    ]
    var speedOptions = [
      { id: 1, label: 'Normal' },
      { id: 2, label: 'Fast' }
    ]
    return (
      <div className='control-button-container control-settings'>
        <button className='control-button' onClick={() => this.onControlButtonClick()} aria-label='Settings'>
          <Icon type='settings' />
        </button>
        { !this.state.smartContainerOpen ? '' :
        <SmartContainer>
          <SmartContainerItem label='Quality' options={qualityOptions} onSelect={(o) => this.onQualityChange(o)} />
          <SmartContainerItem label='Speed' options={speedOptions} onSelect={(o) => this.onSpeedChange(o)} />
        </SmartContainer>
        }
      </div>
    )
  }
}

export default SettingsControl;
