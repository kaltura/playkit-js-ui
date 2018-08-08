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
  inBrowserFullscreenForIOS: state.fullscreen.inBrowserFullscreenForIOS,
  isMobile: state.shell.isMobile
});

@connect(
  mapStateToProps,
  bindActions(Object.assign({}, actions, fullscreenActions))
)
/**
 * FullscreenControl component
 *
 * @class FullscreenControl
 * @example <FullscreenControl player={this.player} />
 * @extends {BaseComponent}
 */
class FullscreenControl extends BaseComponent {
  _targetDiv: ?HTMLElement;

  /**
   * Creates an instance of FullscreenControl.
   * @param {Object} obj obj
   * @memberof FullscreenControl
   */
  constructor(obj: Object) {
    super({name: 'Fullscreen', player: obj.player});
  }

  /**
   * before component mounted, cache the target id div
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  componentWillMount(): void {
    this._targetDiv = document.getElementById(this.props.targetId);
    if (this._isFullscreen() !== this.props.fullscreen) {
      this.fullscreenChangeHandler();
    }
  }

  /**
   * after component mounted, set up event listeners to window fullscreen state change
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  componentDidMount(): void {
    this.eventManager.listen(document, 'webkitfullscreenchange', () => this.fullscreenChangeHandler());
    this.eventManager.listen(document, 'mozfullscreenchange', () => this.fullscreenChangeHandler());
    this.eventManager.listen(document, 'fullscreenchange', () => this.fullscreenChangeHandler());
    this.eventManager.listen(document, 'MSFullscreenChange', () => this.fullscreenChangeHandler());
    this.eventManager.listen(this.player, this.player.Event.REQUESTED_ENTER_FULLSCREEN, () => this.enterFullscreen());
    this.eventManager.listen(this.player, this.player.Event.REQUESTED_EXIT_FULLSCREEN, () => this.exitFullscreen());
    this.handleIosFullscreen();
  }

  /**
   * Handle iOS full screen changes
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  handleIosFullscreen(): void {
    if (this.player.env.os.name === 'iOS') {
      /**
       * Attach listeners to ios full screen change.
       * @returns {void}
       */
      const attachIosFullscreenListeners = () => {
        this.eventManager.listen(this.player.getVideoElement(), 'webkitbeginfullscreen', () => this.fullscreenEnterHandler());
        this.eventManager.listen(this.player.getVideoElement(), 'webkitendfullscreen', () => this.fullscreenExitHandler());
      };
      this.eventManager.listenOnce(this.player, this.player.Event.SOURCE_SELECTED, attachIosFullscreenListeners);
    }
  }

  /**
   * fullscreen change handler function.
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  fullscreenChangeHandler(): void {
    this._isFullscreen() ? this.fullscreenEnterHandler() : this.fullscreenExitHandler();
  }

  /**
   * @returns {boolean} - the current fullscreen state of the document
   * @memberof FullscreenControl
   */
  _isFullscreen(): boolean {
    return (
      (typeof document.fullscreenElement !== 'undefined' && Boolean(document.fullscreenElement)) ||
      (typeof document.webkitFullscreenElement !== 'undefined' && Boolean(document.webkitFullscreenElement)) ||
      (typeof document.mozFullScreenElement !== 'undefined' && Boolean(document.mozFullScreenElement)) ||
      (typeof document.msFullscreenElement !== 'undefined' && Boolean(document.msFullscreenElement))
    );
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
   * enter in browser fullscreen mode
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  enterInBrowserFullscreen(): void {
    if (this._targetDiv) {
      this._targetDiv.classList.add(style.inBrowserFullscreenMode);
      this.player.notifyEnterFullscreen();
      this.props.updateFullscreen(true);
      window.dispatchEvent(new Event('resize'));
    }
  }

  /**
   * exit in browser fullscreen mode
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  exitInBrowserFullscreen(): void {
    if (this._targetDiv) {
      this._targetDiv.classList.remove(style.inBrowserFullscreenMode);
      this.player.notifyExitFullscreen();
      this.props.updateFullscreen(false);
      window.dispatchEvent(new Event('resize'));
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
    if (this.player.env.os.name === 'iOS') {
      if (this.props.inBrowserFullscreenForIOS) {
        this.enterInBrowserFullscreen();
      } else {
        this.player.getVideoElement().webkitEnterFullScreen();
      }
    } else {
      if (this._targetDiv) {
        this.requestFullscreen(this._targetDiv);
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
    if (this.player.env.os.name === 'iOS') {
      if (this.props.inBrowserFullscreenForIOS) {
        this.exitInBrowserFullscreen();
      } else {
        this.player.getVideoElement().webkitExitFullScreen();
      }
    } else if (typeof document.exitFullscreen === 'function') {
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
    this.notifyClick();
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
          <button
            tabIndex="0"
            aria-label={<Text id="controls.fullscreen" />}
            className={this.props.fullscreen ? [style.controlButton, style.isFullscreen].join(' ') : style.controlButton}
            onClick={() => this.toggleFullscreen()}>
            <Icon type={IconType.Maximize} />
            <Icon type={IconType.Minimize} />
          </button>
        </Localizer>
      </div>
    );
  }
}

export {FullscreenControl};
