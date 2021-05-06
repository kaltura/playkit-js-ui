//@flow
import {h, Component} from 'preact';
import {Text, Localizer} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/share';
import {toHHMMSS, toSecondsFromHHMMSS} from '../../utils/time-format';
import {Overlay} from '../overlay';
import {default as Icon, IconType} from '../icon';
import style from '../../styles/style.scss';
import {CopyButton} from '../copy-button/copy-button';
import {withLogger} from 'components/logger';
import {withKeyboardA11y} from 'utils/popup-keyboard-accessibility';
import {KeyMap} from 'utils/key-map';
import {Button} from 'components/button';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @example <ShareOverlay />
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
    <Localizer>
      <Button
        ref={el => {
          props.addAccessibleChild(el);
        }}
        title={<Text id={props.config.title} />}
        role="link"
        aria-label={props.config.ariaLabel}
        className={[style.btnRounded, style[props.config.iconType], props.config.iconType].join(' ')}
        onClick={share}>
        <Icon style={props.config.iconType === 'svg' ? `background-image: url(${props.config.svg})` : ``} type={props.config.iconType} />
      </Button>
    </Localizer>
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
   * @returns {void}
   * @memberof ShareOverlay
   */
  const copyUrl = (): void => {
    if (_ref) {
      if (props.isIos) {
        _ref.setSelectionRange(0, 9999);
      } else {
        _ref.select();
      }
      document.execCommand('copy');
      _ref.blur();
    }
  };

  return (
    <div className={props.copy ? style.copyUrlRow : ''}>
      <div className={[style.formGroup, style.hasIcon, style.inputCopyUrl].join(' ')} style="width: 350px;">
        <input tabIndex="-1" type="text" ref={c => (c ? (_ref = c) : undefined)} className={style.formControl} value={props.shareUrl} readOnly />
        <Icon type={IconType.Link} />
      </div>
      {props.copy && <CopyButton addAccessibleChild={props.addAccessibleChild} copy={copyUrl} />}
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
  /**
   * on click handler
   *
   * @param {Event} e - event
   * @returns {void}
   * @memberof VideoStartOptions
   */
  const onClick = (e: Event): void => {
    e.preventDefault();
    props.toggleStartFrom();
  };

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof VideoStartOptions
   */
  const onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER) {
      e.preventDefault();
      props.toggleStartFrom();
    }
  };

  return (
    <div className={style.videoStartOptionsRow}>
      <div
        role="checkbox"
        aria-checked={props.startFrom ? 'true' : 'false'}
        ref={el => {
          props.addAccessibleChild(el);
        }}
        tabIndex="0"
        onClick={onClick}
        onKeyDown={onKeyDown}
        className={[style.checkbox, style.dInlineBlock].join(' ')}>
        <input type="checkbox" id="start-from" checked={props.startFrom} />
        <label id="start-from-label" htmlFor="start-from">
          <Text id={'share.start_video_at'} />
        </label>
      </div>
      <div className={[style.formGroup, style.dInlineBlock].join(' ')}>
        <input
          aria-labelledby="start-from-label"
          ref={el => {
            props.addAccessibleChild(el);
          }}
          type="text"
          className={style.formControl}
          onChange={props.handleStartFromChange}
          value={toHHMMSS(props.startFromValue)}
          style="width: 72px;"
        />
      </div>
    </div>
  );
};

const COMPONENT_NAME = 'ShareOverlay';

/**
 * ShareOverlay component
 *
 * @class ShareOverlay
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withLogger(COMPONENT_NAME)
@withKeyboardA11y
class ShareOverlay extends Component {
  /**
   * before component mount, set initial state
   *
   * @returns {void}
   * @memberof ShareOverlay
   */
  componentWillMount() {
    this.isIos = this.props.player.env.os.name === 'iOS';
    this.setState({
      view: shareOverlayView.Main,
      startFrom: false,
      startFromValue: Math.floor(this.props.player.currentTime)
    });
  }

  /**
   * when component did update and change its view state then focus on default
   *
   * @param {Object} previousProps - previous props
   * @param {Object} previousState - previous state
   * @returns {void}
   * @memberof ShareOverlay
   */
  componentDidUpdate(previousProps: Object, previousState: Object): void {
    if (previousState.view != this.state.view) {
      this.props.focusOnDefault();
    }
  }

  /**
   * after component mounted, set popup to behave as modal
   * @returns {void}
   * @memberof ShareOverlay
   */
  componentDidMount(): void {
    this.props.setIsModal(true);
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
   * on click handler
   *
   * @returns {void}
   * @memberof ShareOverlay
   */
  onClick = (): void => {
    this._transitionToState(shareOverlayView.EmbedOptions);
  };

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
   * Create the email mailto template string
   * @returns {string} the mailto template
   * @private
   */
  _getEmailTemplate(): string {
    let name = 'this video';
    const {player} = this.props;
    if (player.config.sources && player.config.sources.metadata && player.config.sources.metadata.name) {
      name = player.config.sources.metadata.name;
    }
    const emailSubject = encodeURIComponent(`Check out ${name}`);
    const emailBody = encodeURIComponent(`Check out ${name}: ${this.getShareUrl()}`);
    const mailTo = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    return mailTo;
  }

  /**
   * toggle start from option checkbox in the internal component state
   *
   * @returns {void}
   * @memberof ShareOverlay
   */
  _toggleStartFrom = (): void => {
    this.setState(prevState => {
      return {startFrom: !prevState.startFrom};
    });
  };

  /**
   * start from input change handler.
   * converts to seconds and save the new value in internal component state
   *
   * @param {*} e - input change event
   * @returns {void}
   * @memberof ShareOverlay
   */
  _handleStartFromChange = (e: any): void => {
    let seconds = toSecondsFromHHMMSS(e.target.value);
    if (seconds >= this.props.player.duration) {
      this.setState({startFromValue: 1});
    }
    this.setState({startFromValue: seconds});
  };

  /**
   * render the partial social network DOM
   * @param {Array<Object>} socialNetworksConfig - the social network config
   * @param {Function} addAccessibleChild - pass the addAccessibleChild so the share button can add its accessible elements
   * @returns {React$Element<*>[]} partial social network DOM
   * @private
   */
  _createSocialNetworks(socialNetworksConfig: Array<Object>): React$Element<any>[] {
    return socialNetworksConfig.map(social => {
      if (social.iconType === 'default') {
        social.iconType = social.name;
        social.shareUrl = this.props.shareUrl;
      }
      return <ShareButton key={social.name} config={social} addAccessibleChild={this.props.addAccessibleChild} />;
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
            <Localizer>
              <a
                role="button"
                tabIndex="0"
                ref={el => {
                  this.props.addAccessibleChild(el);
                }}
                className={[style.btnRounded, style.emailShareBtn].join(' ')}
                href={this._getEmailTemplate()}
                title={<Text id="share.email" />}>
                <Icon type={IconType.Email} />
              </a>
            </Localizer>
            <Localizer>
              <Button
                aria-haspopup="true"
                ref={el => {
                  this.props.addAccessibleChild(el);
                }}
                className={[style.btnRounded, style.embedShareBtn].join(' ')}
                onClick={this.onClick}
                title={<Text id="share.embed" />}>
                <Icon type={IconType.Embed} />
              </Button>
            </Localizer>
          </div>
          <div className={style.linkOptionsContainer}>
            <ShareUrl addAccessibleChild={this.props.addAccessibleChild} shareUrl={this.getShareUrl()} copy={true} isIos={this.isIos} />
            {this.props.enableTimeOffset ? (
              <VideoStartOptions
                addAccessibleChild={this.props.addAccessibleChild}
                startFrom={this.state.startFrom}
                startFromValue={this.state.startFromValue}
                handleStartFromChange={this._handleStartFromChange}
                toggleStartFrom={this._toggleStartFrom}
              />
            ) : undefined}
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
          <ShareUrl addAccessibleChild={this.props.addAccessibleChild} shareUrl={props.shareUrl} copy={true} isIos={this.isIos} />
          {this.props.enableTimeOffset ? (
            <VideoStartOptions
              addAccessibleChild={this.props.addAccessibleChild}
              startFrom={this.state.startFrom}
              startFromValue={this.state.startFromValue}
              handleStartFromChange={this._handleStartFromChange}
              toggleStartFrom={this._toggleStartFrom}
            />
          ) : undefined}
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
    this.props.clearAccessibleChildren();
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
      <Overlay addAccessibleChild={this.props.addAccessibleChild} handleKeyDown={this.props.handleKeyDown} open onClose={props.onClose} type="share">
        {this.renderStateContent()}
      </Overlay>
    );
  }
}

ShareOverlay.displayName = COMPONENT_NAME;
export {ShareOverlay};
