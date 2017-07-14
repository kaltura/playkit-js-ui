//@flow
import { h } from 'preact';
import { Text } from 'preact-i18n';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/share';
import { toHHMMSS, toSecondsFromHHMMSS } from '../../utils/time-format';
import BaseComponent from '../base';
import Overlay from '../overlay';
import Icon from '../icon';

const mapStateToProps = state => ({
  open: state.share.overlayOpen
});

const shareOverlayState: Object = {
  Main: 'main',
  LinkOptions: 'link-options',
  EmbedOptions: 'embed-options'
};

@connect(mapStateToProps, bindActions(actions))
class ShareOverlay extends BaseComponent {

  _shareUrlInput: HTMLInputElement;

  constructor() {
    super({name: 'ShareOverlay'});
  }

  componentWillUnmount() {
    this.setState({
      state: shareOverlayState.Main
    });
  }

  componentWillMount() {
    this.setState({
      state: shareOverlayState.Main,
      shareUrl: 'https://cdnapisec.kaltura.com/index.php?assetId=123456',
      startFrom: false,
      startFromValue: 0
    });
  }

  transitionToState(stateName: string) {
    this.setState({state: stateName});
  }

  copyUrl() {
    try {
      this._shareUrlInput.select();
      document.execCommand('copy');
      this._shareUrlInput.blur();

      this.setState({copySuccess: true});
      setTimeout(() => this.setState({copySuccess: false}) , 2000);

    } catch(e) {
      this.setState({copySuccess: false});
    }
  }

  toggleStartFrom() {
    this.setState({startFrom: !this.state.startFrom});
  }

  getShareUrl() {
    let url = this.state.shareUrl;
    if (this.state.startFrom) {
      url += `?start=${this.state.startFromValue}`
    }
    return url;
  }

  handleStartFromChange(e) {
    let seconds = toSecondsFromHHMMSS(e.target.value);
    if (seconds >= this.player.duration) {
      this.setState({startFromValue: 1});
    }
    this.setState({startFromValue: seconds});
  }

  share(href) {
    window.open(href,'_blank','width=580,height=580');
    return false;
  }

  renderMainState() {
    return (
      <div className={this.state.state === shareOverlayState.Main ? 'overlay-screen active' : 'overlay-screen'}>
        <div className='title'>
          <Text id='share.share_title' />
        </div>
        <div className="share-main-container">
          <div className='share-icons'>
            <a
              href='https://player.kaltura.com/video/220277207/share/facebook' target='_blank' rel='noopener noreferrer'
              title='Share on Facebook' role='button' aria-label='Share on Facebook'
              className='btn-rounded facebook-share-btn'
              onClick={() => this.share('https://player.kaltura.com/video/220277207/share/facebook')}
            >
              <Icon type='facebook' />
            </a>
            <a
              href='https://player.kaltura.com/video/220277207/share/twitter' target='_blank' rel='noopener noreferrer'
              title='Share on Twitter' role='button' aria-label='Share on Twitter'
              className='btn-rounded twitter-share-btn'
              onClick={() => this.share('https://player.kaltura.com/video/220277207/share/twitter')}
            >
              <Icon type='twitter' />
            </a>
            <a
              href='https://player.kaltura.com/video/220277207/share/google-plus' target='_blank' rel='noopener noreferrer'
              title='Share on Google Plus' role='button' aria-label='Share on Google Plus'
              className='btn-rounded google-plus-share-btn'
              onClick={() => this.share('https://player.kaltura.com/video/220277207/share/google')}
            >
              <Icon type='google-plus' />
            </a>
            <a
              href='https://player.kaltura.com/video/220277207/share/linkedin' target='_blank' rel='noopener noreferrer'
              title='Share on Linkedin' role='button' aria-label='Share on Linkedin'
              className='btn-rounded linkedin-share-btn'
              onClick={() => this.share('https://player.kaltura.com/video/220277207/share/linkedin')}
            >
              <Icon type='linkedin' />
            </a>
            <a
              className='btn-rounded email-share-btn'
              href={`mailto:?subject=${encodeURIComponent('email subject')}&body=${encodeURIComponent('email body')}`}
            >
              <Icon type='email' />
            </a>
            <a className='btn-rounded embed-share-btn'><Icon type='embed' /></a>
          </div>
          <div>
            <div className='form-group has-icon'>
              <input type='text' placeholder='Share URL' className='form-control' value={this.state.shareUrl} readOnly />
              <Icon type='link' />
            </div>
          </div>
          <a onClick={() => this.transitionToState(shareOverlayState.LinkOptions)}><Text id='share.link_options' /></a>
        </div>
      </div>
    )
  }

  renderLinkOptionsState() {
    var copyUrlClasses = 'btn-rounded btn-branded btn-copy-url';
    copyUrlClasses += this.state.copySuccess ? ' copied' : '';

    return (
      <div className={this.state.state === shareOverlayState.LinkOptions ? 'overlay-screen active' : 'overlay-screen'}>
        <div className='title'>Link options</div>
        <div className='link-options-container'>
          <div className='copy-url-row'>
            <div className='form-group has-icon input-copy-url' style='width: 350px;'>
              <input
                type='text'
                ref={c => this._shareUrlInput=c}
                placeholder='Share URL'
                className='form-control'
                value={this.getShareUrl()}
                readOnly
              />
              <Icon type='link' />
            </div>
            <a
              className={copyUrlClasses}
              onClick={() => this.copyUrl()}>
              <Icon type='copy' />
              <Icon type='check' />
            </a>
          </div>
          <div className='video-start-options-row'>
            <div className="checkbox d-inline-block">
              <input
                type='checkbox'
                id="start-from"
                checked={this.state.startFrom}
                onClick={e => this.toggleStartFrom(e)}
              />
              <label htmlFor="start-from">Start video at </label>
            </div>
            <div className='form-group d-inline-block'>
              <input
                type='text'
                className='form-control'
                onChange={e => this.handleStartFromChange(e)}
                value={toHHMMSS(this.state.startFromValue)}
                style='width: 72px;'
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  render(props: any) {
    return (
      <Overlay open onClose={() => props.onClose()} type='share'>
        {this.renderMainState()}
        {this.renderLinkOptionsState()}
      </Overlay>
    )
  }
}

export default ShareOverlay;
