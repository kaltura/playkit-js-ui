//@flow
import { h } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/settings';
import BaseComponent from '../base';
import SmartContainer from '../smart-container/smart-container';
import SmartContainerItem from '../smart-container/smart-container-item';
import Icon from '../icon/icon';

const mapStateToProps = state => ({
  videoTracks: state.engine.videoTracks
});

@connect(mapStateToProps, bindActions(actions))
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
    this.props.updateSpeed(o.value);
  }

  onQualityChange(o) {
    this.props.updateQuality(o.value);
  }

  render(props) {
    var speedOptions = [
      { value: 1, label: 'Auto (360)', active: true },
      { value: 2, label: '240' },
      { value: 3, label: '144' }
    ]
    return (
      <div className='control-button-container control-settings'>
        <Localizer>
          <button aria-label={<Text id='controls.settings' />} className={this.state.smartContainerOpen ? 'control-button active' : 'control-button'} onClick={() => this.onControlButtonClick()}>
            <Icon type='settings' />
          </button>
        </Localizer>
        { !this.state.smartContainerOpen ? '' :
        <SmartContainer>
          {
            props.videoTracks.length <= 0 ? '' :
            <Localizer>
              <SmartContainerItem label={<Text id='settings.quality' />} options={qualityOptions} onSelect={(o) => this.onQualityChange(o)} />
            </Localizer>
          }
          <Localizer>
            <SmartContainerItem label={<Text id='settings.speed' />} options={speedOptions} onSelect={(o) => this.onSpeedChange(o)} />
          </Localizer>
        </SmartContainer>
        }
      </div>
    )
  }
}

export default SettingsControl;
