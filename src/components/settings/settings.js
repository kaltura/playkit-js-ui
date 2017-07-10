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
  videoTracks: state.engine.videoTracks,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
class SettingsControl extends BaseComponent {
  state: Object;
  _controlSettingsElement: any;

  constructor(obj: Object) {
    super({name: 'Settings', player: obj.player});
  }

  componentWillMount() {
    this.setState({smartContainerOpen: false});
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  handleClickOutside(e: Event) {
    if (!this.props.isMobile && !!this._controlSettingsElement && !this._controlSettingsElement.contains(event.target) && this.state.smartContainerOpen) {
      e.stopPropagation();
      this.setState({smartContainerOpen: false});
    }
  }

  onControlButtonClick() {
    this.setState({smartContainerOpen: !this.state.smartContainerOpen});
  }

  onSpeedChange(o: Object) {
    this.props.updateSpeed(o.value);
  }

  onQualityChange(videoTrack: Object) {
    this.player.selectTrack(videoTrack);
  }

  render(props: any) {
    var speedOptions = [
      { value: 1, label: 'Auto (360)', active: true },
      { value: 2, label: '240' },
      { value: 3, label: '144' }
    ];
    var qualityOptions = props.videoTracks.map(t => ({
      label: t.label || (t.bandwidth / 1000).toFixed(0) + 'p',
      active: t.active,
      value: t
    }));
    return (
      <div
        ref={c => this._controlSettingsElement=c}
        className='control-button-container control-settings'
      >
        <Localizer>
          <button
            aria-label={<Text id='controls.settings' />}
            className={this.state.smartContainerOpen ? 'control-button active' : 'control-button'}
            onClick={() => this.onControlButtonClick()}
          >
            <Icon type='settings' />
          </button>
        </Localizer>
        { !this.state.smartContainerOpen ? '' :
        <SmartContainer title='Settings' onClose={() => this.onControlButtonClick()}>
          {
            props.videoTracks.length <= 0 ? '' :
            <Localizer>
              <SmartContainerItem icon='quality' label={<Text id='settings.quality' />} options={qualityOptions} onSelect={(o) => this.onQualityChange(o)} />
            </Localizer>
          }
          <Localizer>
            <SmartContainerItem icon='speed' label={<Text id='settings.speed' />} options={speedOptions} onSelect={(o) => this.onSpeedChange(o)} />
          </Localizer>
        </SmartContainer>
        }
      </div>
    )
  }
}

export default SettingsControl;
