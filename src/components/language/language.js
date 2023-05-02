//@flow
// eslint-disable-next-line no-unused-vars
import {h, Component, Fragment} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/cvaa';
import {SmartContainerItem} from '../smart-container/smart-container-item';
import {IconType} from '../icon';
import {CVAAOverlay} from '../cvaa-overlay';
import {createPortal} from 'preact/compat';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {withLogger} from 'components/logger';
import {withEventDispatcher} from 'components/event-dispatcher';
import {KeyMap} from 'utils/key-map';
import {withKeyboardEvent} from 'components/keyboard';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  textTracks: state.engine.textTracks,
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize,
  showCaptionsMenu: state.config.showCaptionsMenu
});

const COMPONENT_NAME = 'Language';

/**
 * Language component
 *
 * @class Language
 * @example <Language />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withEventManager
@withKeyboardEvent(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({
  captionsLabelText: 'captions.captions',
  advancedCaptionsSettingsText: 'captions.advanced_captions_settings'
})
class Language extends Component {
  state: Object;
  _controlLanguageElement: HTMLDivElement;
  _lastActiveTextLanguage: string = '';
  // ie11 fix (FEC-7312) - don't remove
  _portal: any;
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.C
      },
      action: () => {
        const {player, logger} = this.props;
        let activeTextTrack = player.getActiveTracks().text;
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
    }
  ];

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof Language
   */
  componentWillMount() {
    this.setState({smartContainerOpen: false});
  }

  /**
   * after component mounted, set event listener to click outside of the component
   *
   * @returns {void}
   * @memberof Language
   */
  componentDidMount() {
    this.props.eventManager.listen(document, 'click', e => this.handleClickOutside(e));
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  /**
   * We update the last language selected here upon trackTracks props change. This is done to make sure we update the
   * last text track lanague upon language menu selection and using the (C) keyboard key.
   * @param {Object} nextProps - the props that will replace the current props
   * @returns {void}
   */
  componentWillReceiveProps(nextProps: Object): void {
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
   * @memberof Language
   */
  handleClickOutside(e: any): void {
    if (
      this._controlLanguageElement &&
      !this.props.isMobile &&
      !this._controlLanguageElement.contains(e.target) &&
      this.state.smartContainerOpen &&
      !this.state.cvaaOverlay &&
      !this.props.isSmallSize
    ) {
      this.setState({smartContainerOpen: false});
    }
  }

  /**
   * toggle smart container internal state on control button click
   *
   * @returns {void}
   * @memberof Language
   */
  toggleSmartContainerOpen = (): void => {
    this.setState(prevState => {
      return {smartContainerOpen: !prevState.smartContainerOpen};
    });
  };

  /**
   * Select the given text track
   *
   * @param {Object} textTrack - text track
   * @returns {void}
   * @memberof Language
   */
  onCaptionsChange(textTrack: Object): void {
    if (textTrack === this.props.advancedCaptionsSettingsText) {
      this.toggleCVAAOverlay();
      return;
    }
    this.props.player.selectTrack(textTrack);
    this.props.notifyClick({
      type: this.props.player.Track.TEXT,
      track: textTrack
    });
  }

  /**
   * toggle the internal state of cvaa overlay
   *
   * @returns {void}
   * @memberof Language
   */
  toggleCVAAOverlay = (): void => {
    this.setState(prevState => {
      return {cvaaOverlay: !prevState.cvaaOverlay};
    });
  };

  /**
   * on cvaa overlay close handler
   *
   * @returns {void}
   * @memberof Language
   */
  onCVAAOverlayClose = (): void => {
    this.toggleCVAAOverlay();
    this.toggleSmartContainerOpen();
  };

  /**
   * render function
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof Language
   */
  render(props: any): React$Element<any> | void {
    const targetId = document.getElementById(this.props.player.config.targetId) || document;
    const portalSelector = `.overlay-portal`;
    const textOptions = props.textTracks.map(t => ({
      label: t.label || t.language,
      active: t.active,
      value: t
    }));

    textOptions.push({label: props.advancedCaptionsSettingsText, value: props.advancedCaptionsSettingsText, active: false});

    return !props.showCaptionsMenu || textOptions.length <= 1 ? undefined : (
      <>
        <SmartContainerItem
          pushRef={el => {
            props.pushRef(el);
          }}
          icon={IconType.Captions}
          label={this.props.captionsLabelText}
          options={textOptions}
          onMenuChosen={textTrack => this.onCaptionsChange(textTrack)}
        />
        {this.state.cvaaOverlay ? createPortal(<CVAAOverlay onClose={this.onCVAAOverlayClose} />, targetId.querySelector(portalSelector)) : <div />}
      </>
    );
  }
}

Language.displayName = COMPONENT_NAME;
export {Language};
