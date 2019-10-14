//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {withPlayer} from '../player';
import {VideoAreaContainer} from '../video-area-container';

@withPlayer
/**
 * VideoPlayer component
 *
 * @class VideoPlayer
 * @example <VideoPlayer>...</VideoPlayer>
 * @extends {Component}
 */
class VideoPlayer extends Component {
  _el: HTMLElement;

  /**
   * this component should not render itself when player object changes.
   *
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate() {
    return false;
  }

  _setRef = ref => {
    this._el = ref;

    if (!this._el) {
      return;
    }
    this._el.appendChild(this.props.player.getView());
  };

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof VideoPlayer
   */
  render(): React$Element<any> {
    return (
      <VideoAreaContainer>
        {context => <div className={context.className + ' ' + style.videoPlayer} style={context.style} ref={this._setRef} />}
      </VideoAreaContainer>
    );
  }
}

export {VideoPlayer};
