//@flow
import style from './_fullscreen.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/fullscreen';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  fullscreen: state.fullscreen.fullscreen,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
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
    super({name: 'Fullscreen', player: obj.player, config: obj.config});
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
  }

  /**
   * fullscreen change handler function. updates the store with new value
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  fullscreenChangeHandler(): void {
    let isFullscreen = typeof document.fullscreenElement !== 'undefined' && Boolean(document.fullscreenElement) ||
      typeof document.webkitFullscreenElement !== 'undefined' && Boolean(document.webkitFullscreenElement) ||
      typeof document.mozFullScreenElement !== 'undefined' && Boolean(document.mozFullScreenElement) ||
      typeof document.msFullscreenElement !== 'undefined' && Boolean(document.msFullscreenElement);

    isFullscreen ? this.player.notifyEnterFullscreen() : this.player.notifyExitFullscreen();
    this.props.updateFullscreen(isFullscreen);
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
   * otherwise, request fullscreen to the parent plater view than includes the GUI as well
   *
   * @returns {void}
   * @memberof FullscreenControl
   */
  enterFullscreen(): void {
    if (this.props.isMobile && this.player.env.os.name === 'iOS') {
      this.player.getView().getElementsByTagName('video')[0].webkitEnterFullscreen();
    } else {
      let elementToFullscreen = document.getElementById(this.config.targetId);
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
