//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Text, withText} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/cvaa';
import BaseComponent from '../base';
import {SmartContainer} from '../smart-container';
import {SmartContainerItem} from '../smart-container/smart-container-item';
import {default as Icon, IconType} from '../icon';
import {CVAAOverlay} from '../cvaa-overlay';
import Portal from 'preact-portal';
import {PLAYER_SIZE} from '../shell/shell';
import {Component} from 'preact/src/preact';
import {popupItemWithKeyboardA11y} from '../../utils/popup-item-keyboard-accessibility';

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

@connect(
  mapStateToProps,
  bindActions(actions)
)
@withText({
  audioLabelText: 'language.audio',
  captionsLabelText: 'language.captions',
  buttonAriaLabel: 'controls.language'
})

/**
 * LanguageControl component
 *
 * @class LanguageControl
 * @example <LanguageControl />
 * @extends {BaseComponent}
 */
class LanguageControl extends BaseComponent {
  state: Object;
  _controlLanguageElement: any;
  _portal: any;

  /**
   * Creates an instance of LanguageControl.
   * @param {Object} obj obj
   * @memberof LanguageControl
   */
  constructor(obj: Object) {
    super({name: 'LanguageControl', player: obj.player});
  }

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof LanguageControl
   */
  componentWillMount() {
    this.setState({smartContainerOpen: false});
  }

  /**
   * after component mounted, set event listener to click outside of the component
   *
   * @returns {void}
   * @memberof LanguageControl
   */
  componentDidMount() {
    this.eventManager.listen(document, 'click', e => this.handleClickOutside(e));
  }

  /**
   * event listener for clicking outside handler.
   *
   * @param {*} e - click event
   * @returns {void}
   * @memberof LanguageControl
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
   * @memberof LanguageControl
   */
  onControlButtonClick(): void {
    this.setState({smartContainerOpen: !this.state.smartContainerOpen});
  }

  /**
   * call to player selectTrack method and change audio track
   *
   * @param {Object} audioTrack - audio track
   * @returns {void}
   * @memberof LanguageControl
   */
  onAudioChange(audioTrack: Object): void {
    this.player.selectTrack(audioTrack);
    this.notifyClick({
      type: this.player.Track.AUDIO,
      track: audioTrack
    });
  }

  /**
   * Select the given text track
   *
   * @param {Object} textTrack - text track
   * @returns {void}
   * @memberof LanguageControl
   */
  onCaptionsChange(textTrack: Object): void {
    this.player.selectTrack(textTrack);
    this.notifyClick({
      type: this.player.Track.TEXT,
      track: textTrack
    });
  }

  /**
   * toggle the internal state of cvaa overlay
   *
   * @returns {void}
   * @memberof LanguageControl
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
   * @memberof LanguageControl
   */
  renderAll(audioOptions: Array<Object>, textOptions: Array<Object>, props: any): React$Element<any> {
    const portalSelector = `#${this.player.config.targetId} .overlay-portal`;
    return (
      <div ref={c => (this._controlLanguageElement = c)} className={[style.controlButtonContainer, style.controlLanguage].join(' ')}>
        <button
          tabIndex="0"
          aria-label={props.buttonAriaLabel}
          className={this.state.smartContainerOpen ? [style.controlButton, style.active].join(' ') : style.controlButton}
          onClick={() => this.onControlButtonClick()}>
          <Icon type={IconType.Language} />
        </button>
        {!this.state.smartContainerOpen || this.state.cvaaOverlay ? (
          undefined
        ) : (
          <SmartContainer targetId={this.player.config.targetId} title={<Text id="language.title" />} onClose={() => this.onControlButtonClick()}>
            {audioOptions.length <= 1 ? (
              undefined
            ) : (
              <SmartContainerItem
                icon="audio"
                label={props.audioLabelText}
                options={audioOptions}
                onSelect={audioTrack => this.onAudioChange(audioTrack)}
              />
            )}
            {textOptions.length <= 1 ? (
              undefined
            ) : (
              <SmartContainerItem
                icon="captions"
                label={props.captionsLabelText}
                options={textOptions}
                onSelect={textTrack => this.onCaptionsChange(textTrack)}
              />
            )}
            {textOptions.length <= 1 ? undefined : <KeyboardAccessibleAdvancedCaptionsAnchor />}
          </SmartContainer>
        )}
        {this.state.cvaaOverlay ? (
          <Portal into={portalSelector} ref={ref => (this._portal = ref)}>
            <CVAAOverlay
              player={this.player}
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
   * @memberof LanguageControl
   */
  render(props: any): React$Element<any> | void {
    const audioOptions = props.audioTracks.filter(t => t.label || t.language).map(t => ({label: t.label || t.language, active: t.active, value: t}));
    const textOptions = props.textTracks.map(t => ({
      label: t.label || t.language,
      active: t.active,
      value: t
    }));

    if (audioOptions.length > 1 || textOptions.length > 1) {
      return this.renderAll(audioOptions, textOptions, props);
    } else {
      return undefined;
    }
  }
}

class AdvancedCaptionsAnchor extends Component {
  render(props: any): React$Element<any> {
    return (
      <div
        tabIndex="-1"
        ref={el => {
          if (props.pushRef) {
            props.pushRef(el);
          }
        }}
        className={style.smartContainerItem}
        onSelect={this.toggleCVAAOverlay.bind(this)}>
        <a className={style.advancedCaptionsMenuLink} onClick={() => this.toggleCVAAOverlay()}>
          <Text id="language.advanced_captions_settings" />
        </a>
      </div>
    );
  }
}
const KeyboardAccessibleAdvancedCaptionsAnchor = popupItemWithKeyboardA11y(AdvancedCaptionsAnchor);

export {LanguageControl};
