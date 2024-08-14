import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {withText} from 'preact-i18n';
import {withPlayer} from '../player';
import {withLogger} from '../logger';
import {withEventManager} from '../../event';
import {withEventDispatcher} from '../event-dispatcher';

const COMPONENT_NAME = 'Logo';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isMobile: state.shell.isMobile,
  playerSize: state.shell.playerSize,
  config: state.config.components.logo
});

const ENTRY_VAR = '{entryId}';

/**
 * Logo component
 *
 * @class Logo
 * @example <Logo />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({logoText: 'controls.logo'})
class Logo extends Component<any, any> {
  /**
   * @constructor
   * @param {*} props props
   */
  constructor(props: any) {
    super(props);
    this.setState({isUrlClickable: typeof props.config.url === 'string', urlLink: props.config.url});
  }

  /**
   * when component did mount
   *
   * @returns {void}
   * @memberof Logo
   */
  public componentDidMount(): void {
    this._handleLogoUrl();
  }

  /**
   * handles the logo url
   * if the url contains ${entryId}, then replace it with the played entry id
   *
   * @returns {void}
   * @memberof Logo
   */
  private _handleLogoUrl(): void {
    const url = this.props.config.url;
    if (url && url.indexOf(ENTRY_VAR) !== -1) {
      const {player, eventManager} = this.props;
      if (!this._setLogoUrlWithEntryId(url)) {
        eventManager.listen(player, player.Event.MEDIA_LOADED, () => {
          this._setLogoUrlWithEntryId(url);
        });
      }
    }
  }

  _handleOnClick = (): void => {
    this.props.notifyClick({logoUrl: this.state.urlLink});
  };

  /**
   * sets the url with the entry id
   * @param {string} url - the url configured on the logo
   * @returns {boolean} - whether the url was set with entry id or not
   * @memberof Logo
   */
  private _setLogoUrlWithEntryId(url: string): boolean {
    const {player} = this.props;
    const entryId = player.sources.id;
    if (typeof entryId === 'string') {
      this.setState({urlLink: url.replace(ENTRY_VAR, entryId), isUrlClickable: true});
      return true;
    } else {
      this.props.logger.debug(`Logo url was not replaced; entry id was not found.`);
      this.setState({isUrlClickable: false});
      return false;
    }
  }

  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  private _shouldRender(): boolean {
    const isActive = !(Object.keys(this.props.config).length === 0 && this.props.config.constructor === Object) && this.props.config.img;
    this.props.onToggle(COMPONENT_NAME, isActive);
    return isActive;
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {?React$Element} - component
   * @memberof Logo
   */
  public render(props: any): VNode<any> | undefined {
    if (!this._shouldRender()) {
      return undefined;
    }
    return (
      <div
        className={[style.controlButtonContainer, !props.config.url || !this.state.isUrlClickable ? style.emptyUrl : ''].join(' ')}
        title={props.config.text}>
        {this.state.isUrlClickable ? (
        <a
          onClick={this._handleOnClick}
          className={style.controlButton}
          href={this.state.urlLink}
          aria-label={props.config.text || props.logoText}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={0}
          >
          <img className={style.icon} src={props.config.img} />
        </a>
        ) : (
          <span
            className={style.controlButton}
            aria-label={props.config.text || props.logoText}
            tabIndex={0}
          >
            <img className={style.icon} src={props.config.img} />
          </span>
        )}
      </div>
    );
  }
  
}

Logo.displayName = COMPONENT_NAME;

export {Logo};
