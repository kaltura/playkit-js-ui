//@flow
import {ResizeWatcher} from '../../utils/resize-watcher';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {actions} from '../../reducers/shell';
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
  videoStyles: state.shell.layoutStyles.video,
  targetId: state.config.targetId
});

/**
 * VideoPlayer component
 *
 * @class VideoPlayer
 * @example <VideoPlayer>...</VideoPlayer>
 * @extends {Component}
 */
@withPlayer
@withEventManager
@connect(mapStateToProps, bindActions(actions))
class VideoPlayer extends Component {
  _el: HTMLDivElement;
  _videoResizeWatcher: ResizeWatcher;

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

    const videoResizeWatcher = new ResizeWatcher();
    videoResizeWatcher.init(this._el);
    this._videoResizeWatcher = videoResizeWatcher;
    // do not use debounce here since it breaks the video resizing animation
    this.props.eventManager.listen(this._videoResizeWatcher, FakeEvent.Type.RESIZE, this._onVideoResize);
  }

  /**
   * @return {void}
   * @private
   */
  _onVideoResize = () => {
    const videoElement = this.props.player.getVideoElement();
    if (videoElement) {
      this.props.updateVideoClientRect(videoElement.getBoundingClientRect());
    }
  };

  /**
   *
   * @param {HTMLDivElement} ref - ref
   * @return {void}
   * @private
   */
  _setRef = (ref: HTMLDivElement) => {
    if (this._videoResizeWatcher) {
      this.props.eventManager.unlisten(this._videoResizeWatcher, FakeEvent.Type.RESIZE, this._onVideoResize);
      this._videoResizeWatcher.destroy();
    }

    this._el = ref;

    if (!this._el) {
      this.props.updateVideoClientRect({x: 0, y: 0, width: 0, height: 0, top: 0, right: 0, bottom: 0, left: 0});
      return;
    }

    this._el.appendChild(this.props.player.getView());
  };

  /**
   * before component mounted, remove event listeners
   *
   * @returns {void}
   * @memberof Shell
   */
  componentWillUnmount(): void {
    this._videoResizeWatcher.destroy();
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof VideoPlayer
   */
  render(): React$Element<any> {
    const {videoStyles, targetId} = this.props;

    return <div id={`${targetId}-video`} className={style.videoPlayer} style={videoStyles} ref={ref => (ref ? this._setRef(ref) : undefined)} />;
  }
}

export {VideoPlayer};
