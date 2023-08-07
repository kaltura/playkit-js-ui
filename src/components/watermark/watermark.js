//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {Text, Localizer} from 'preact-i18n';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {withLogger} from 'components/logger';

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
class Watermark extends Component {
  _timeoutId: ?TimeoutID = null;
  /**
   * Creates an instance of Watermark.
   * @memberof Watermark
   */
  constructor() {
    super();
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
        this._timeoutId = setTimeout(() => this.setState({show: false}), this.props.config.timeout);
      }
    };

    const {player} = this.props;
    this.props.eventManager.listenOnce(player, player.Event.PLAYING, onPlaying);
    this.props.eventManager.listen(player, player.Event.CHANGE_SOURCE_ENDED, () => {
      this.setState({show: true});
      this.props.eventManager.listenOnce(player, player.Event.PLAYING, onPlaying);
    });
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
  render(props: any): ?React$Element<any> {
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
        <a href={props.config.url} target="_blank" rel="noopener noreferrer">
          <Localizer>
            <img src={props.config.img} alt={<Text id="watermark.watermark_alt_text" />} />
          </Localizer>
        </a>
      </div>
    );
  }
}

Watermark.displayName = COMPONENT_NAME;
export {Watermark};
