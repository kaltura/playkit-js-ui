//@flow
import { CustomEventType, utils as playkitUtils } from '@playkit-js/playkit-js';
import { h, Component } from 'preact';
import style from '../../styles/style.scss';
import { withPlayer } from '../player';
import { VideoArea } from '../video-area';
import { VideoAreaContainer } from '../video-area-container';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions as shellActions} from '../../reducers/shell';
import {Container} from '../container';

@withPlayer
@connect(
  null,
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
  shouldComponentUpdate() {
    return false;
  }

  _onVideoResize = (e) => {
    const videoElement = e.target._el; // TODO sakal check for better api
    this.props.updateVideoClientRect(videoElement.getBoundingClientRect());
  }
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
    return (
      <VideoAreaContainer >
        {context => 
        <div>
          <div className={context.className + ' ' + style.videoPlayer} style={context.style} ref={this._setRef} />
          <Container name={'PreVideoArea'}  />
          <VideoArea />
        </div>
        }
      </VideoAreaContainer>
    );
  }
}

export { VideoPlayer };

