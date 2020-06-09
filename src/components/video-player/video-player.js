//@flow
import {ResizeWatcher} from '../../utils/resize-watcher';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {actions as shellActions} from '../../reducers/shell';
import style from '../../styles/style.scss';
import {bindActions} from '../../utils/bind-actions';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {FakeEvent} from 'event/fake-event';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  videoStyles: state.shell.layoutStyles.video
});

@withPlayer
@withEventManager
@connect(
  mapStateToProps,
  bindActions({updateVideoClientRect: shellActions.updateVideoClientRect})
)
/**
 * VideoPlayer component
 *
 * @class VideoPlayer
 * @example <VideoPlayer>...</VideoPlayer>
 * @extends {Component}
 */
class VideoPlayer extends Component {
  _el: HTMLElement;
  _videoResizeWatcher: ?ResizeWatcher;

  /**
   * this component should not render itself when player object changes.
   *
   * @param {Object} nextProps - next props of the component
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate(nextProps: Object): boolean {
    return nextProps.videoStyles !== this.props.videoStyles;
  }

  /**
   * @return {void}
   */
  componentDidMount(): void {
    const {eventManager, player} = this.props;
    eventManager.listen(player, player.Event.SOURCE_SELECTED, () => this._onVideoResize());
  }

  /**
   * @return {void}
   * @private
   */
  _onVideoResize = () => {
    const videoElement = this.props.player.getVideoElement();
    this.props.updateVideoClientRect(videoElement.getBoundingClientRect());
  };

  /**
   *
   * @param {HTMLElement} ref - ref
   * @return {void}
   * @private
   */
  _setRef = (ref: HTMLElement) => {
    if (this._videoResizeWatcher) {
      this._videoResizeWatcher.removeEventListener(FakeEvent.Type.RESIZE, this._onVideoResize);
      this._videoResizeWatcher = null;
    }

    this._el = ref;

    if (!this._el) {
      return;
    }

    this._el.appendChild(this.props.player.getView());

    const videoResizeWatcher = new ResizeWatcher();
    videoResizeWatcher.init(this._el);
    videoResizeWatcher.addEventListener(FakeEvent.Type.RESIZE, this._onVideoResize);
    this._videoResizeWatcher = videoResizeWatcher;
  };

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof VideoPlayer
   */
  render(): React$Element<any> {
    const {videoStyles} = this.props;

    return <div className={style.videoPlayer} style={videoStyles} ref={this._setRef} />;
  }
}

export {VideoPlayer};
