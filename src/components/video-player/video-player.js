//@flow
import {CustomEventType, utils as playkitUtils} from '@playkit-js/playkit-js';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {actions as shellActions} from '../../reducers/shell';
import style from '../../styles/style.scss';
import {bindActions} from '../../utils/bind-actions';
import {PlayerArea} from '../player-area';
import {withPlayer} from '../player';
import {withPlayerAreas} from '../player-areas';

@withPlayer
@withPlayerAreas
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
  shouldComponentUpdate(nextProps: PropsType): boolean {
    return nextProps.PlayerAreasService !== this.props.PlayerAreasService;
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
    const {PlayerAreasService} = this.props;
    const styleValue = PlayerAreasService.calculateVideoStyles();

    return (
      <div className={style.videoPlayer} style={styleValue} ref={this._setRef}>
        <PlayerArea name={'VideoArea'} />
      </div>
    );
  }
}

export {VideoPlayer};
