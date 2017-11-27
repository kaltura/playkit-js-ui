//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/settings';
import BaseComponent from '../base';
import SmartContainer from '../smart-container';
import SmartContainerItem from '../smart-container/smart-container-item';
import {default as Icon, IconType} from '../icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  videoTracks: state.engine.videoTracks,
  isMobile: state.shell.isMobile,
  isLive: state.engine.isLive
});

@connect(mapStateToProps, bindActions(actions))
  /**
   * SettingsControl component
   *
   * @class SettingsControl
   * @example <SettingsControl player={this.player} />
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
   * @param {*} e - click event
   * @returns {void}
   * @memberof SettingsControl
   */
  handleClickOutside(e: any) {
    if (!this.props.isMobile && !!this._controlSettingsElement && !this._controlSettingsElement.contains(e.target) && this.state.smartContainerOpen) {
      if (e.target.classList.contains(style.overlayPlay)) {
        e.stopPropagation();
      }
      this.setState({smartContainerOpen: false});
    }
  }

  /**
   * toggle smart container internal state on control button click
   *
   * @returns {void}
   * @memberof SettingsControl
   */
  onControlButtonClick(): void {
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
    let mbs = t.bandwidth ? (t.bandwidth / 1000000).toPrecision(2) + 'Mbs' : undefined;

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
   * This function gets an array and increases it if needed in each iteration. The function checks if the last element
   * in the sorted array has the same resolution as the new current track element. If so, it compares their bandwidth
   * and the the one with the higher. If the resolution is different then it just adds it to the array
   *
   * @param {Array} qualities - sorted (!) video tracks array
   * @param {object} currentTrack - a track
   * @returns {Array<any>} - an array with unique values, compared by their height. if the new track (currenttrack) has
   * the same height value, then we take the one with the higher bandwidth (replace it if needed)
   * @memberof SettingsControl
   */
  filterUniqueQualities(qualities: Array<any>, currentTrack: any): Array<any> {
    const arrLength = qualities.length - 1;
    const previousTrack = qualities[arrLength];
    if ((arrLength > -1) && (currentTrack.height === previousTrack.height)) {
      if (currentTrack.bandwidth > previousTrack.bandwidth) {
        qualities[arrLength] = currentTrack;
      }
    } else {
      qualities.push(currentTrack);
    }
    return qualities
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof SettingsControl
   */
  render(props: any): React$Element<any> | void {
    const speedOptions = this.player.playbackRates
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

    const qualityOptions = props.videoTracks
      .sort((a, b) => {
        return a.bandwidth < b.bandwidth ? 1 : -1;
      })
      .filter((t) => {
        return (t.bandwidth || t.height)
      })
      .reduce(this.filterUniqueQualities, [])
      .map(t => ({
        label: this.getQualityOptionLabel(t),
        active: !this.player.isAdaptiveBitrateEnabled() && t.active,
        value: t
      }));

    // Progressive playback doesn't support auto
    if ((qualityOptions.length > 1) && (this.player.streamType !== "progressive")) {
      qualityOptions
        .unshift({
          label: 'Auto',
          active: this.player.isAdaptiveBitrateEnabled(),
          value: 'auto'
        });
    }

    if (props.isLive && qualityOptions.length === 0) return undefined;
    return (
      <div
        ref={c => this._controlSettingsElement = c}
        className={[style.controlButtonContainer, style.controlSettings].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id='controls.settings'/>}
            className={this.state.smartContainerOpen ? [style.controlButton, style.active].join(' ') : style.controlButton}
            onClick={() => this.onControlButtonClick()}>
            <Icon type={IconType.Settings}/>
          </button>
        </Localizer>
        {!this.state.smartContainerOpen ? '' :
          <SmartContainer title='Settings' onClose={() => this.onControlButtonClick()}>
            {
              qualityOptions.length <= 1 ? '' :
                <Localizer>
                  <SmartContainerItem icon='quality' label={<Text id='settings.quality'/>} options={qualityOptions}
                                      onSelect={(o) => this.onQualityChange(o)}/>
                </Localizer>
            }
            {
              props.isLive ? '' :
                <Localizer>
                  <SmartContainerItem icon='speed' label={<Text id='settings.speed'/>} options={speedOptions}
                                      onSelect={(o) => this.onSpeedChange(o)}/>
                </Localizer>
            }
          </SmartContainer>
        }
      </div>
    )
  }
}

export default SettingsControl;
