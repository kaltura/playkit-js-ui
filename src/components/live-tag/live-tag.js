//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import BaseComponent from '../base';
import {KeyMap} from '../../utils/key-map';
import {Text} from 'preact-i18n';
import {withPlayer} from '../player';

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

const COMPONENT_NAME = 'LiveTag';

@connect(mapStateToProps)
@withPlayer
/**
 * LiveTag component
 *
 * @class LiveTag
 * @example <LiveTag />
 * @extends {BaseComponent}
 */
class LiveTag extends BaseComponent {
  /**
   * Creates an instance of LiveTag.
   * @memberof LiveTag
   */
  constructor() {
    super({name: COMPONENT_NAME});
  }

  /**
   * returns a boolean to detect if player is on live edge with buffer of 1 second
   *
   * @returns {boolean} - is player on live edge
   * @memberof LiveTag
   */
  isOnLiveEdge(): boolean {
    return this.props.currentTime >= this.props.duration - 1;
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
      this.props.player.seekToLiveEdge();
      if (this.props.player.paused) {
        this.props.player.play();
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
      <div
        tabIndex="0"
        className={tagStyleClass.join(' ')}
        onClick={() => this.onClick()}
        onKeyDown={e => {
          if (e.keyCode === KeyMap.ENTER) {
            this.onClick();
          }
        }}>
        <Text id={'controls.live'} />
      </div>
    );
  }
}

LiveTag.displayName = COMPONENT_NAME;
export {LiveTag};
