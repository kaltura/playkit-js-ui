//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {withText, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/settings';
import {SmartContainer} from '../smart-container';
import {SmartContainerItem} from '../smart-container/smart-container-item';
import {default as Icon, IconType} from '../icon';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';
import {withKeyboardEvent} from 'components/keyboard';
import {KeyMap} from 'utils/key-map';
import {SpeedSelectedEvent} from 'event/events/speed-selected-event';
import {actions as overlayIconActions} from 'reducers/overlay-action';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  videoTracks: state.engine.videoTracks,
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  isLive: state.engine.isLive
});

const COMPONENT_NAME = 'Settings';

@connect(
  mapStateToProps,
  bindActions({...actions, ...overlayIconActions})
)
@withText({
  qualityLabelText: 'settings.quality',
  speedLabelText: 'settings.speed',
  buttonAriaLabel: 'controls.settings'
})
@withPlayer
@withEventManager
@withKeyboardEvent
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
/**
 * Settings component
 *
 * @class Settings
 * @example <Settings />
 * @extends {Component}
 */
class Settings extends Component {
  state: Object;
  _controlSettingsElement: any;

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
    const {player, eventManager, addKeyboardHandler, logger} = this.props;
    eventManager.listen(document, 'click', e => this.handleClickOutside(e));
    addKeyboardHandler(KeyMap.PERIOD, event => {
      if (event.shiftKey) {
        const playbackRate = player.playbackRate;
        const index = player.playbackRates.indexOf(playbackRate);
        if (index < player.playbackRates.length - 1) {
          logger.debug(`Changing playback rate. ${playbackRate} => ${player.playbackRates[index + 1]}`);
          player.playbackRate = player.playbackRates[index + 1];
          this.props.updateOverlayActionIcon(IconType.SpeedUp);
          player.dispatchEvent(new SpeedSelectedEvent(player.playbackRate));
        }
      }
    });
    addKeyboardHandler(KeyMap.SEMI_COLON, event => {
      if (event.shiftKey) {
        if (player.playbackRate !== player.defaultPlaybackRate) {
          logger.debug(`Changing playback rate. ${player.playbackRate} => ${player.defaultPlaybackRate}`);
          player.playbackRate = player.defaultPlaybackRate;
          this.props.updateOverlayActionIcon(IconType.Speed);
          player.dispatchEvent(new SpeedSelectedEvent(player.playbackRate));
        }
      }
    });
    addKeyboardHandler(KeyMap.COMMA, event => {
      if (event.shiftKey) {
        const playbackRate = player.playbackRate;
        const index = player.playbackRates.indexOf(playbackRate);
        if (index > 0) {
          logger.debug(`Changing playback rate. ${playbackRate} => ${player.playbackRates[index - 1]}`);
          player.playbackRate = player.playbackRates[index - 1];
          this.props.updateOverlayActionIcon(IconType.SpeedDown);
          player.dispatchEvent(new SpeedSelectedEvent(player.playbackRate));
        }
      }
    });
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
      !this.props.isSmallSize &&
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
    this.props.player.playbackRate = playbackRate;
    this.props.notifyClick({
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
    const {player} = this.props;
    if (videoTrack === 'auto') {
      player.enableAdaptiveBitrate();
    } else {
      player.selectTrack(videoTrack);
    }
    this.props.notifyClick({
      type: player.Track.VIDEO,
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
    const {player, isLive} = this.props;
    const speedOptions = player.playbackRates.reduce((acc, speed) => {
      let speedOption = {
        value: speed,
        label: speed === 1 ? 'Normal' : speed,
        active: false
      };
      if (speed === player.playbackRate) {
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
        active: !player.isAdaptiveBitrateEnabled() && t.active,
        value: t
      }));

    // Progressive playback doesn't support auto
    if (qualityOptions.length > 1 && player.streamType !== 'progressive') {
      qualityOptions.unshift({
        label: 'Auto',
        active: player.isAdaptiveBitrateEnabled(),
        value: 'auto'
      });
    }

    if (qualityOptions.length <= 1 && speedOptions.length <= 1) return undefined;
    if (isLive && qualityOptions.length <= 1) return undefined;
    return (
      <div ref={c => (this._controlSettingsElement = c)} className={[style.controlButtonContainer, style.controlSettings].join(' ')}>
        <button
          tabIndex="0"
          aria-label={props.buttonAriaLabel}
          className={this.state.smartContainerOpen ? [style.controlButton, style.active].join(' ') : style.controlButton}
          onClick={() => this.onControlButtonClick()}>
          <Icon type={IconType.Settings} />
        </button>
        {!this.state.smartContainerOpen ? (
          ''
        ) : (
          <SmartContainer targetId={player.config.targetId} title={<Text id="settings.title" />} onClose={() => this.onControlButtonClick()}>
            {qualityOptions.length <= 1 ? (
              ''
            ) : (
              <SmartContainerItem
                icon="quality"
                label={props.qualityLabelText}
                options={qualityOptions}
                onMenuChosen={o => this.onQualityChange(o)}
              />
            )}
            {isLive || speedOptions.length <= 1 ? (
              ''
            ) : (
              <SmartContainerItem icon="speed" label={props.speedLabelText} options={speedOptions} onMenuChosen={o => this.onSpeedChange(o)} />
            )}
          </SmartContainer>
        )}
      </div>
    );
  }
}

Settings.displayName = COMPONENT_NAME;
export {Settings};
