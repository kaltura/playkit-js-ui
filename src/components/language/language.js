//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Text, withText} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/cvaa';
import {SmartContainer} from '../smart-container';
import {SmartContainerItem} from '../smart-container/smart-container-item';
import {default as Icon, IconType} from '../icon';
import {CVAAOverlay} from '../cvaa-overlay';
import Portal from 'preact-portal';
import {PLAYER_SIZE} from '../shell/shell';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {withLogger} from 'components/logger';
import {withEventDispatcher} from 'components/event-dispatcher';
import {KeyMap} from 'utils/key-map';

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
  playerSize: state.shell.playerSize
});

const COMPONENT_NAME = 'Language';

@connect(
  mapStateToProps,
  bindActions(actions)
)
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({
  audioLabelText: 'language.audio',
  captionsLabelText: 'language.captions',
  buttonAriaLabel: 'controls.language'
})

/**
 * Language component
 *
 * @class Language
 * @example <Language />
 * @extends {Component}
 */
class Language extends Component {
  state: Object;
  _controlLanguageElement: any;
  _portal: any;

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
      ![PLAYER_SIZE.SMALL, PLAYER_SIZE.EXTRA_SMALL].includes(this.props.playerSize)
    ) {
      if (e.target.classList.contains('overlay-action')) {
        e.stopPropagation();
      }
      this.setState({smartContainerOpen: false});
    }
  }

  /**
   * toggle smart container internal state on control button click
   *
   * @returns {void}
   * @memberof Language
   */
  onControlButtonClick(): void {
    this.setState({smartContainerOpen: !this.state.smartContainerOpen});
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
    this.setState({cvaaOverlay: !this.state.cvaaOverlay});
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
      <div ref={c => (this._controlLanguageElement = c)} className={[style.controlButtonContainer, style.controlLanguage].join(' ')}>
        <button
          tabIndex="0"
          aria-label={this.props.buttonAriaLabel}
          className={this.state.smartContainerOpen ? [style.controlButton, style.active].join(' ') : style.controlButton}
          onClick={() => this.onControlButtonClick()}>
          <Icon type={IconType.Language} />
        </button>
        {!this.state.smartContainerOpen || this.state.cvaaOverlay ? (
          undefined
        ) : (
          <SmartContainer
            targetId={this.props.player.config.targetId}
            title={<Text id="language.title" />}
            onClose={() => this.onControlButtonClick()}>
            {audioOptions.length <= 1 ? (
              undefined
            ) : (
              <SmartContainerItem
                icon="audio"
                label={this.props.audioLabelText}
                options={audioOptions}
                onMenuChosen={audioTrack => this.onAudioChange(audioTrack)}
              />
            )}
            {textOptions.length <= 1 ? (
              undefined
            ) : (
              <SmartContainerItem
                icon="captions"
                label={this.props.captionsLabelText}
                options={textOptions}
                onMenuChosen={textTrack => this.onCaptionsChange(textTrack)}
              />
            )}
            {textOptions.length <= 1 ? (
              undefined
            ) : (
              <AdvancedCaptionsAnchor onMenuChosen={() => this.toggleCVAAOverlay()} onClose={() => this.onControlButtonClick()} />
            )}
          </SmartContainer>
        )}
        {this.state.cvaaOverlay ? (
          <Portal into={portalSelector} ref={ref => (this._portal = ref)}>
            <CVAAOverlay
              onClose={() => {
                this.toggleCVAAOverlay();
                this.onControlButtonClick();
              }}
            />
          </Portal>
        ) : (
          <div />
        )}
      </div>
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
          tabIndex="-1"
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
