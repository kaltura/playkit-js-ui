//@flow
import {CustomEventType, utils as playkitUtils} from '@playkit-js/playkit-js';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {actions as shellActions} from '../../reducers/shell';
import style from '../../styles/style.scss';
import {bindActions} from '../../utils/bind-actions';
import {FragmentContainer} from '../player-area';
import {withPlayer} from '../player';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  videoStyles: state.shell.layoutStyles.video
});

@withPlayer
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
  _videoResizeWatcher: ResizeWatcher;

  /**
   * this component should not render itself when player object changes.
   *
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate(nextProps: PropsType): boolean {
    return nextProps.videoStyles !== this.props.videoStyles;
  }

  _onVideoResize = e => {
    const videoElement = e.target._el; // TODO sakal check for better api
    this.props.updateVideoClientRect(videoElement.getBoundingClientRect());
  };
  _setRef = ref => {
    if (this._videoResizeWatcher) {
      this._videoResizeWatcher.removeEventListener(CustomEventType.RESIZE, this._onVideoResize);
      this._videoResizeWatcher = null;
    }

    this._el = ref;

    if (!this._el) {
      return;
    }

    this._el.appendChild(this.props.player.getView());

    this._videoResizeWatcher = new playkitUtils.ResizeWatcher();
    this._videoResizeWatcher.init(this._el);
    this._videoResizeWatcher.addEventListener(CustomEventType.RESIZE, this._onVideoResize);
  };

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof VideoPlayer
   */
  render(): React$Element<any> {
    const {videoStyles} = this.props;

    return (
      <div className={style.videoPlayer} style={videoStyles} ref={this._setRef}>
       
      </div>
    );
  }
}

export {VideoPlayer};
