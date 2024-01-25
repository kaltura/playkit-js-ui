import style from '../../styles/style.scss';
import {h, Component, VNode, RefObject, createRef} from 'preact';
import {connect} from 'react-redux';
import {withText} from 'preact-i18n';
import {withPlayer} from '../player';
import {withLogger} from '../logger';

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

const ENTRY_VAR = '${entryId}';

/**
 * Logo component
 *
 * @class Logo
 * @example <Logo />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
@withText({logoText: 'controls.logo'})
class Logo extends Component<any, any> {
  private _logoRef: RefObject<HTMLAnchorElement> = createRef<HTMLAnchorElement>();

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
    if (url.indexOf(ENTRY_VAR) !== -1) {
      const {player} = this.props;
      player.addEventListener(player.Event.CHANGE_SOURCE_ENDED, () => {
        this._logoRef!.current!.href = url.replace('${entryId}', player.sources.id);
      });
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
      <div className={[style.controlButtonContainer, !props.config.url ? style.emptyUrl : ''].join(' ')} title={props.config.text}>
        <a
          className={style.controlButton}
          href={props.config.url}
          aria-label={props.logoText}
          target="_blank"
          rel="noopener noreferrer"
          ref={this._logoRef}>
          <img className={style.icon} src={props.config.img} />
        </a>
      </div>
    );
  }
}

Logo.displayName = COMPONENT_NAME;

export {Logo};
