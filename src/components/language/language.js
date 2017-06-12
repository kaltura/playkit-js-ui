//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import SmartContainer from '../smart-container/smart-container';
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

  render() {
    return (
      <div className='control-button-container control-language'>
        <button className='control-button' onClick={() => this.onControlButtonClick()}>
          <Icon type='language' />
        </button>
        { this.state.smartContainerOpen ? (<SmartContainer />) : false }
      </div>
    )
  }
}

export default LanguageControl;
