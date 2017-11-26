//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from "../../utils/key-map";

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  metadataLoaded: state.engine.metadataLoaded,
  prePlayback: state.shell.prePlayback,
  poster: state.engine.poster,
  isMobile: state.shell.isMobile,
  isEnded: state.engine.isEnded
});

@connect(mapStateToProps, bindActions(actions))
  /**
   * PrePlaybackPlayOverlay component
   *
   * @class PrePlaybackPlayOverlay
   * @example <PrePlaybackPlayOverlay player={this.player} />
   * @extends {BaseComponent}
   */
class PrePlaybackPlayOverlay extends BaseComponent {
  autoplay: boolean;

  /**
   * Creates an instance of PrePlaybackPlayOverlay.
   * @param {Object} obj obj
   * @memberof PrePlaybackPlayOverlay
   */
  constructor(obj: Object) {
    super({name: 'PrePlaybackPlayOverlay', player: obj.player});
    this.player.addEventListener(this.player.Event.CHANGE_SOURCE_ENDED, () => this._onChangeSourceEnded());
  }

  /**
   * before component mounted, add 'pre-playback' class to player shell in order to hide the gui
   * and set the autoplay and mobileAutoplay values from the player config
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  componentWillMount() {
    this.props.addPlayerClass(style.prePlayback);
    try {
      this.autoplay = this.player.config.playback.autoplay;
      if (this.autoplay === true) {
        this.player.addEventListener(this.player.Event.AUTOPLAY_FAILED, () => {
          this.autoplay = false;
        });
      }
    } catch (e) { // eslint-disable-line no-unused-vars
      this.autoplay = false;
    }
  }

  /**
   * before component unmounted, remove the pre playback flag and class from player shell.
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  componentWillUnmount() {
    this._hidePrePlayback();
    this.props.removePlayerClass(style.prePlayback);
  }

  /**
   * after component mounted, listen to play event and update the pre plackback flag to false
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  componentDidMount() {
    this.player.addEventListener(this.player.Event.PLAY, () => this._hidePrePlayback());
    if (this.player.paused === false) {
      this._hidePrePlayback();
    }
  }

  /**
   * play on click
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  handleClick(): void {
    // TODO: The promise handling should be in the play API of the player.
    new Promise((resolve, reject) => {
      try {
        if (this.player.config.playback.preload === "auto" && !this.player.config.plugins.ima) {
          this.player.ready().then(resolve);
        } else {
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    }).then(() => {
      this.player.play();
      if (this.props.prePlayback) {
        this._hidePrePlayback();
      }
    }).catch((e) => {
      this.logger.error(e.message);
    });
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PrePlaybackPlayOverlay
   */
  render(props: any): React$Element<any> | void {
    if ((!props.isEnded && !props.prePlayback) || (!props.isEnded && this.autoplay)) {
      return undefined;
    }
    let rootStyle = {},
      rootClass = [style.prePlaybackPlayOverlay];

    if (!props.prePlayback && props.poster) {
      rootStyle = {backgroundImage: `url(${props.poster})`};
      rootClass.push(style.hasPoster)
    }

    return (
      <div
        className={rootClass.join(' ')}
        style={rootStyle}
        onClick={() => this.handleClick()}>
        <a className={style.prePlaybackPlayButton}
           tabIndex="0"
           onKeyDown={(e) => {
             if (e.keyCode === KeyMap.ENTER) {
               this.handleClick();
             }
           }}>
          {props.isEnded ? <Icon type={IconType.StartOver}/> : <Icon type={IconType.Play}/>}
        </a>
      </div>
    )
  }

  /**
   * Change source ended event handler.
   * @private
   * @returns {void}
   */
  _onChangeSourceEnded(): void {
    try {
      if (!this.player.config.playback.autoplay) {
        this._displayPrePlayback();
      }
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  /**
   * Displays the pre playback overlay.
   * @private
   * @returns {void}
   */
  _displayPrePlayback(): void {
    this.props.updatePrePlayback(true);
    this.props.addPlayerClass(style.prePlayback);
  }

  /**
   * Hides the pre playback overlay.
   * @private
   * @returns {void}
   */
  _hidePrePlayback(): void {
    this.props.updatePrePlayback(false);
    this.props.removePlayerClass(style.prePlayback);
  }
}

export default PrePlaybackPlayOverlay;
