//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/settings';
import BaseComponent from '../base';
import {SmartContainer} from '../smart-container';
import {SmartContainerItem} from '../smart-container/smart-container-item';
import {default as Icon, IconType} from '../icon';
import {PLAYER_SIZE} from '../shell/shell';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  videoTracks: state.engine.videoTracks,
  isMobile: state.shell.isMobile,
  isLive: state.engine.isLive,
  playerSize: state.shell.playerSize
});

const COMPONENT_NAME = 'Settings';

@connect(
  mapStateToProps,
  bindActions(actions)
)
/**
 * Settings component
 *
 * @class Settings
 * @example <Settings player={this.player} />
 * @extends {BaseComponent}
 */
class Settings extends BaseComponent {
  state: Object;
  _controlSettingsElement: any;

  /**
   * Creates an instance of Settings.
   * @param {Object} obj obj
   * @memberof Settings
   */
  constructor(obj: Object) {
    super({name: COMPONENT_NAME, player: obj.player});
  }

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof Settings
   */
  componentWillMount() {
    this.setState({smartContainerOpen: false});
  }

  /**
   * after component mounted, set event listener to click outside of the component
   *
   * @returns {void}
   * @memberof Settings
   */
  componentDidMount() {
    this.eventManager.listen(document, 'click', e => this.handleClickOutside(e));
  }

  /**
   * event listener for clicking outside handler.
   *
   * @param {*} e - click event
   * @returns {void}
   * @memberof Settings
   */
  handleClickOutside(e: any) {
    if (
      !this.props.isMobile &&
      ![PLAYER_SIZE.SMALL, PLAYER_SIZE.EXTRA_SMALL].includes(this.props.playerSize) &&
      !!this._controlSettingsElement &&
      !this._controlSettingsElement.contains(e.target) &&
      this.state.smartContainerOpen
    ) {
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
   * @memberof Settings
   */
  onControlButtonClick(): void {
    this.setState({smartContainerOpen: !this.state.smartContainerOpen});
  }

  /**
   * change player playback rate and update it in the store state
   *
   * @param {number} playbackRate - playback rate value
   * @returns {void}
   * @memberof Settings
   */
  onSpeedChange(playbackRate: number): void {
    this.props.updateSpeed(playbackRate);
    this.player.playbackRate = playbackRate;
    this.notifyClick({
      speed: playbackRate
    });
  }

  /**
   * change quality track or if value is 'auto', enable player adaptive bitrate
   *
   * @param {(Object | string)} videoTrack - video track
   * @returns {void}
   * @memberof Settings
   */
  onQualityChange(videoTrack: Object | string): void {
    if (videoTrack === 'auto') {
      this.player.enableAdaptiveBitrate();
    } else {
      this.player.selectTrack(videoTrack);
    }
    this.notifyClick({
      type: this.player.Track.VIDEO,
      track: videoTrack
    });
  }

  /**
   * This function gets an array and increases it if needed in each iteration. The function checks if the last element
   * in the sorted array has the same label as the new current track element. If so, it compares their bandwidth
   * and selects the one with the higher. If the resolution is different then it just adds it to the array
   *
   * @param {Array} qualities - sorted (!) video tracks array
   * @param {object} currentTrack - a track
   * @returns {Array<any>} - an array with unique values, compared by their height. if the new track (currenttrack) has
   * the same height value, then we take the one with the higher bandwidth (replace it if needed)
   * @memberof Settings
   */
  filterUniqueQualities(qualities: Array<any>, currentTrack: any): Array<any> {
    const arrLength = qualities.length - 1;
    const previousTrack = qualities[arrLength];
    if (arrLength > -1 && currentTrack.label === previousTrack.label) {
      if (currentTrack.bandwidth > previousTrack.bandwidth) {
        qualities[arrLength] = currentTrack;
      }
    } else {
      qualities.push(currentTrack);
    }
    return qualities;
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Settings
   */
  render(props: any): React$Element<any> | void {
    const speedOptions = this.player.playbackRates.reduce((acc, speed) => {
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
      .filter(t => {
        return t.bandwidth || t.height;
      })
      .reduce(this.filterUniqueQualities, [])
      .map(t => ({
        label: t.label,
        active: !this.player.isAdaptiveBitrateEnabled() && t.active,
        value: t
      }));

    // Progressive playback doesn't support auto
    if (qualityOptions.length > 1 && this.player.streamType !== 'progressive') {
      qualityOptions.unshift({
        label: 'Auto',
        active: this.player.isAdaptiveBitrateEnabled(),
        value: 'auto'
      });
    }

    if (qualityOptions.length <= 1 && speedOptions.length <= 1) return undefined;
    if (props.isLive && qualityOptions.length <= 1) return undefined;
    return (
      <div ref={c => (this._controlSettingsElement = c)} className={[style.controlButtonContainer, style.controlSettings].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id="controls.settings" />}
            className={this.state.smartContainerOpen ? [style.controlButton, style.active].join(' ') : style.controlButton}
            onClick={() => this.onControlButtonClick()}>
            <Icon type={IconType.Settings} />
          </button>
        </Localizer>
        {!this.state.smartContainerOpen ? (
          ''
        ) : (
          <SmartContainer targetId={this.player.config.targetId} title={<Text id="settings.title" />} onClose={() => this.onControlButtonClick()}>
            {qualityOptions.length <= 1 ? (
              ''
            ) : (
              <Localizer>
                <SmartContainerItem
                  icon="quality"
                  label={<Text id="settings.quality" />}
                  options={qualityOptions}
                  onSelect={o => this.onQualityChange(o)}
                />
              </Localizer>
            )}
            {props.isLive || speedOptions.length <= 1 ? (
              ''
            ) : (
              <Localizer>
                <SmartContainerItem icon="speed" label={<Text id="settings.speed" />} options={speedOptions} onSelect={o => this.onSpeedChange(o)} />
              </Localizer>
            )}
          </SmartContainer>
        )}
      </div>
    );
  }
}

Settings.displayName = COMPONENT_NAME;
export {Settings};
