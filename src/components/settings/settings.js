//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {withText, Text} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from 'utils';
import {actions} from 'reducers/settings';
import {AdvancedAudioDescToggle, AudioMenu, CaptionsMenu, QualityMenu, SmartContainer, SpeedMenu, CVAAOverlay, getLabelBadgeType} from 'components';
import {default as Icon, IconType, BadgeType} from '../icon';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {actions as overlayIconActions} from 'reducers/overlay-action';
import {Tooltip} from 'components/tooltip';
import {Button} from 'components/button';
import {ButtonControl} from 'components/button-control';
import {createPortal} from 'preact/compat';

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
class Settings extends Component {
  state: Object;
  _controlSettingsElement: HTMLDivElement;

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
   * @returns {void}
   * @memberof Settings
   */
  onControlButtonClick = (): void => {
    this.setState(prevState => {
      return {smartContainerOpen: !prevState.smartContainerOpen};
    });
  };

  toggleCVAAOverlay = (): void => {
    this.setState(prevState => {
      return {cvaaOverlay: !prevState.cvaaOverlay};
    });
  };

  onCVAAOverlayClose = (): void => {
    this.toggleCVAAOverlay();
    this.onControlButtonClick();
  };

  /**
   * returns The badge icon type of the active quality option based on the height of the resolution
   *
   * @returns {string | null} - the badge icon type or null depends on the resolution height.
   * @memberof Settings
   */
  getButtonBadgeType(): string | null {
    const activeVideoTrackHeight: Object = this.props.player.getActiveTracks()?.video?.height;
    return activeVideoTrackHeight ? getLabelBadgeType(activeVideoTrackHeight) : null;
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Settings
   */
  render(props: any): React$Element<any> | void {
    const showAudioMenu = props.showAudioMenu && props.audioTracks.length > 1;
    const showAdvancedAudioDescToggle = props.showAdvancedAudioDescToggle;
    const showCaptionsMenu = props.showCaptionsMenu && props.textTracks.length > 1;
    const showQualityMenu = props.showQualityMenu && props.videoTracks.length > 1;
    const showSpeedMenu = props.showSpeedMenu && props.player.playbackRates.length > 1 && !props.isLive;

    if (!(showAudioMenu || showCaptionsMenu || showQualityMenu || showSpeedMenu)) return undefined;
    if (props.isLive && props.videoTracks.length <= 1 && !showAudioMenu && !showCaptionsMenu) return undefined;
    const buttonBadgeType: string = this.getButtonBadgeType() || '';

    const targetId = document.getElementById(this.props.player.config.targetId) || document;
    const portalSelector = `.overlay-portal`;
    return (
      <ButtonControl
        name={COMPONENT_NAME}
        // ref={c => (c ? (this._controlSettingsElement = c) : undefined)}
        ref={c => {
          if (c) {
            if (props.cbRef) props.cbRef.current = c;
            this._controlSettingsElement = c;
          }
        }}>
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
        {this.state.smartContainerOpen && !this.state.cvaaOverlay && (
          <SmartContainer targetId={props.player.config.targetId} title={<Text id="settings.title" />} onClose={this.onControlButtonClick}>
            {showAdvancedAudioDescToggle && <AdvancedAudioDescToggle />}
            {showAudioMenu && <AudioMenu />}
            {showCaptionsMenu && <CaptionsMenu onAdvancedCaptionsClick={this.toggleCVAAOverlay} />}
            {showQualityMenu && <QualityMenu />}
            {showSpeedMenu && <SpeedMenu />}
          </SmartContainer>
        )}
        {this.state.cvaaOverlay ? createPortal(<CVAAOverlay onClose={this.onCVAAOverlayClose} />, targetId.querySelector(portalSelector)) : <div />}
      </ButtonControl>
    );
  }
}

Settings.displayName = COMPONENT_NAME;
export {Settings};
