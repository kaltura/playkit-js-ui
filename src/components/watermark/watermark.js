//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
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

@connect(mapStateToProps)
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
/**
 * Watermark component
 * @class Watermark
 * @example <Watermark />
 * @extends {Component}
 */
class Watermark extends Component {
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
        setTimeout(() => this.setState({show: false}), this.props.config.timeout);
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
    if (!this.state.show) {
      styleClass.push(style.hideWatermark);
    }
    return (
      <div className={styleClass.join(' ')}>
        <a href={props.config.url} target="_blank" rel="noopener noreferrer">
          <img src={props.config.img} />
        </a>
      </div>
    );
  }
}

Watermark.displayName = COMPONENT_NAME;
export {Watermark};
