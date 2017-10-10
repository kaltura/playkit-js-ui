//@flow
import { h } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/cvaa';
import BaseComponent from '../base';
import SmartContainer from '../smart-container';
import SmartContainerItem from '../smart-container/smart-container-item';
import { default as Icon, IconType } from '../icon';
import CVAAOverlay from '../cvaa-overlay';
import Portal from 'preact-portal';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  audioTracks: state.engine.audioTracks,
  textTracks: state.engine.textTracks,
  overlayOpen: state.cvaa.overlayOpen,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
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
    document.addEventListener('click', this.handleClickOutside.bind(this), true);
  }

  /**
   * before component unmounted, remove event listener
   *
   * @returns {void}
   * @memberof LanguageControl
   */
  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), true);
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
      !this.state.cvaaOverlay
    ) {
      if (e.target.classList.contains('overlay-play')) {
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
  }

  /**
   * toggle the internal state of cvaa overlay
   *
   * @returns {void}
   * @memberof LanguageControl
   */
  toggleCVAAOverlay(): void {
    this.setState({ cvaaOverlay: !this.state.cvaaOverlay });
  }

  /**
   * render smart container with both audio and text options if exist
   *
   * @param {Array<Object>} audioOptions - audio tracks
   * @param {Array<Object>} textOptions - text tracks
   * @returns {React$Element} - component
   * @memberof LanguageControl
   */
  renderAll(audioOptions: Array<Object>, textOptions: Array<Object>): React$Element<any> {
    return (
      <div
        ref={c => this._controlLanguageElement=c}
        className='kp-control-button-container kp-control-language'
      >
        <Localizer>
          <button
            aria-label={<Text id='controls.language' />}
            className={this.state.smartContainerOpen ? 'kp-control-button kp-active' : 'kp-control-button'}
            onClick={() => this.onControlButtonClick()}
          >
            <Icon type={IconType.Language} />
          </button>
        </Localizer>
        { !this.state.smartContainerOpen || this.state.cvaaOverlay ? undefined :
        <SmartContainer title='Language' onClose={() => this.onControlButtonClick()}>
          { audioOptions.length === 0 ? undefined :
            <Localizer>
              <SmartContainerItem
                icon='audio'
                label={<Text id='language.audio' />}
                options={audioOptions}
                onSelect={audioTrack => this.onAudioChange(audioTrack)}
              />
            </Localizer>
          }
          { textOptions.length === 0 ? undefined :
            <Localizer>
              <SmartContainerItem
                icon='captions'
                label={<Text id='language.captions' />}
                options={textOptions}
                onSelect={textTrack => this.onCaptionsChange(textTrack)}
              />
            </Localizer>
          }
          { textOptions.length === 0 ? undefined :
            <div className='kp-smart-container-item'>
              <a onClick={() => this.toggleCVAAOverlay()}>
                <Text id='language.advanced_captions_settings' />
              </a>
            </div>
          }
        </SmartContainer>
        }
        { this.state.cvaaOverlay ? (
          <Portal into="#overlay-portal">
            <CVAAOverlay onClose={() => this.toggleCVAAOverlay()} />
          </Portal>
        ): null }
      </div>
    )
  }

  /**
   * root render function. will decide to render audio only / text only or both based on the available options
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof LanguageControl
   */
  render(props: any): React$Element<any> | void {
    const audioOptions = props.audioTracks
      .filter(t => t.label || t.language)
      .map(t => ({ label: t.label || t.language, active: t.active, value: t }));
    const textOptions = props.textTracks.filter(t => t.kind === 'subtitles').map(t => ({ label: t.label || t.language, active: t.active, value: t }));

    if (audioOptions.length > 0 || textOptions.length > 0) {
      return this.renderAll(audioOptions, textOptions);
    }
    else {
      return undefined;
    }
  }
}

export default LanguageControl;
