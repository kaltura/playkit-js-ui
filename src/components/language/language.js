//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Text, withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/cvaa';
import {SmartContainer} from '../smart-container';
import {SmartContainerItem} from '../smart-container/smart-container-item';
import {default as Icon, IconType} from '../icon';
import {CVAAOverlay} from '../cvaa-overlay';
import {createPortal} from 'preact/compat';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {withLogger} from 'components/logger';
import {withEventDispatcher} from 'components/event-dispatcher';
import {KeyMap} from 'utils/key-map';
import {withKeyboardEvent} from 'components/keyboard';
import {Tooltip} from 'components/tooltip';
import {Button} from 'components/button';
import {ButtonControl} from 'components/button-control';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  audioTracks: state.engine.audioTracks,
  textTracks: state.engine.textTracks,
  overlayOpen: state.cvaa.overlayOpen,
  isMobile: state.shell.isMobile,
  isSmallSize: state.shell.isSmallSize
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
  audioLabelText: 'language.audio',
  captionsLabelText: 'language.captions',
  buttonLabel: 'controls.language'
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
  toggleSmartContainerOpen(): void {
    this.setState(prevState => {
      return {smartContainerOpen: !prevState.smartContainerOpen};
    });
  }

  /**
   * call to player selectTrack method and change audio track
   *
   * @param {Object} audioTrack - audio track
   * @returns {void}
   * @memberof Language
   */
  onAudioChange(audioTrack: Object): void {
    this.props.player.selectTrack(audioTrack);
    this.props.notifyClick({
      type: this.props.player.Track.AUDIO,
      track: audioTrack
    });
  }

  /**
   * Select the given text track
   *
   * @param {Object} textTrack - text track
   * @returns {void}
   * @memberof Language
   */
  onCaptionsChange(textTrack: Object): void {
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
  toggleCVAAOverlay(): void {
    this.setState(prevState => {
      return {cvaaOverlay: !prevState.cvaaOverlay};
    });
  }

  /**
   * render smart container with both audio and text options if exist
   *
   * @param {Array<Object>} audioOptions - audio tracks
   * @param {Array<Object>} textOptions - text tracks
   * @returns {React$Element} - component
   * @memberof Language
   */
  renderAll(audioOptions: Array<Object>, textOptions: Array<Object>): React$Element<any> {
    const portalSelector = `#${this.props.player.config.targetId} .overlay-portal`;
    return (
      <ButtonControl name={COMPONENT_NAME} ref={c => (c ? (this._controlLanguageElement = c) : undefined)}>
        <Tooltip label={this.props.buttonLabel}>
          <Button
            tabIndex="0"
            aria-haspopup="true"
            aria-label={this.props.buttonLabel}
            className={this.state.smartContainerOpen ? [style.controlButton, style.active].join(' ') : style.controlButton}
            onClick={() => this.toggleSmartContainerOpen()}>
            <Icon type={IconType.Language} />
          </Button>
        </Tooltip>
        {!this.state.smartContainerOpen || this.state.cvaaOverlay ? undefined : (
          <SmartContainer
            targetId={this.props.player.config.targetId}
            title={<Text id="language.title" />}
            onClose={() => this.toggleSmartContainerOpen()}>
            {audioOptions.length <= 1 ? undefined : (
              <SmartContainerItem
                icon="audio"
                label={this.props.audioLabelText}
                options={audioOptions}
                onMenuChosen={audioTrack => this.onAudioChange(audioTrack)}
              />
            )}
            {textOptions.length <= 1 ? undefined : (
              <SmartContainerItem
                icon="captions"
                label={this.props.captionsLabelText}
                options={textOptions}
                onMenuChosen={textTrack => this.onCaptionsChange(textTrack)}
              />
            )}
            {textOptions.length <= 1 ? undefined : (
              <AdvancedCaptionsAnchor
                isPortal={this.props.isMobile || this.props.isSmallSize}
                onMenuChosen={() => this.toggleCVAAOverlay()}
                onClose={() => this.toggleSmartContainerOpen()}
              />
            )}
          </SmartContainer>
        )}
        {this.state.cvaaOverlay ? (
          createPortal(
            <CVAAOverlay
              onClose={() => {
                this.toggleCVAAOverlay();
                this.toggleSmartContainerOpen();
              }}
            />,
            document.querySelector(portalSelector)
          )
        ) : (
          <div />
        )}
      </ButtonControl>
    );
  }

  /**
   * root render function. will decide to render audio only / text only or both based on the available options
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof Language
   */
  render(props: any): React$Element<any> | void {
    const audioOptions = props.audioTracks.filter(t => t.label || t.language).map(t => ({label: t.label || t.language, active: t.active, value: t}));
    const textOptions = props.textTracks.map(t => ({
      label: t.label || t.language,
      active: t.active,
      value: t
    }));

    if (audioOptions.length > 1 || textOptions.length > 1) {
      return this.renderAll(audioOptions, textOptions);
    } else {
      return undefined;
    }
  }
}

/**
 * AdvancedCaptionsAnchor component
 * @class AdvancedCaptionsAnchor
 * @extends {Component}
 */
class AdvancedCaptionsAnchor extends Component {
  /**
   * rendered AdvancedCaptionsAnchor jsx
   * @param {*} props - component props
   * @returns {?React$Element} - main state element
   * @memberof AdvancedCaptionsAnchor
   */
  render(props: any): React$Element<any> {
    return (
      <div className={style.smartContainerItem}>
        <a
          role="button"
          aria-haspopup="true"
          tabIndex={props.isPortal ? '0' : '-1'}
          ref={el => {
            if (props.pushRef) {
              props.pushRef(el);
            }
          }}
          className={style.advancedCaptionsMenuLink}
          onClick={() => this.props.onMenuChosen()}
          onKeyDown={e => {
            switch (e.keyCode) {
              case KeyMap.ENTER:
                this.props.onMenuChosen();
                e.stopPropagation();
                break;
            }
          }}>
          <Text id="language.advanced_captions_settings" />
        </a>
      </div>
    );
  }
}

Language.displayName = COMPONENT_NAME;
export {Language};
