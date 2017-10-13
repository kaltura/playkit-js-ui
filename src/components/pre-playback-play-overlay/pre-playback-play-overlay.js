//@flow
import style from './_pre-playback-play-overlay.scss';
import {h} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';

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
  mobileAutoplay: boolean;

  /**
   * Creates an instance of PrePlaybackPlayOverlay.
   * @param {Object} obj obj
   * @memberof PrePlaybackPlayOverlay
   */
  constructor(obj: Object) {
    super({name: 'PrePlaybackPlayOverlay', player: obj.player});
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
    }
    catch (e) { // eslint-disable-line no-unused-vars
      this.autoplay = false;
    }

    try {
      this.mobileAutoplay = this.player.config.playback.mobileAutoplay;
    }
    catch (e) { // eslint-disable-line no-unused-vars
      this.mobileAutoplay = false;
    }
  }

  /**
   * before component unmounted, remove the pre playback flag and class from player shell.
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  componentWillUnmount() {
    this.props.updatePrePlayback(false);
    this.props.removePlayerClass(style.prePlayback);
  }

  /**
   * after component mounted, listen to play event and update the pre plackback flag to false
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  componentDidMount() {
    this.player.addEventListener(this.player.Event.PLAY, () => {
      this.props.updatePrePlayback(false);
      this.props.removePlayerClass(style.prePlayback);
    });

    if (this.player.paused === false) {
      this.props.updatePrePlayback(false);
      this.props.removePlayerClass(style.prePlayback);
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
        this.props.updatePrePlayback(false);
        this.props.removePlayerClass(style.prePlayback);
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
    if (
      (!props.isEnded && !props.prePlayback) ||
      (!props.isEnded && !props.isMobile && this.autoplay) ||
      (!props.isEnded && props.isMobile && this.mobileAutoplay)
    ) return undefined;

    return (
      <div className={style.prePlaybackPlayOverlay} style={{backgroundImage: `url(${props.poster})`}}
           onClick={() => this.handleClick()}>
        <a className={style.prePlaybackPlayButton}>
          {props.isEnded ? <Icon type={IconType.Startover}/> : <Icon type={IconType.Play}/>}
        </a>
      </div>
    )
  }
}

export default PrePlaybackPlayOverlay;
