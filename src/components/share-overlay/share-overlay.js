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

const shareOverlayView: Object = {
  Main: 'main',
  EmbedOptions: 'embed-options'
};

/**
 * ShareButton component
 * @param {Object} props - the class props
 * @returns {React$Element<any>} the share button element
 * @constructor
 */
const ShareButton = (props: Object): React$Element<any> => {
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
  };

  return (
    <button
      href={props.config.shareUrl}
      target="_blank"
      rel="noopener noreferrer"
      title={props.config.title}
      role="button"
      aria-label={props.config.ariaLable}
      className={[style.btnRounded, style[props.config.iconType], props.config.iconType].join(' ')}
      onClick={() => share()}>
      <Icon style={props.config.iconType === 'svg' ? `background-image: url(${props.config.svg})` : ``} type={props.config.iconType} />
    </button>
  );
};

/**
 * The copy url comonent
 * @param {Object} props - the class props
 * @returns {React$Element<any>} the copy url element
 * @constructor
 */
const ShareUrl = (props: Object): React$Element<any> => {
  let _ref;

  /**
   * copy input text based on input element.
   * on success, set success internal component state for 2 seconds
   *
   * @param {HTMLInputElement} inputElement - start from input element
   * @param {boolean} isIos - if UA is on iOS device
   * @returns {void}
   * @memberof ShareOverlay
   */
  const copyUrl = (inputElement: HTMLInputElement, isIos: boolean) => {
    if (isIos) {
      inputElement.setSelectionRange(0, 9999);
    } else {
      inputElement.select();
    }
    document.execCommand('copy');
    inputElement.blur();
  };

  return (
    <div className={props.copy ? style.copyUrlRow : ''}>
      <div className={[style.formGroup, style.hasIcon, style.inputCopyUrl].join(' ')} style="width: 350px;">
        <input type="text" ref={c => (_ref = c)} className={style.formControl} value={props.shareUrl} readOnly />
        <Icon type={IconType.Link} />
      </div>
      {props.copy && <CopyButton copy={() => copyUrl(_ref, props.isIos)} />}
    </div>
  );
};

/**
 * The video start options
 * @param {Object} props - the class props
 * @returns {React$Element<any>} the video start options element
 * @constructor
 */
const VideoStartOptions = (props: Object): React$Element<any> => {
  return (
    <div className={style.videoStartOptionsRow}>
      <div className={[style.checkbox, style.dInlineBlock].join(' ')}>
        <input type="checkbox" id="start-from" checked={props.startFrom} onClick={() => props.toggleStartFrom()} />
        <label htmlFor="start-from">
          <Text id={'share.start_video_at'} />
        </label>
      </div>
      <div className={[style.formGroup, style.dInlineBlock].join(' ')}>
        <input
          type="text"
          className={style.formControl}
          onChange={e => props.handleStartFromChange(e)}
          value={toHHMMSS(props.startFromValue)}
          style="width: 72px;"
        />
      </div>
    </div>
  );
};

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
      view: shareOverlayView.Main,
      startFrom: false,
      startFromValue: Math.floor(this.player.currentTime)
    });
  }

  /**
   * changing the overlay state
   *
   * @param {string} stateName state name
   * @returns {void}
   * @memberof ShareOverlay
   */
  _transitionToState(stateName: string): void {
    this.setState({view: stateName});
  }

  /**
   * get share url method
   *
   * @returns {string} - share url
   * @memberof ShareOverlay
   */
  getShareUrl(): string {
    let url = this.props.shareUrl;
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
    let url = this.props.embedUrl;
    if (this.state.startFrom) {
      url += `?start=${this.state.startFromValue}`;
    }
    return `<iframe src="${url}" style="width: 560px;height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen frameborder="0" allow="accelerometer *; autoplay *; encrypted-media *; gyroscope *; picture-in-picture *"/>`;
  }

  /**
   * toggle start from option checkbox in the internal component state
   *
   * @returns {void}
   * @memberof ShareOverlay
   */
  _toggleStartFrom(): void {
    this.setState({startFrom: !this.state.startFrom});
  }

  /**
   * start from input change handler.
   * converts to seconds and save the new value in internal component state
   *
   * @param {*} e - input change event
   * @returns {void}
   * @memberof ShareOverlay
   */
  _handleStartFromChange(e: any): void {
    let seconds = toSecondsFromHHMMSS(e.target.value);
    if (seconds >= this.player.duration) {
      this.setState({startFromValue: 1});
    }
    this.setState({startFromValue: seconds});
  }

  /**
   * render the partial social network DOM
   * @param {Array<Object>} socialNetworksConfig - the social network config
   * @returns {React$Element<*>[]} partial social network DOM
   * @private
   */
  _createSocialNetworks(socialNetworksConfig: Array<Object>): React$Element<any>[] {
    return socialNetworksConfig.map(social => {
      if (social.iconType === 'default') {
        social.iconType = social.name;
        social.shareUrl = this.props.shareUrl;
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
      <div className={this.state.view === shareOverlayView.Main ? 'overlay-screen active' : 'overlay-screen'}>
        <div className={style.title}>
          <Text id="share.title" />
        </div>
        <div className={style.shareMainContainer}>
          <div className={style.shareIcons}>
            {this._createSocialNetworks(this.props.socialNetworks)}
            <a
              className={[style.btnRounded, style.emailShareBtn].join(' ')}
              href={`mailto:?subject=${encodeURIComponent('email subject')}&body=${encodeURIComponent('email body')}`}>
              <Icon type={IconType.Email} />
            </a>
            <button
              className={[style.btnRounded, style.embedShareBtn].join(' ')}
              onClick={() => this._transitionToState(shareOverlayView.EmbedOptions)}>
              <Icon type={IconType.Embed} />
            </button>
          </div>
          <div className={style.linkOptionsContainer}>
            <ShareUrl shareUrl={this.getShareUrl()} copy={true} isIos={this.player.env.os.name === 'iOS'} />
            {this.props.enableTimeOffset ? (
              <VideoStartOptions
                startFrom={this.state.startFrom}
                startFromValue={this.state.startFromValue}
                handleStartFromChange={e => this._handleStartFromChange(e)}
                toggleStartFrom={() => this._toggleStartFrom()}
              />
            ) : (
              undefined
            )}
          </div>
        </div>
      </div>
    );
  }

  /**
   * renders embed options state
   * @param {Object} props - the render props
   * @returns {React$Element} - embed options element
   * @memberof ShareOverlay
   */
  renderOptionsState(props: Object): React$Element<any> {
    return (
      <div className={this.state.view === shareOverlayView.EmbedOptions ? 'overlay-screen active' : 'overlay-screen'}>
        <div className={style.title}>{props.title}</div>
        <div className={style.linkOptionsContainer}>
          <ShareUrl shareUrl={props.shareUrl} copy={true} isIos={this.player.env.os.name === 'iOS'} />
          {this.props.enableTimeOffset ? (
            <VideoStartOptions
              startFrom={this.state.startFrom}
              startFromValue={this.state.startFromValue}
              handleStartFromChange={e => this._handleStartFromChange(e)}
              toggleStartFrom={() => this._toggleStartFrom()}
            />
          ) : (
            undefined
          )}
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
    switch (this.state.view) {
      case shareOverlayView.EmbedOptions:
        return this.renderOptionsState({title: <Text id="share.embed_options" />, shareUrl: this.getEmbedCode()});

      case shareOverlayView.Main:
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
