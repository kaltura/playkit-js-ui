//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {EventManager} from '../../event/event-manager';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  config: Object.assign({
    placement: 'top-left',
    timeout: 0
  }, state.config.components.watermark)
});

@connect(mapStateToProps)
  /**
   * Watermark component
   * @class Watermark
   * @example <Watermark player={this.player} />
   * @extends {BaseComponent}
   */
class Watermark extends BaseComponent {
  _eventManager: EventManager;

  /**
   * @static
   * @type {string} - Component display name
   */
  static displayName = 'watermark';

  /**
   * Creates an instance of Watermark.
   * @param {Object} obj - object
   * @memberof Watermark
   */
  constructor(obj: Object) {
    super({name: 'Watermark', player: obj.player});
    this._eventManager = new EventManager();
    this.setState({show: true});
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
        setTimeout(() => this.setState({show: false}), this.props.config.timeout);
      }
    };

    this._eventManager.listenOnce(this.player, this.player.Event.PLAYING, onPlaying);
    this._eventManager.listen(this.player, this.player.Event.CHANGE_SOURCE_ENDED, () => {
      this.setState({show: true});
      this._eventManager.listenOnce(this.player, this.player.Event.PLAYING, onPlaying)
    });
  }

  /**
   * before component unmounted, remove event listeners
   *
   * @returns {void}
   * @memberof Watermark
   */
  componentWillUnmount(): void {
    this._eventManager.removeAll();
  }

  /**
   * Render component
   * @param {*} props - component props
   * @returns {?React$Element} - component element
   * @memberof Watermark
   */
  render(props: any): ?React$Element<any> {
    if (props.config.img) {
      const styleClass = [style.watermark];
      props.config.placement.split('-').forEach((side) => {
        styleClass.push(style[side]);
      });
      if (!this.state.show) {
        styleClass.push(style.hideWatermark);
      }
      return (
        <div className={styleClass.join(' ')}>
          <a href={props.config.url} target='_blank' rel='noopener noreferrer'>
            <img src={props.config.img}/>
          </a>
        </div>
      )
    }
  }
}

export {Watermark};
