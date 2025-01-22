import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {Text, Localizer} from 'preact-i18n';
import {withPlayer} from '../player';
import {withEventManager} from '../../event';
import {withLogger} from '../logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  config: Object.assign(
    {
      placement: 'top-left',
      timeout: 0
    },
    state.config.components.watermark
  )
});

const COMPONENT_NAME = 'Watermark';
const ENTRY_VAR = '{entryId}';

/**
 * Watermark component
 * @class Watermark
 * @example <Watermark />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
class Watermark extends Component<any, any> {
  _timeoutId: number | null = null;
  /**
   * Creates an instance of Watermark.
   * @memberof Watermark
   */
  constructor(props: any) {
    super(props);
    this.setState({show: true, urlLink: props.config.url});
  }

  /**
   * After component mounted, listen to relevant player event for updating the state of the component
   * @method componentDidMount
   * @returns {void}
   * @memberof Watermark
   */
  componentDidMount() {
    /**
     * playing handler
     * @returns {void}
     */
    const onPlaying = () => {
      if (this.props.config.timeout > 0) {
        this._timeoutId = setTimeout(() => this.setState({show: false}), this.props.config.timeout) as unknown as number;
      }
    };

    const {player} = this.props;
    this.props.eventManager.listenOnce(player, player.Event.PLAYING, onPlaying);
    this.props.eventManager.listen(player, player.Event.CHANGE_SOURCE_ENDED, () => {
      this.setState({show: true});
      this.props.eventManager.listenOnce(player, player.Event.PLAYING, onPlaying);
    });
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
      this.setState({urlLink: url.replace(ENTRY_VAR, entryId), show: true});
      return true;
    } else {
      this.props.logger.debug(`Logo url was not replaced; entry id was not found.`);
      this.setState({show: false});
      return false;
    }
  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   * @memberof Watermark
   */
  componentWillUnmount(): void {
    if (this._timeoutId) {
      clearTimeout(this._timeoutId);
      this._timeoutId = null;
    }
  }

  /**
   * Render component
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof Watermark
   */
  render(props: any): VNode<any> | undefined {
    if (!props.config.img) {
      return undefined;
    }
    const styleClass = [style.watermark];
    props.config.placement.split('-').forEach(side => {
      styleClass.push(style[side]);
    });
    if (!props.config.url) {
      styleClass.push(style.emptyUrl);
    }
    if (!this.state.show) {
      styleClass.push(style.hideWatermark);
    }
    return (
      <div className={styleClass.join(' ')}>
        <a href={this.state.urlLink} target="_blank" rel="noopener noreferrer">
          <Localizer>
            <img src={props.config.img} alt={(<Text id="watermark.watermark_alt_text" />) as unknown as string} />
          </Localizer>
        </a>
      </div>
    );
  }
}

Watermark.displayName = COMPONENT_NAME;
export {Watermark};
