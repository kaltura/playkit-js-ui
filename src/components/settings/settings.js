//@flow
import { h } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/settings';
import BaseComponent from '../base';
import SmartContainer from '../smart-container';
import SmartContainerItem from '../smart-container/smart-container-item';
import { default as Icon, IconType } from '../icon';

const defaultSpeeds = [0.5, 1, 2, 4];

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

  onSpeedChange(playbackRate: number) {
    this.props.updateSpeed(playbackRate);
    this.player.playbackRate = playbackRate;
  }

  onQualityChange(videoTrack: Object | string) {
    if (videoTrack === 'auto') {
      this.player.enableAdaptiveBitrate();
    }
    else {
      this.player.selectTrack(videoTrack);
    }
  }

  getQualityOptionLabel(t: Object) {
    let resolution = t.height ? t.height + 'p' : undefined;
    let mbs = t.bandwidth ? (t.bandwidth/1000000).toPrecision(2) + 'Mbs' : undefined;

    if (!this.props.qualityType) {
      return resolution || mbs || 'N/A';
    }
    else if (this.props.qualityType.toUpperCase() === 'MBS' && mbs) {
      return mbs;
    }
    else if (this.props.qualityType.toUpperCase() === 'RESOLUTION' && resolution) {
      return t.height + 'p';
    }
    else if (t.label) {
      return t.label;
    }
    else {
      return 'N/A'
    }
  }

  render(props: any) {
    let speedOptions = defaultSpeeds
      .reduce((acc, speed) => {
        let speedOption = {
          value: speed,
          label: speed === 1 ? 'Normal' : speed,
          active: false
        };
        if (speed === this.player.playbackRate) {
          speedOption.active = true;
        }
        acc.push(speedOption);
        return acc;
      }, []);

    let qualityOptions = props.videoTracks
      .sort((a, b) => {
        return a.bandwidth < b.bandwidth
      })
      .map(t => ({
        label: this.getQualityOptionLabel(t),
        active: !this.player.isAdaptiveBitrateEnabled() && t.active,
        value: t
      }));

    qualityOptions
      .unshift({
        label: 'Auto',
        active: this.player.isAdaptiveBitrateEnabled(),
        value: 'auto'
      });

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
            <Icon type={IconType.Settings} />
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
