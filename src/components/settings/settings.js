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

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  videoTracks: state.engine.videoTracks,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
/**
 * SettingsControl component
 *
 * @class SettingsControl
 * @extends {BaseComponent}
 */
class SettingsControl extends BaseComponent {
  state: Object;
  _controlSettingsElement: any;

  /**
   * Creates an instance of SettingsControl.
   * @param {Object} obj obj
   * @memberof SettingsControl
   */
  constructor(obj: Object) {
    super({name: 'Settings', player: obj.player});
  }

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof SettingsControl
   */
  componentWillMount() {
    this.setState({smartContainerOpen: false});
  }

  /**
   * after component mounted, set event listener to click outside of the component
   *
   * @returns {void}
   * @memberof SettingsControl
   */
  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);
  }

  /**
   * before component unmounted, remove event listener
   *
   * @returns {void}
   * @memberof SettingsControl
   */
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this));
  }

  /**
   * event listener for clicking outside handler.
   *
   * @param {Event} e - click event
   * @returns {void}
   * @memberof SettingsControl
   */
  handleClickOutside(e: Event) {
    if (!this.props.isMobile && !!this._controlSettingsElement && !this._controlSettingsElement.contains(event.target) && this.state.smartContainerOpen) {
      e.stopPropagation();
      this.setState({smartContainerOpen: false});
    }
  }

  /**
   * toggle smart container internal state on control button click
   *
   * @returns {void}
   * @memberof SettingsControl
   */
  onControlButtonClick() {
    this.setState({smartContainerOpen: !this.state.smartContainerOpen});
  }

  /**
   * change player playback rate and update it in the store state
   *
   * @param {number} playbackRate - playback rate value
   * @returns {void}
   * @memberof SettingsControl
   */
  onSpeedChange(playbackRate: number): void {
    this.props.updateSpeed(playbackRate);
    this.player.playbackRate = playbackRate;
  }

  /**
   * change quality track or if value is 'auto', enable player adaptive bitrate
   *
   * @param {(Object | string)} videoTrack - video track
   * @returns {void}
   * @memberof SettingsControl
   */
  onQualityChange(videoTrack: Object | string): void {
    if (videoTrack === 'auto') {
      this.player.enableAdaptiveBitrate();
    }
    else {
      this.player.selectTrack(videoTrack);
    }
  }

  /**
   * get the quality option label with fallbacks by optional configuration
   *
   * @param {Object} t - video track
   * @returns {string} - quality option label
   * @memberof SettingsControl
   */
  getQualityOptionLabel(t: Object): string {
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

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SettingsControl
   */
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
