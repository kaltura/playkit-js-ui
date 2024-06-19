import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {withText, Text} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions, KeyMap} from '../../utils';
import {actions} from '../../reducers/settings';
import {
  AdvancedAudioDescToggle,
  AudioMenu,
  CaptionsMenu,
  QualityMenu,
  SmartContainer,
  SpeedMenu,
  CVAAOverlay,
  getLabelBadgeType
} from '../../components';
import {default as Icon, IconType, BadgeType} from '../icon';
import {withPlayer} from '../player';
import {withEventManager} from '../../event';
import {actions as overlayIconActions} from '../../reducers/overlay-action';
import {Tooltip} from '../tooltip';
import {Button} from '../button';
import {ButtonControl} from '../button-control';
import {createPortal} from 'preact/compat';
import {focusElement} from '../../utils';
import {withKeyboardEvent} from '../keyboard';
import {KeyboardEventHandlers} from '../../types';
import {withLogger} from '../logger';
import {SpeedSelectedEvent} from '../../event/events/speed-selected-event';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  audioTracks: state.engine.audioTracks,
  textTracks: state.engine.textTracks,
  videoTracks: state.engine.videoTracks,
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  isLive: state.engine.isLive,
  isAudio: state.engine.isAudio,
  showQualityMenu: state.config.settings.showQualityMenu,
  showAudioMenu: state.config.settings.showAudioMenu,
  showCaptionsMenu: state.config.settings.showCaptionsMenu,
  showSpeedMenu: state.config.settings.showSpeedMenu,
  showAdvancedAudioDescToggle: state.config.settings.showAdvancedAudioDescToggle
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
  buttonLabel: 'controls.settings'
})
@withPlayer
@withEventManager
@withKeyboardEvent(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
class Settings extends Component<any, any> {
  _controlSettingsElement!: HTMLDivElement;
  _buttonRef: HTMLButtonElement | null = null;
  _lastActiveTextLanguage: string = '';
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.C
      },
      action: () => {
        const {player, logger} = this.props;
        const activeTextTrack = player.getActiveTracks().text;
        if (activeTextTrack) {
          if (activeTextTrack.language === 'off' && this._lastActiveTextLanguage) {
            logger.debug(`Changing text track to language`, this._lastActiveTextLanguage);
            const selectedTextTrack = player.getTracks('text').find(track => track.language === this._lastActiveTextLanguage);
            player.selectTrack(selectedTextTrack);
          } else if (activeTextTrack.language !== 'off' && !this._lastActiveTextLanguage) {
            logger.debug(`Hiding text track`);
            this._lastActiveTextLanguage = activeTextTrack.language;
            player.hideTextTrack();
          }
        }
      }
    },
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
    this.setState({smartContainerOpen: false, cvaaOverlay: false});
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
   * @memberof SpeedMenu
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
   * We update the last language selected here upon trackTracks props change. This is done to make sure we update the
   * last text track lanague upon language menu selection and using the (C) keyboard key.
   * @param {Object} nextProps - the props that will replace the current props
   * @returns {void}
   */
  componentWillReceiveProps(nextProps: any): void {
    const currActiveTrack = this.props.textTracks.find(track => track.active);
    const nextActiveTrack = nextProps.textTracks.find(track => track.active);
    if (currActiveTrack && currActiveTrack.language !== 'off' && nextActiveTrack && nextActiveTrack.language === 'off') {
      this._lastActiveTextLanguage = currActiveTrack.language;
    } else if (nextActiveTrack && nextActiveTrack.language !== 'off') {
      this._lastActiveTextLanguage = '';
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
      !this.state.cvaaOverlay &&
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
   * @param {KeyboardEvent} e - keyboard event
   * @param {boolean} byKeyboard - is keydown
   * @returns {void}
   * @memberof Settings
   */
  onControlButtonClick = (e?: KeyboardEvent, byKeyboard?: boolean): void => {
    this.setState(prevState => {
      return {smartContainerOpen: !prevState.smartContainerOpen};
    });
    if (byKeyboard && this.state.smartContainerOpen) {
      focusElement(this._buttonRef);
    }
  };

  /**
   * set button reference
   *
   * @param {HTMLButtonElement} ref - button reference
   * @returns {void}
   * @memberof Settings
   */
  setButtonRef = (ref: HTMLButtonElement | null) => {
    this._buttonRef = ref;
  };

  toggleCVAAOverlay = (): void => {
    this.setState(prevState => {
      return {cvaaOverlay: !prevState.cvaaOverlay};
    });
  };

  /**
   * handle the closure of cvaa overlay
   *
   * @param {KeyboardEvent} e - keyboard event
   * @param {boolean} byKeyboard - is keydown
   * @returns {void}
   * @memberof Settings
   */
  onCVAAOverlayClose = (e?: KeyboardEvent, byKeyboard?: boolean): void => {
    this.toggleCVAAOverlay();
    this.onControlButtonClick(e, byKeyboard);
  };

  /**
   * returns The badge icon type of the active quality option based on the height of the resolution
   *
   * @returns {string | null} - the badge icon type or null depends on the resolution height.
   * @memberof Settings
   */
  getButtonBadgeType(): string | null {
    const activeVideoTrackHeight: number = this.props.player.getActiveTracks()?.video?.height;
    return activeVideoTrackHeight ? getLabelBadgeType(activeVideoTrackHeight) : null;
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Settings
   */
  render(props: any): VNode<any> | undefined {
    const showAudioMenu = props.showAudioMenu && props.audioTracks.length > 1;
    const showAdvancedAudioDescToggle = props.showAdvancedAudioDescToggle;
    const showCaptionsMenu = props.showCaptionsMenu && props.textTracks.length > 1;
    const showQualityMenu = props.showQualityMenu && !props.isAudio && props.videoTracks.length > 1;
    const showSpeedMenu = props.showSpeedMenu && props.player.playbackRates.length > 1 && !props.isLive;

    if (!(showAudioMenu || showCaptionsMenu || showQualityMenu || showSpeedMenu)) return undefined;
    if (props.isLive && props.videoTracks.length <= 1 && !showAudioMenu && !showCaptionsMenu) return undefined;
    const buttonBadgeType: string = this.getButtonBadgeType() || '';

    const targetId: HTMLDivElement | Document = (document.getElementById(this.props.player.config.targetId) as HTMLDivElement) || document;
    const portalSelector = `.overlay-portal`;
    return (
      <ButtonControl name={COMPONENT_NAME} ref={c => (c ? (this._controlSettingsElement = c) : undefined)}>
        <Tooltip label={props.buttonLabel}>
          <Button
            ref={this.setButtonRef}
            tabIndex="0"
            aria-label={props.buttonLabel}
            aria-haspopup="true"
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
        {this.state.smartContainerOpen && !this.state.cvaaOverlay && (
          <SmartContainer targetId={props.player.config.targetId} title={<Text id="settings.title" />} onClose={this.onControlButtonClick}>
            {showAdvancedAudioDescToggle && <AdvancedAudioDescToggle />}
            {showAudioMenu && <AudioMenu />}
            {showCaptionsMenu && <CaptionsMenu onAdvancedCaptionsClick={this.toggleCVAAOverlay} />}
            {showQualityMenu && <QualityMenu />}
            {showSpeedMenu && <SpeedMenu />}
          </SmartContainer>
        )}
        {this.state.cvaaOverlay ? createPortal(<CVAAOverlay onClose={this.onCVAAOverlayClose} />, targetId.querySelector(portalSelector)!) : <div />}
      </ButtonControl>
    );
  }
}

Settings.displayName = COMPONENT_NAME;
export {Settings};
