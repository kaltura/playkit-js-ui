//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {KeyMap} from '../../utils/key-map';
import {Text} from 'preact-i18n';
import {withPlayer} from '../player';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';

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

/**
 * LiveTag component
 *
 * @class LiveTag
 * @example <LiveTag />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
class LiveTag extends Component {
  /**
   * returns a boolean to detect if player is on live edge
   *
   * @returns {boolean} - is player on live edge
   * @memberof LiveTag
   */
  isOnLiveEdge(): boolean {
    return this.props.player.isOnLiveEdge();
  }

  /**
   * on key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof LiveTag
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER) {
      this.onClick();
    }
  };

  /**
   * click handler to live tag
   * if not on live edge, seeking to live edge and if paused, call play method
   *
   * @returns {void}
   * @memberof LiveTag
   */
  onClick = (): void => {
    if (!this.isOnLiveEdge()) {
      this.props.player.seekToLiveEdge();
      if (this.props.player.paused) {
        this.props.player.play();
      }
    }
    this.props.notifyClick();
  };

  /**
   * render live tag component
   *
   * @param {*} props - component props
   * @returns {React$Element} component element
   * @memberof LiveTag
   */
  render(props: any): React$Element<any> {
    const tagStyleClass = [style.liveTag];
    if (!this.isOnLiveEdge()) {
      tagStyleClass.push(style.nonLivePlayhead);
    }

    return (
      <div tabIndex="0" className={tagStyleClass.join(' ')} onClick={this.onClick} onKeyDown={this.onKeyDown}>
        <Text id={'controls.live'} />
      </div>
    );
  }
}

LiveTag.displayName = COMPONENT_NAME;
export {LiveTag};
