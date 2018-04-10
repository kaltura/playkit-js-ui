//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';

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

  /**
   * appending the player view to component after the component was mounted
   *
   * @returns {void}
   * @memberof VideoPlayer
   */
  componentDidMount() {
    this._el.appendChild(this.props.player.getView());
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof VideoPlayer
   */
  render(): React$Element<any> {
    return (
      <div className={style.videoPlayer} ref={c => this._el = c}/>
    )
  }
}

export {VideoPlayer};
