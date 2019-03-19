//@flow
import {h} from 'preact';
import {Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/share';
import {toHHMMSS, toSecondsFromHHMMSS} from '../../utils/time-format';
import BaseComponent from '../base';
import {Overlay} from '../overlay';
import {default as Icon, IconType} from '../icon';
import style from '../../styles/style.scss';
import {CopyButton} from '../copy-button/copy-button';

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

const ShareButton = (props) => {
  /**
   * opens new window for share
   *
   * @param {string} href - url to open
   * @returns {boolean} - false
   * @memberof ShareOverlay
   */
  const share = () => {
    const shareUrl = props.config.shareUrl;
    const templateUrl = props.config.templateUrl;
    let href = shareUrl;
    if (templateUrl) {
      href = templateUrl.replace('{shareUrl}', shareUrl);
    }
    window.open(href, '_blank', 'width=580,height=580');
    return false;
  };

  return (
    <a
      href={props.config.shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={props.config.title}
      role="button"
      aria-label={props.config.ariaLable}
      className={[style.btnRounded, style[props.config.iconType], props.config.iconType].join(' ')}
      onClick={() => share()}>
      <Icon style={props.config.iconType === 'svg' ? `background-image: url(${props.config.svg})` : ``} type={props.config.iconType} />
    </a>
  );
}

@connect(
  mapStateToProps,
  bindActions(actions)
)
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
      shareUrl: this._getShareUrl(),
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
    inputElement.select();
    document.execCommand('copy');
    inputElement.blur();
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
    const playerParams = this._getPlayerParams();
    return `<iframe type="text/javascript" src='${playerParams.serviceUrl}/p/${playerParams.pid}/embedPlaykitJs/uiconf_id/${playerParams.uiconf}
      ?iframeembed=true&entry_id=${
        playerParams.entryId
      }' style="width: 560px;height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen frameborder="0"></iframe>`;
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

  _getShareUrl(): string {
    const playerParams = this._getPlayerParams();
    if (this.props.shareUrl) {
      return this.props.shareUrl.replace('mediaId', playerParams.entryId);
    } else {
      return `${playerParams.serviceUrl}/index.php/extwidget/preview/partner_id/${playerParams.pid}/uiconf_id/${playerParams.uiconf}/entry_id/${
        playerParams.entryId
      }
      /embed/dynamic`;
    }
  }

  _getPlayerParams(): object {
    return {
      pid: this.player.config.provider.partnerId,
      uiconf: this.player.config.provider.uiConfId,
      entryId: this.player.config.sources.id,
      serviceUrl: this.player.config.provider.env.serviceUrl.replace('api_v3', '')
    };
  }

  _createSocialNetworks(socialNetworksConfig: Array<Object>): React$Element {
    return socialNetworksConfig.map(social => {
      if (social.iconType === 'default') {
        social.iconType = social.name;
        social.shareUrl = this._getShareUrl();
      }
      return <ShareButton key={social.name} config={social} />;
    });
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
        <div className={style.title}>
          <Text id="share.share_title" />
        </div>
        <div className={style.shareMainContainer}>
          <div className={style.shareIcons}>
            {this._createSocialNetworks(this.props.socialNetworks)}
            <a
              className={[style.btnRounded, style.emailShareBtn].join(' ')}
              href={`mailto:?subject=${encodeURIComponent('email subject')}&body=${encodeURIComponent('email body')}`}>
              <Icon type={IconType.Email} />
            </a>
            <a className={[style.btnRounded, style.embedShareBtn].join(' ')} onClick={() => this.transitionToState(shareOverlayState.EmbedOptions)}>
              <Icon type={IconType.Embed} />
            </a>
          </div>
          <div>
            <div className={[style.formGroup, style.hasIcon].join(' ')}>
              <input type="text" placeholder="Share URL" className={style.formControl} value={this.state.shareUrl} readOnly />
              <Icon type={IconType.Link} />
            </div>
          </div>
          <a onClick={() => this.transitionToState(shareOverlayState.LinkOptions)}>
            <Text id="share.link_options" />
          </a>
        </div>
      </div>
    );
  }

  /**
   * renders link options state
   *
   * @returns {React$Element} - link options element
   * @memberof ShareOverlay
   */
  renderLinkOptionsState(): React$Element<any> {
    return (
      <div className={this.state.state === shareOverlayState.LinkOptions ? 'overlay-screen active' : 'overlay-screen'}>
        <div className={style.title}>Link options</div>
        <div className={style.linkOptionsContainer}>
          <div className={style.copyUrlRow}>
            <div className={[style.formGroup, style.hasIcon, style.inputCopyUrl].join(' ')} style="width: 350px;">
              <input
                type="text"
                ref={c => (this._shareUrlInput = c)}
                placeholder="Share URL"
                className={style.formControl}
                value={this.getShareUrl()}
                readOnly
              />
              <Icon type={IconType.Link} />
            </div>
            <CopyButton copy={() => this.copyUrl(this._shareUrlInput)} />
          </div>
          <div className={style.videoStartOptionsRow}>
            <div className={[style.checkbox, style.dInlineBlock].join(' ')}>
              <input type="checkbox" id="start-from" checked={this.state.startFrom} onClick={() => this.toggleStartFrom()} />
              <label htmlFor="start-from">Start video at </label>
            </div>
            <div className={[style.formGroup, style.dInlineBlock].join(' ')}>
              <input
                type="text"
                className={style.formControl}
                onChange={e => this.handleStartFromChange(e)}
                value={toHHMMSS(this.state.startFromValue)}
                style="width: 72px;"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * renders embed options state
   *
   * @returns {React$Element} - embed options element
   * @memberof ShareOverlay
   */
  renderEmbedOptionsState(): React$Element<any> {
    return (
      <div className={this.state.state === shareOverlayState.EmbedOptions ? 'overlay-screen active' : 'overlay-screen'}>
        <div className={style.title}>Embed options</div>
        <div className={style.linkOptionsContainer}>
          <div className={style.copyUrlRow}>
            <div className={[style.formGroup, style.hasIcon, style.inputCopyUrl].join(' ')} style="width: 350px;">
              <input
                type="text"
                ref={c => (this._embedCodeInput = c)}
                placeholder="Share URL"
                className={style.formControl}
                value={this.getEmbedCode()}
                readOnly
              />
              <Icon type={IconType.Embed} />
            </div>
            <CopyButton copy={() => this.copyUrl(this._embedCodeInput)} />
          </div>
          <div className={style.videoStartOptionsRow}>
            <div className={[style.checkbox, style.dInlineBlock].join(' ')}>
              <input type="checkbox" id="start-from" checked={this.state.startFrom} onClick={() => this.toggleStartFrom()} />
              <label htmlFor="start-from">Start video at </label>
            </div>
            <div className={[style.formGroup, style.dInlineBlock].join(' ')}>
              <input
                type="text"
                className={style.formControl}
                onChange={e => this.handleStartFromChange(e)}
                value={toHHMMSS(this.state.startFromValue)}
                style="width: 72px;"
              />
            </div>
          </div>
        </div>
      </div>
    );
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
      <Overlay open onClose={() => props.onClose()} type="share">
        {this.renderStateContent()}
      </Overlay>
    );
  }
}

export {ShareOverlay};
