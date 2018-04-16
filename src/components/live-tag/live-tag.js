//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import BaseComponent from '../base';
import {KeyMap} from "../../utils/key-map";

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isLive: state.engine.isLive,
  isDvr: state.engine.isDvr,
  currentTime: state.engine.currentTime,
  duration: state.engine.duration
});

@connect(mapStateToProps)
  /**
   * LiveTag component
   *
   * @class LiveTag
   * @example <LiveTag player={this.player} />
   * @extends {BaseComponent}
   */
class LiveTag extends BaseComponent {

  /**
   * Creates an instance of LiveTag.
   * @param {Object} obj obj
   * @memberof LiveTag
   */
  constructor(obj: Object) {
    super({name: 'LiveTag', player: obj.player});
  }

  /**
   * returns a boolean to detect if player is on live edge with buffer of 1 second
   *
   * @returns {boolean} - is player on live edge
   * @memberof LiveTag
   */
  isOnLiveEdge(): boolean {
    return (this.props.currentTime >= this.props.duration - 1);
  }

  /**
   * click handler to live tag
   * if not on live edge, seeking to live edge and if paused, call play method
   *
   * @returns {void}
   * @memberof LiveTag
   */
  onClick(): void {
    if (!this.isOnLiveEdge()) {
      this.player.seekToLiveEdge();
      if (this.player.paused) {
        this.player.play();
      }
    }
    this.notifyClick();
  }

  /**
   * render live tag component
   *
   * @param {*} props - component props
   * @returns {React$Element} component element
   * @memberof LiveTag
   */
  render(props: any): React$Element<any> {
    const tagStyleClass = [style.liveTag];
    if (props.isDvr && !this.isOnLiveEdge()) tagStyleClass.push(style.nonLivePlayhead);

    return (
      <div tabIndex="0"
           className={tagStyleClass.join(' ')}
           onClick={() => this.onClick()}
           onKeyDown={(e) => {
             if (e.keyCode === KeyMap.ENTER) {
               this.onClick();
             }
           }}>Live</div>
    )
  }
}

export {LiveTag};
