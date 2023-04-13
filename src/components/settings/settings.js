//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {withText, Text} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from 'utils';
import {actions} from 'reducers/settings';
import {SmartContainer} from 'components';
import {SmartContainerItem} from 'components';
import {default as Icon, IconType, BadgeType} from '../icon';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';
import {withKeyboardEvent} from 'components/keyboard';
import {KeyMap} from 'utils/key-map';
import {SpeedSelectedEvent} from 'event/events/speed-selected-event';
import {actions as overlayIconActions} from 'reducers/overlay-action';
import {Tooltip} from 'components/tooltip';
import {Button} from 'components/button';
import {ButtonControl} from 'components/button-control';

const HeightResolution = {
  HD: 1080,
  UHD_4K: 2160,
  UHD_8K: 4320
};
const rtlLanguages = ['ae', 'ar', 'arc', 'bcc', 'bqi', 'ckb', 'dv', 'fa', 'glk', 'he', 'ku', 'mzn', 'nqo', 'pnb', 'ps', 'sd', 'ug', 'ur', 'yi'];

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  videoTracks: state.engine.videoTracks,
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  isLive: state.engine.isLive,
  isAdvancedAudioDescChecked: state.settings.advancedAudioDesc
});

const COMPONENT_NAME = 'Settings';

/**
 * Settings component
 *
 * @class Settings
 * @example <Settings />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...actions, ...overlayIconActions}))
@withText({
  qualityLabelText: 'settings.quality',
  speedLabelText: 'settings.speed',
  advancedAudioText: 'settings.AdvancedAudioDescription',
  buttonLabel: 'controls.settings',
  speedNormalLabelText: 'settings.speedNormal',
  qualityAutoLabelText: 'settings.qualityAuto'
})
@withPlayer
@withEventManager
@withKeyboardEvent(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
class Settings extends Component {
  state: Object;
  _controlSettingsElement: HTMLDivElement;
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.PERIOD,
        shiftKey: true
      },
      action: event => {
        this.handleKeydown(event);
      }
    },
    {
      key: {
        code: KeyMap.SEMI_COLON,
        shiftKey: true
      },
      action: event => {
        this.handleKeydown(event);
      }
    },
    {
      key: {
        code: KeyMap.COMMA,
        shiftKey: true
      },
      action: event => {
        this.handleKeydown(event);
      }
    }
  ];

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
    const {eventManager} = this.props;
    eventManager.listen(document, 'click', e => this.handleClickOutside(e));
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  /**
   * on settings control key down, update the settings in case of up/down keys
   *
   * @method handleKeydown
   * @param {KeyboardEvent} event - keyboardEvent event
   * @returns {void}
   * @memberof Settings
   */
  handleKeydown(event: KeyboardEvent): void {
    const {player, logger} = this.props;
    let playbackRate, index;
    switch (event.keyCode) {
      case KeyMap.PERIOD:
        playbackRate = player.playbackRate;
        index = player.playbackRates.indexOf(playbackRate);
        if (index < player.playbackRates.length - 1) {
          logger.debug(`Changing playback rate. ${playbackRate} => ${player.playbackRates[index + 1]}`);
          player.playbackRate = player.playbackRates[index + 1];
          this.props.updateOverlayActionIcon(IconType.SpeedUp);
          player.dispatchEvent(new SpeedSelectedEvent(player.playbackRate));
        }
        break;
      case KeyMap.SEMI_COLON:
        if (player.playbackRate !== player.defaultPlaybackRate) {
          logger.debug(`Changing playback rate. ${player.playbackRate} => ${player.defaultPlaybackRate}`);
          player.playbackRate = player.defaultPlaybackRate;
          this.props.updateOverlayActionIcon(IconType.Speed);
          player.dispatchEvent(new SpeedSelectedEvent(player.playbackRate));
        }
        break;
      case KeyMap.COMMA:
        playbackRate = player.playbackRate;
        index = player.playbackRates.indexOf(playbackRate);
        if (index > 0) {
          logger.debug(`Changing playback rate. ${playbackRate} => ${player.playbackRates[index - 1]}`);
          player.playbackRate = player.playbackRates[index - 1];
          this.props.updateOverlayActionIcon(IconType.SpeedDown);
          player.dispatchEvent(new SpeedSelectedEvent(player.playbackRate));
        }
        break;
    }
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
      this.setState({smartContainerOpen: false});
    }
  }

  /**
   * toggle smart container internal state on control button click
   *
   * @returns {void}
   * @memberof Settings
   */
  onControlButtonClick = (): void => {
    this.setState(prevState => {
      return {smartContainerOpen: !prevState.smartContainerOpen};
    });
  };

  /**
   * change player playback rate and update it in the store state
   *
   * @param {number} playbackRate - playback rate value
   * @returns {void}
   * @memberof Settings
   */
  onSpeedChange = (playbackRate: number): void => {
    this.props.updateSpeed(playbackRate);
    this.props.player.playbackRate = playbackRate;
    this.props.notifyClick({
      type: 'speed',
      speed: playbackRate
    });
  };

  onAdvancedAudioClick = (isChecked: boolean): void => {
    this.props.updateAdvancedAudioDesc(isChecked);
    this.props.notifyClick({type: 'AdvancedAudioDescription', checked: isChecked});
  };

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
      qualities[arrLength].active = currentTrack.active || previousTrack.active;
    } else {
      qualities.push(currentTrack);
    }
    return qualities;
  }

  /**
   * Determines the badge icon type of the quality option based on the height of the resolution.
   *
   * @param {number} videoTrackHeight - video track resolution height.
   * @returns {string | null} - the badge icon type or null depends on the resolution height.
   * @memberof Settings
   */
  getLabelBadgeType(videoTrackHeight: number): string | null {
    const [QHD, , Q4K, , Q8k] = Object.keys(BadgeType);
    if (videoTrackHeight >= HeightResolution.HD && videoTrackHeight < HeightResolution.UHD_4K) {
      return QHD;
    } else if (videoTrackHeight >= HeightResolution.UHD_4K && videoTrackHeight < HeightResolution.UHD_8K) {
      return Q4K;
    } else if (videoTrackHeight >= HeightResolution.UHD_8K) {
      return Q8k;
    }
    return null;
  }

  /**
   * returns The badge icon type of the active quality option based on the height of the resolution
   *
   * @returns {string | null} - the badge icon type or null depends on the resolution height.
   * @memberof Settings
   */
  getButtonBadgeType(): string | null {
    const activeVideoTrackHeight: Object = this.props.player.getActiveTracks()?.video?.height;
    return activeVideoTrackHeight ? this.getLabelBadgeType(activeVideoTrackHeight) : null;
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
        label: speed === 1 ? props.speedNormalLabelText : speed,
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
        return a.height < b.height ? 1 : -1;
      })
      .filter(t => {
        return t.bandwidth || t.height;
      })
      .reduce(this.filterUniqueQualities, [])
      .map(t => ({
        label: t.label,
        active: !player.isAdaptiveBitrateEnabled() && t.active,
        value: t,
        badgeType: this.getLabelBadgeType(t.height)
      }));

    // Progressive playback doesn't support auto
    if (qualityOptions.length > 1 && player.streamType !== 'progressive') {
      const activeTrack: Object = qualityOptions.find(track => track.value.active === true).value;
      let qualityLabel;
      if (rtlLanguages.includes(this.props.player._localPlayer._config.ui.locale)) {
        qualityLabel = activeTrack.label + ' - ' + this.props.qualityAutoLabelText;
      } else {
        qualityLabel = this.props.qualityAutoLabelText + ' - ' + activeTrack.label;
      }
      qualityOptions.unshift({
        label: this.props.qualityAutoLabelText,
        dropdownOptions: {
          label: qualityLabel,
          badgeType: this.getLabelBadgeType(activeTrack.height)
        },
        active: player.isAdaptiveBitrateEnabled(),
        value: 'auto'
      });
    }

    if (qualityOptions.length <= 1 && speedOptions.length <= 1) return undefined;
    if (isLive && qualityOptions.length <= 1) return undefined;
    const buttonBadgeType: string = this.getButtonBadgeType() || '';
    return (
      <ButtonControl name={COMPONENT_NAME} ref={c => (c ? (this._controlSettingsElement = c) : undefined)}>
        <Tooltip label={props.buttonLabel}>
          <Button
            tabIndex="0"
            aria-label={props.buttonLabel}
            className={[
              style.controlButton,
              style.buttonBadge,
              BadgeType[buttonBadgeType + 'Active'],
              this.state.smartContainerOpen ? style.active : ''
            ].join(' ')}
            onClick={this.onControlButtonClick}>
            <Icon type={IconType.Settings} />
          </Button>
        </Tooltip>
        {!this.state.smartContainerOpen ? (
          ''
        ) : (
          <SmartContainer targetId={player.config.targetId} title={<Text id="settings.title" />} onClose={this.onControlButtonClick}>
            {<SmartContainerItem icon={IconType.AdvancedAudioDescription} label={props.advancedAudioText} isChecked={props.isAdvancedAudioDescChecked} onMenuChosen={this.onAdvancedAudioClick} />}
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
              <SmartContainerItem icon="speed" label={props.speedLabelText} options={speedOptions} onMenuChosen={this.onSpeedChange} />
            )}
          </SmartContainer>
        )}
      </ButtonControl>
    );
  }
}

Settings.displayName = COMPONENT_NAME;
export {Settings};
