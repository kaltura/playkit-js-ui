//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {withPlayer} from '../player';

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
/**
 * Watermark component
 * @class Watermark
 * @example <Watermark />
 * @extends {BaseComponent}
 */
class Watermark extends BaseComponent {
  /**
   * Creates an instance of Watermark.
   * @memberof Watermark
   */
  constructor() {
    super({name: COMPONENT_NAME});
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
    this.eventManager.listenOnce(player, player.Event.PLAYING, onPlaying);
    this.eventManager.listen(player, player.Event.CHANGE_SOURCE_ENDED, () => {
      this.setState({show: true});
      this.eventManager.listenOnce(player, player.Event.PLAYING, onPlaying);
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
