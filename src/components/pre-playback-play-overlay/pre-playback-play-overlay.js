//@flow
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
    this._addBindings();
  }

  /**
   * before component mounted, add 'pre-playback' class to player shell in order to hide the gui
   * and set the autoplay and mobileAutoplay values from the player config
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  componentWillMount() {
    this.props.addPlayerClass('pre-playback');

    try {
      this.autoplay = this.player.config.playback.autoplay;
    } catch (e) { // eslint-disable-line no-unused-vars
      this.autoplay = false;
    }

    try {
      this.mobileAutoplay = this.player.config.playback.mobileAutoplay;
    } catch (e) { // eslint-disable-line no-unused-vars
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
    this._hidePrePlayback();
  }

  /**
   * after component mounted, listen to play event and update the pre plackback flag to false
   *
   * @returns {void}
   * @memberof PrePlaybackPlayOverlay
   */
  componentDidMount() {
    this.player.addEventListener(this.player.Event.PLAY, this._hidePrePlayback.bind(this));

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
    if (
      (!props.isEnded && !props.prePlayback) ||
      (!props.isEnded && !props.isMobile && this.autoplay) ||
      (!props.isEnded && props.isMobile && this.mobileAutoplay)
    ) return undefined;

    return (
      <div className='pre-playback-play-overlay' style={{backgroundImage: `url(${props.poster})`}}
           onClick={() => this.handleClick()}>
        <a className='pre-playback-play-button'>
          {props.isEnded ? <Icon type={IconType.Startover}/> : <Icon type={IconType.Play}/>}
        </a>
      </div>
    )
  }

  _addBindings(): void {
    this.player.addEventListener(this.player.Event.CHANGE_SOURCE_ENDED, this._onChangeSourceEnded.bind(this));
  }

  _onChangeSourceEnded(): void {
    try {
      if (!this.player.config.playback.autoplay) {
        this.props.updatePrePlayback(true);
        this.props.addPlayerClass('pre-playback');
      }
    } catch (e) {
      this.logger.error(e.message);
    }
  }

  _displayPrePlayback(): void {
    this.props.updatePrePlayback(true);
    this.props.addPlayerClass('pre-playback');
  }

  _hidePrePlayback(): void {
    this.props.updatePrePlayback(false);
    this.props.removePlayerClass('pre-playback');
  }
}

export default PrePlaybackPlayOverlay;
