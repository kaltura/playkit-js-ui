import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {Text, Localizer} from 'preact-i18n';
import {withPlayer} from '../player';
import {withEventManager} from '../../event';
import {withLogger} from '../logger';
import {EventType} from '@playkit-js/playkit-js';

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
  ),
  targetId: state.config.targetId
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
  _aspectRatio: number | null = null;
  /**
   * Creates an instance of Watermark.
   * @memberof Watermark
   */
  constructor(props: any) {
    super();
    this.setState({show: true, urlLink: props.config.url});
  }

  componentWillMount(): void {
    this._loadImageDimension();
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

    this.props.eventManager.listen(player, EventType.RESIZE, () => {
      console.log('update from event');
      this.updateImageProportion();
    });
    this._handleWatermarkUrl();
  }
  /**
   * handles the watermark url
   * if the url contains ${entryId}, then replace it with the played entry id
   *
   * @returns {void}
   * @memberof Watermark
   */
  private _handleWatermarkUrl(): void {
    const url = this.props.config.url;
    if (url && url.indexOf(ENTRY_VAR) !== -1) {
      const {player, eventManager} = this.props;
      if (!this._setWatermarkUrlWithEntryId(url)) {
        eventManager.listen(player, player.Event.MEDIA_LOADED, () => {
          this._setWatermarkUrlWithEntryId(url);
        });
      }
    }
  }

  private _loadImageDimension(): void {
    console.log('load');
    if (this._aspectRatio) return;
    const img = new Image();
    img.src = this.props.config.img;
    img.onload = () => {
      console.log('finish loading');
      this._aspectRatio = img.naturalWidth / img.naturalHeight;
      this.updateImageProportion();
    };
  }

  updateImageProportion = () => {
    const playerContainer = document.getElementById(this.props.targetId);
    console.log('update 1 ' + playerContainer + ' ' + this._aspectRatio);
    if (playerContainer && this._aspectRatio) {
      const {width} = playerContainer.getBoundingClientRect();
      let scaleMultiplier = 0.3;
      if (this._aspectRatio > 1) {
        scaleMultiplier = 0.6;
      } else if (this._aspectRatio < 1) {
        scaleMultiplier = 0.3;
      }

      let newWidth = width * scaleMultiplier;
      let newHeight = newWidth / this._aspectRatio;
      this.setState({newWidth, newHeight});
    }
  };

  /**
   * sets the url with the entry id
   * @param {string} url - the url configured on the watermark
   * @returns {boolean} - whether the url was set with entry id or not
   * @memberof Watermark
   */
  private _setWatermarkUrlWithEntryId(url: string): boolean {
    const {player} = this.props;
    const entryId = player.sources.id;
    if (typeof entryId === 'string') {
      this.setState({urlLink: url.replace(ENTRY_VAR, entryId), show: true});
      return true;
    }
    this.props.logger.debug(`Watermark url was not replaced; entry id was not found.`);
    this.setState({show: false});
    return false;
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
            {this.state.newWidth && this.state.newHeight && (
              <img
                src={props.config.img}
                alt={(<Text id="watermark.watermark_alt_text" />) as unknown as string}
                style={{
                  width: `${this.state.newWidth}px`,
                  height: `${this.state.newHeight}px`
                }}
              />
            )}
          </Localizer>
        </a>
      </div>
    );
  }
}

Watermark.displayName = COMPONENT_NAME;
export {Watermark};
