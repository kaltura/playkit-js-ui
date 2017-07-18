//@flow
import { h } from 'preact';
import { Localizer, Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/cvaa';
import BaseComponent from '../base';
import SmartContainer from '../smart-container';
import SmartContainerItem from '../smart-container/smart-container-item';
import Icon from '../icon';
import CVAAOverlay from '../cvaa-overlay';
import Menu from '../menu';
import Portal from 'preact-portal';

const mapStateToProps = state => ({
  audioTracks: state.engine.audioTracks,
  textTracks: state.engine.textTracks,
  overlayOpen: state.cvaa.overlayOpen,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
class LanguageControl extends BaseComponent {
  state: Object;
  _controlLanguageElement: any;

  constructor(obj: Object) {
    super({name: 'LanguageControl', player: obj.player});
  }

  componentWillMount() {
    this.setState({smartContainerOpen: false});
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside.bind(this), true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside.bind(this), true);
  }

  handleClickOutside(e: Event) {
    if (this._controlLanguageElement && !this.props.isMobile && !this._controlLanguageElement.contains(event.target) && this.state.smartContainerOpen && !this.state.cvaaOverlay) {
      e.stopPropagation();
      this.setState({smartContainerOpen: false});
    }
  }

  onControlButtonClick() {
    this.setState({smartContainerOpen: !this.state.smartContainerOpen});
  }

  onAudioChange(audioTrack: Object) {
    this.player.selectTrack(audioTrack);
  }

  onCaptionsChange(textTrack: Object) {
    this.player.selectTrack(textTrack);
  }

  toggleCVAAOverlay() {
    this.setState({ cvaaOverlay: !this.state.cvaaOverlay });
  }

  renderAudioSettingsOnly(audioOptions: Array<Object>) {
    return (
      <div className='control-button-container control-audio'>
        <button
          tabIndex='0'
          className={this.state.smartContainerOpen ? 'control-button active' : 'control-button'}
          onClick={() => this.onControlButtonClick()}
        >
          <Icon type='audio' />
        </button>
        { !this.state.smartContainerOpen && !this.props.isMobile ? undefined :
        <Menu hideSelect options={audioOptions} onSelect={(o) => this.onAudioChange(o)} />
        }
      </div>
    )
  }

  renderTextSettingsOnly(textOptions: Array<Object>) {
    return (
      <div className='control-button-container control-audio'>
        <button
          tabIndex='0'
          className={this.state.smartContainerOpen ? 'control-button active' : 'control-button'}
          onClick={() => this.onControlButtonClick()}
        >
          <Icon type='captions' />
        </button>
        { !this.state.smartContainerOpen && !this.props.isMobile ? undefined :
        <Menu hideSelect options={textOptions} onSelect={(o) => this.onCaptionsChange(o)} />
        }
      </div>
    )
  }

  renderAll(audioOptions: Array<Object>, textOptions: Array<Object>) {
    return (
      <div
        ref={c => this._controlLanguageElement=c}
        className='control-button-container control-language'
      >
        <Localizer>
          <button
            tabIndex='0'
            aria-label={<Text id='controls.language' />}
            className={this.state.smartContainerOpen ? 'control-button active' : 'control-button'}
            onClick={() => this.onControlButtonClick()}
          >
            <Icon type='language' />
          </button>
        </Localizer>
        { !this.state.smartContainerOpen || this.state.cvaaOverlay ? undefined :
        <SmartContainer title='Language' onClose={() => this.onControlButtonClick()}>
          <Localizer>
            <SmartContainerItem
              icon='audio'
              label={<Text id='language.audio' />}
              options={audioOptions}
              onSelect={audioTrack => this.onAudioChange(audioTrack)}
            />
          </Localizer>
          <Localizer>
            <SmartContainerItem
              icon='captions'
              label={<Text id='language.captions' />}
              options={textOptions}
              onSelect={textTrack => this.onCaptionsChange(textTrack)}
            />
          </Localizer>
          <div className='smart-container-item'>
            <a onClick={() => this.toggleCVAAOverlay()}>
              <Text id='language.advanced_captions_settings' />
            </a>
          </div>
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

  render(props: any) {
    var audioOptions = props.audioTracks.map(t => ({ label: t.label || t.language, active: t.active, value: t }));
    var textOptions = props.textTracks.filter(t => t.kind === 'subtitles').map(t => ({ label: t.label || t.language, active: t.active, value: t }));

    if (audioOptions.length > 0 && textOptions.length > 0) {
      return this.renderAll(audioOptions, textOptions);
    }
    else if (audioOptions.length > 0 && textOptions.length === 0) {
      return this.renderAudioSettingsOnly(audioOptions);
    }
    else if (audioOptions.length === 0 && textOptions.length > 0) {
      return this.renderTextSettingsOnly(textOptions);
    }
    else {
      return undefined;
    }
  }
}

export default LanguageControl;
