//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {actions as fullscreenActions} from '../../reducers/fullscreen';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  targetId: state.config.targetId,
  fullscreen: state.fullscreen.fullscreen,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(Object.assign(actions, fullscreenActions)))
  /**
   * FullscreenControl component
   *
   * @class FullscreenControl
   * @example <FullscreenControl player={this.player} />
   * @extends {BaseComponent}
   */
class FullscreenControl extends BaseComponent {

  /**
   * Creates an instance of FullscreenControl.
   * @param {Object} obj obj
   * @memberof FullscreenControl
   */
  constructor(obj: Object) {
    super({name: 'Fullscreen', player: obj.player});
  }

  /**
   * after component mounted, set up event listerners to window fullscreen state change
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  componentDidMount() {
    document.addEventListener('webkitfullscreenchange', () => this.fullscreenChangeHandler());
    document.addEventListener('mozfullscreenchange', () => this.fullscreenChangeHandler());
    document.addEventListener('fullscreenchange', () => this.fullscreenChangeHandler());
    document.addEventListener('MSFullscreenChange', () => this.fullscreenChangeHandler());
    this.player.addEventListener(this.player.Event.REQUESTED_ENTER_FULLSCREEN, () => this.enterFullscreen());
    this.player.addEventListener(this.player.Event.REQUESTED_EXIT_FULLSCREEN, () => this.exitFullscreen());
    this.hanldeIosFullscreen();
  }

  /**
   * Handle iOS full screen changes
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  hanldeIosFullscreen(): void {
    if (this.player.env.os.name === 'iOS') {
      /**
       * Attach listeners to ios full screen change.
       * @returns {void}
       */
      const attachIosFullscreenListeners = () => {
        this.player.removeEventListener(this.player.Event.SOURCE_SELECTED, attachIosFullscreenListeners);
        this.player.getVideoElement().addEventListener('webkitbeginfullscreen', () => {
          if (this.player.env.device.type === 'tablet') {
            this.props.addPlayerClass(style.nativeTabletFullscreen);
          }
          this.fullscreenEnterHandler();
        });
        this.player.getVideoElement().addEventListener('webkitendfullscreen', () => {
          if (this.player.env.device.type === 'tablet') {
            this.props.removePlayerClass(style.nativeTabletFullscreen);
          }
          this.fullscreenExitHandler();
        });
      };
      this.player.addEventListener(this.player.Event.SOURCE_SELECTED, attachIosFullscreenListeners);
    }
  }

  /**
   * fullscreen change handler function.
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  fullscreenChangeHandler(): void {
    let isFullscreen = typeof document.fullscreenElement !== 'undefined' && Boolean(document.fullscreenElement) ||
      typeof document.webkitFullscreenElement !== 'undefined' && Boolean(document.webkitFullscreenElement) ||
      typeof document.mozFullScreenElement !== 'undefined' && Boolean(document.mozFullScreenElement) ||
      typeof document.msFullscreenElement !== 'undefined' && Boolean(document.msFullscreenElement);

    isFullscreen ? this.fullscreenEnterHandler() : this.fullscreenExitHandler();
  }

  /**
   * fullscreen enter handler function. updates the store with new value
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  fullscreenEnterHandler(): void {
    this.player.notifyEnterFullscreen();
    this.props.updateFullscreen(true);
  }

  /**
   * fullscreen exit handler function. updates the store with new value
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  fullscreenExitHandler(): void {
    this.player.notifyExitFullscreen();
    this.props.updateFullscreen(false);
  }

  /**
   * request fullscreen function to all browsers
   *
   * @param {HTMLElement} element - element to enter fullscreen
   * @returns {boolean} - boolean success indicator to enter fullscreen or not
   * @memberof FullscreenControl
   */
  requestFullscreen(element: HTMLElement): boolean {
    if (typeof element.requestFullscreen === 'function') {
      element.requestFullscreen();
      return true;
    } else if (typeof element.mozRequestFullScreen === 'function') {
      element.mozRequestFullScreen();
      return true;
    } else if (typeof element.webkitRequestFullScreen === 'function') {
      element.webkitRequestFullScreen();
      return true;
    } else if (typeof element.msRequestFullscreen === 'function') {
      element.msRequestFullscreen();
      return true;
    } else {
      return false;
    }
  }

  /**
   * if mobile detected, get the video element and request fullscreen.
   * otherwise, request fullscreen to the parent player view than includes the GUI as well
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  enterFullscreen(): void {
    if (this.props.isMobile && this.player.env.os.name === 'iOS') {
      this.player.getVideoElement().webkitEnterFullscreen();
    } else {
      let elementToFullscreen = document.getElementById(this.props.targetId);
      if (elementToFullscreen) {
        this.requestFullscreen(elementToFullscreen);
      }
    }
  }

  /**
   * exit fullscreen cross platform function
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  exitFullscreen() {
    if (typeof document.exitFullscreen === 'function') {
      document.exitFullscreen();
    } else if (typeof document.webkitExitFullscreen === 'function') {
      document.webkitExitFullscreen();
    } else if (typeof document.mozCancelFullScreen === 'function') {
      document.mozCancelFullScreen();
    } else if (typeof document.msExitFullscreen === 'function') {
      document.msExitFullscreen();
    }
  }

  /**
   * toggle fullscreen based on current fullscreen state in store
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  toggleFullscreen(): void {
    this.logger.debug(`Toggle fullscreen`);
    this.props.fullscreen ? this.exitFullscreen() : this.enterFullscreen();
  }

  /**
   * render component
   *
   * @returns {React$Element} - component
   * @memberof FullscreenControl
   */
  render(): React$Element<any> {
    return (
      <div className={[style.controlButtonContainer, style.controlFullscreen].join(' ')}>
        <Localizer>
          <button tabIndex="0"
                  aria-label={<Text id='controls.fullscreen'/>}
                  className={this.props.fullscreen ? [style.controlButton, style.isFullscreen].join(' ') : style.controlButton}
                  onClick={() => this.toggleFullscreen()}>
            <Icon type={IconType.Maximize}/>
            <Icon type={IconType.Minimize}/>
          </button>
        </Localizer>
      </div>
    )
  }
}

export default FullscreenControl;
