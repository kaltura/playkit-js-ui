//@flow
import {h} from 'preact';
import {Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/share';
import {toHHMMSS, toSecondsFromHHMMSS} from '../../utils/time-format';
import BaseComponent from '../base';
import Overlay from '../overlay';
import {default as Icon, IconType} from '../icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @example <ShareOverlay player={this.player} />
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  open: state.share.overlayOpen
});

const shareOverlayState: Object = {
  Main: 'main',
  LinkOptions: 'link-options',
  EmbedOptions: 'embed-options'
};

@connect(mapStateToProps, bindActions(actions))
  /**
   * ShareOverlay component
   *
   * @class ShareOverlay
   * @extends {BaseComponent}
   */
class ShareOverlay extends BaseComponent {

  _shareUrlInput: HTMLInputElement;
  _embedCodeInput: HTMLInputElement;

  /**
   * Creates an instance of ShareOverlay.
   * @param {Object} obj obj
   * @memberof ShareOverlay
   */
  constructor(obj: Object) {
    super({name: 'ShareOverlay', player: obj.player});
  }

  /**
   * before component mount, set initial state
   *
   * @returns {void}
   * @memberof ShareOverlay
   */
  componentWillMount() {
    this.setState({
      state: shareOverlayState.Main,
      shareUrl: 'https://cdnapisec.kaltura.com/index.php?assetId=123456',
      startFrom: false,
      startFromValue: 0
    });
  }

  /**
   * before component unmounted, change the overlay state to the initial state
   *
   * @returns {void}
   * @memberof ShareOverlay
   */
  componentWillUnmount() {
    this.setState({
      state: shareOverlayState.Main
    });
  }

  /**
   * changing the overlay state
   *
   * @param {string} stateName state name
   * @returns {void}
   * @memberof ShareOverlay
   */
  transitionToState(stateName: string): void {
    this.setState({state: stateName});
  }

  /**
   * copy input text based on input element.
   * on success, set success internal component state for 2 seconds
   *
   * @param {HTMLInputElement} inputElement - start from input element
   * @returns {void}
   * @memberof ShareOverlay
   */
  copyUrl(inputElement: HTMLInputElement) {
    try {
      inputElement.select();
      document.execCommand('copy');
      inputElement.blur();

      this.setState({copySuccess: true});
      setTimeout(() => this.setState({copySuccess: false}), 2000);

    } catch (e) {
      this.setState({copySuccess: false});
    }
  }

  /**
   * toggle start from option checkbox in the internal component state
   *
   * @returns {void}
   * @memberof ShareOverlay
   */
  toggleStartFrom(): void {
    this.setState({startFrom: !this.state.startFrom});
  }

  /**
   * get share url method
   *
   * @returns {string} - share url
   * @memberof ShareOverlay
   */
  getShareUrl(): string {
    let url = this.state.shareUrl;
    if (this.state.startFrom) {
      url += `?start=${this.state.startFromValue}`;
    }
    return url;
  }

  /**
   * get embed code
   * #TODO: complete logic here
   *
   * @returns {string} - embed code
   * @memberof ShareOverlay
   */
  getEmbedCode(): string {
    return '<iframe src="//cdnapi.kaltura.com/p/243342/sp/24334200/embedIframeJs/uiconf_id/28685261/partner_id/243342?iframeembed=true&playerId=kdp&entry_id=1_sf5ovm7u&flashvars[streamerType]=auto" width="560" height="395" allowfullscreen webkitallowfullscreen mozAllowFullScreen frameborder="0"></iframe>';
  }

  /**
   * start from input change handler.
   * converts to seconds and save the new value in internal component state
   *
   * @param {*} e - input change event
   * @returns {void}
   * @memberof ShareOverlay
   */
  handleStartFromChange(e: any): void {
    let seconds = toSecondsFromHHMMSS(e.target.value);
    if (seconds >= this.player.duration) {
      this.setState({startFromValue: 1});
    }
    this.setState({startFromValue: seconds});
  }

  /**
   * opens new window for share
   *
   * @param {string} href - url to open
   * @returns {boolean} - false
   * @memberof ShareOverlay
   */
  share(href: string): boolean {
    window.open(href, '_blank', 'width=580,height=580');
    return false;
  }

  /**
   * renders main overlay state
   *
   * @returns {React$Element} - main state element
   * @memberof ShareOverlay
   */
  renderMainState(): React$Element<any> {
    return (
      <div className={this.state.state === shareOverlayState.Main ? 'overlay-screen active' : 'overlay-screen'}>
        <div className='title'>
          <Text id='share.share_title'/>
        </div>
        <div className="share-main-container">
          <div className='share-icons'>
            <a
              href='https://player.kaltura.com/video/220277207/share/facebook' target='_blank' rel='noopener noreferrer'
              title='Share on Facebook' role='button' aria-label='Share on Facebook'
              className='btn-rounded facebook-share-btn'
              onClick={() => this.share('https://player.kaltura.com/video/220277207/share/facebook')}
            >
              <Icon type={IconType.Facebook}/>
            </a>
            <a
              href='https://player.kaltura.com/video/220277207/share/twitter' target='_blank' rel='noopener noreferrer'
              title='Share on Twitter' role='button' aria-label='Share on Twitter'
              className='btn-rounded twitter-share-btn'
              onClick={() => this.share('https://player.kaltura.com/video/220277207/share/twitter')}
            >
              <Icon type={IconType.Twitter}/>
            </a>
            <a
              href='https://player.kaltura.com/video/220277207/share/google-plus' target='_blank'
              rel='noopener noreferrer'
              title='Share on Google Plus' role='button' aria-label='Share on Google Plus'
              className='btn-rounded google-plus-share-btn'
              onClick={() => this.share('https://player.kaltura.com/video/220277207/share/google')}
            >
              <Icon type={IconType.GooglePlus}/>
            </a>
            <a
              href='https://player.kaltura.com/video/220277207/share/linkedin' target='_blank' rel='noopener noreferrer'
              title='Share on Linkedin' role='button' aria-label='Share on Linkedin'
              className='btn-rounded linkedin-share-btn'
              onClick={() => this.share('https://player.kaltura.com/video/220277207/share/linkedin')}
            >
              <Icon type={IconType.Linkedin}/>
            </a>
            <a
              className='btn-rounded email-share-btn'
              href={`mailto:?subject=${encodeURIComponent('email subject')}&body=${encodeURIComponent('email body')}`}
            >
              <Icon type={IconType.Email}/>
            </a>
            <a
              className='btn-rounded embed-share-btn'
              onClick={() => this.transitionToState(shareOverlayState.EmbedOptions)}
            >
              <Icon type={IconType.Embed}/>
            </a>
          </div>
          <div>
            <div className='form-group has-icon'>
              <input type='text' placeholder='Share URL' className='form-control' value={this.state.shareUrl} readOnly/>
              <Icon type={IconType.Link}/>
            </div>
          </div>
          <a onClick={() => this.transitionToState(shareOverlayState.LinkOptions)}><Text id='share.link_options'/></a>
        </div>
      </div>
    )
  }

  /**
   * renders link options state
   *
   * @returns {React$Element} - link options element
   * @memberof ShareOverlay
   */
  renderLinkOptionsState(): React$Element<any> {
    let copyUrlClasses = 'btn-rounded btn-branded btn-copy-url';
    copyUrlClasses += this.state.copySuccess ? ' copied' : '';

    return (
      <div className={this.state.state === shareOverlayState.LinkOptions ? 'overlay-screen active' : 'overlay-screen'}>
        <div className='title'>Link options</div>
        <div className='link-options-container'>
          <div className='copy-url-row'>
            <div className='form-group has-icon input-copy-url' style='width: 350px;'>
              <input
                type='text'
                ref={c => this._shareUrlInput = c}
                placeholder='Share URL'
                className='form-control'
                value={this.getShareUrl()}
                readOnly
              />
              <Icon type={IconType.Link}/>
            </div>
            <a
              className={copyUrlClasses}
              onClick={() => this.copyUrl(this._shareUrlInput)}>
              <Icon type={IconType.Copy}/>
              <Icon type={IconType.Check}/>
            </a>
          </div>
          <div className='video-start-options-row'>
            <div className="checkbox d-inline-block">
              <input
                type='checkbox'
                id="start-from"
                checked={this.state.startFrom}
                onClick={() => this.toggleStartFrom()}
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

  /**
   * renders embed options state
   *
   * @returns {React$Element} - embed options element
   * @memberof ShareOverlay
   */
  renderEmbedOptionsState(): React$Element<any> {
    let copyUrlClasses = 'btn-rounded btn-branded btn-copy-url';
    copyUrlClasses += this.state.copySuccess ? ' copied' : '';

    return (
      <div className={this.state.state === shareOverlayState.EmbedOptions ? 'overlay-screen active' : 'overlay-screen'}>
        <div className='title'>Embed options</div>
        <div className='link-options-container'>
          <div className='copy-url-row'>
            <div className='form-group has-icon input-copy-url' style='width: 350px;'>
              <input
                type='text'
                ref={c => this._embedCodeInput = c}
                placeholder='Share URL'
                className='form-control'
                value={this.getEmbedCode()}
                readOnly
              />
              <Icon type={IconType.Embed}/>
            </div>
            <a
              className={copyUrlClasses}
              onClick={() => this.copyUrl(this._embedCodeInput)}>
              <Icon type={IconType.Copy}/>
              <Icon type={IconType.Check}/>
            </a>
          </div>
          <div className='video-start-options-row'>
            <div className="checkbox d-inline-block">
              <input
                type='checkbox'
                id="start-from"
                checked={this.state.startFrom}
                onClick={() => this.toggleStartFrom()}
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

  /**
   * utility function to switch and render the right overlay state element based on the overlay state.
   *
   * @returns {React$Element} - current state element
   * @memberof ShareOverlay
   */
  renderStateContent(): React$Element<any> {
    switch (this.state.state) {
      case shareOverlayState.Main:
        return this.renderMainState();

      case shareOverlayState.LinkOptions:
        return this.renderLinkOptionsState();

      case shareOverlayState.EmbedOptions:
        return this.renderEmbedOptionsState();

      default:
        return this.renderMainState();
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof ShareOverlay
   */
  render(props: any): React$Element<any> {
    return (
      <Overlay open onClose={() => props.onClose()} type='share'>
        {this.renderStateContent()}
      </Overlay>
    )
  }
}

export default ShareOverlay;
