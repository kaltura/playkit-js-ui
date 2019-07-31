//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connectToUIPresetsStore} from '../side-panel';

@connectToUIPresetsStore()
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
   * @param {any} prevProps - component props
   * @returns {void}
   * @memberof VideoPlayer
   */
  shouldComponentUpdate(prevProps) {
    return prevProps.sidePanelsStore !== this.props.sidePanelsStore;
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
    const videoStyle = this.props.sidePanelsStore.calculateVideoStyles();

    return <div style={videoStyle} className={style.videoPlayer} ref={c => (this._el = c)} />;
  }
}

export {VideoPlayer};
