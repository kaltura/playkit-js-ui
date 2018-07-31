//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions as shellActions} from '../../reducers/shell';
import {actions as engineActions} from '../../reducers/engine';
import {KeyMap} from '../../utils/key-map';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  targetId: state.config.targetId,
  forceTouchUI: state.config.forceTouchUI,
  metadataLoaded: state.engine.metadataLoaded,
  currentState: state.engine.playerState.currentState,
  playerClasses: state.shell.playerClasses,
  isMobile: state.shell.isMobile,
  isCasting: state.engine.isCasting,
  playerClientRect: state.shell.playerClientRect,
  playerHover: state.shell.playerHover,
  playerNav: state.shell.playerNav,
  seekbarDraggingActive: state.seekbar.draggingActive,
  seekbarHoverActive: state.seekbar.hoverActive,
  bottomBarHoverActive: state.shell.bottomBarHoverActive,
  volumeHoverActive: state.volume.hover,
  adBreak: state.engine.adBreak,
  prePlayback: state.shell.prePlayback,
  smartContainerOpen: state.shell.smartContainerOpen,
  fullscreen: state.fullscreen.fullscreen,
  fallbackToMutedAutoPlay: state.engine.fallbackToMutedAutoPlay
});

/**
 * The default control bar hover time rendering timeout value
 * @type {number}
 * @const
 */
export const CONTROL_BAR_HOVER_DEFAULT_TIMEOUT: number = 3000;

@connect(mapStateToProps, bindActions(Object.assign({}, shellActions, engineActions)))
  /**
   * Shell component
   *
   * @class Shell
   * @example <Shell player={this.player}>...</Shell>
   * @extends {BaseComponent}
   */
class Shell extends BaseComponent {
  state: Object;
  hoverTimeout: ?number;
  _environmentClasses: Array<string>;

  /**
   * Creates an instance of Shell.
   * @param {Object} obj obj
   * @memberof Shell
   */
  constructor(obj: Object) {
    super({name: 'Shell', player: obj.player});
    this._environmentClasses = [
      `${__CSS_MODULE_PREFIX__}-${this.player.env.os.name.replace(/ /g, '-')}`,
      `${__CSS_MODULE_PREFIX__}-${this.player.env.browser.name.replace(/ /g, '-')}`
    ];
  }

  /**
   * on mouse over, add hover class (shows the player ui) and timeout of 3 seconds bt default or what pass as prop configuration to component
   *
   * @returns {void}
   * @memberof Shell
   */
  onMouseOver(): void {
    if (this.props.isMobile) {
      return;
    }
    if (this.state.nav) {
      this.setState({nav: false});
      this.props.updatePlayerNavState(false);
    }
    if (!this.props.bottomBarHoverActive) {
      this._updatePlayerHoverState();
    }
  }

  /**
   * on mouse leave, remove the hover class (hide the player gui)
   * @param {Event} event - the mouse leave event
   * @returns {void}
   * @memberof Shell
   */
  onMouseLeave(event: Event): void {
    /**
     * a hack to fix 'mouseleave' bug in chrome - the event is called sometimes on a click inside the div.
     * https://bugs.chromium.org/p/chromium/issues/detail?id=798535
     */
    if (!event.toElement) {
      return;
    }
    if (this.props.isMobile) {
      return;
    }
    if (this.state.hover) {
      this.setState({hover: false});
      this.props.updatePlayerHoverState(false);
    }
  }

  /**
   * if ui hidden and mouse move, show the ui by adding the hover class
   *
   * @returns {void}
   * @memberof Shell
   */
  onMouseMove(): void {
    if (this.props.isMobile) {
      return;
    }
    this._updatePlayerHoverState();
  }

  /**
   * if the ui is in fallback to muted autoplay mode, unmute the player on any click
   *
   * @returns {void}
   * @memberof Shell
   */
  onClick(): void {
    if (this.props.fallbackToMutedAutoPlay) {
      this.player.muted = false;
      this.props.updateFallbackToMutedAutoPlay(false);
    }
    this.notifyClick();
  }

  /**
   * on touch end handler
   * @param {TouchEvent} e - touch event

   * @returns {void}
   * @memberof Shell
   */
  onTouchEnd(e: TouchEvent): void {
    if (this.props.prePlayback) {
      return;
    }
    if (!this.state.hover) {
      e.stopPropagation();
    }
    this._updatePlayerHoverState();
  }

  /**
   * key down handler
   *
   * @param {KeyboardEvent} e - event object
   * @returns {void}
   */
  onKeyDown(e: KeyboardEvent): void {
    if (!this.state.nav && e.keyCode === KeyMap.TAB) {
      this.setState({nav: true});
      this.props.updatePlayerNavState(true);
    }
  }

  /**
   * after component mounted, update the isMobile indication in the store state,
   * add event listener to get the player width and update these on resize as well.
   * also, update document width initially and on resize.
   *
   * @returns {void}
   * @memberof Shell
   */
  componentDidMount() {
    this.props.updateIsMobile(!!this.player.env.device.type || this.props.forceTouchUI);
    this._onWindowResize();
    this.eventManager.listen(window, 'resize', () => this._onWindowResize());
  }

  /**
   * window resize handler
   *
   * @returns {void}
   * @memberof Shell
   */
  _onWindowResize(): void {
    const playerContainer = document.getElementById(this.props.targetId);
    if (playerContainer) {
      this.props.updatePlayerClientRect(playerContainer.getBoundingClientRect());
    }
    if (document.body) {
      this.props.updateDocumentWidth(document.body.clientWidth);
    }
  }

  /**
   * before component mounted, remove event listeners
   *
   * @returns {void}
   * @memberof Shell
   */
  componentWillUnmount(): void {
    super.componentWillUnmount();
    this._clearHoverTimeout();
  }

  /**
   * updates the player hover state
   * @returns {void}
   * @memberof Shell
   */
  _updatePlayerHoverState(): void {
    if (this.props.prePlayback) {
      return;
    }
    if (!this.state.hover) {
      this.props.updatePlayerHoverState(true);
      this.setState({hover: true});
    }
    this._startHoverTimeout();
  }

  /**
   * checks if hover state can be ended based on other components states
   * @returns {boolean} - if hover state can be ended
   * @private
   * @memberof Shell
   */
  _canEndHoverState(): boolean {
    return !this.props.seekbarDraggingActive
      && !this.props.seekbarHoverActive
      && !this.props.volumeHoverActive
      && !this.props.smartContainerOpen
      && !this.player.paused;
  }

  /**
   * starts the hover timeout.
   * @returns {void}
   * @private
   * @memberof Shell
   */
  _startHoverTimeout(): void {
    this._clearHoverTimeout();
    this.hoverTimeout = setTimeout(() => {
      if (this._canEndHoverState()) {
        this.props.updatePlayerHoverState(false);
        this.setState({hover: false});
      }
    }, this.props.hoverTimeout || CONTROL_BAR_HOVER_DEFAULT_TIMEOUT);
  }

  /**
   * clears the hover timeout.
   * @returns {void}
   * @private
   * @memberof Shell
   */
  _clearHoverTimeout(): void {
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
      this.hoverTimeout = null;
    }
  }

  /**
   * when component did update and change its props from prePlayback to !prePlayback
   * update the hover state
   *
   * @param {Object} prevProps - previous props
   * @returns {void}
   * @memberof Shell
   */
  componentDidUpdate(prevProps: Object): void {
    // Update the hover state if the transition was from pre playback screen
    // or after an ad break
    if (!this.props.prePlayback && prevProps.prePlayback ||
      !this.props.adBreak && prevProps.adBreak) {
      this._updatePlayerHoverState();
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Shell
   */
  render(props: any): React$Element<any> {
    let playerClasses = [style.player, style.skinDefault, ...this._environmentClasses];
    playerClasses.push(props.playerClasses);

    if (this.props.isCasting) playerClasses.push(`${__CSS_MODULE_PREFIX__}-casting`);
    if (this.props.isMobile) playerClasses.push(style.touch);
    if (this.props.playerNav) playerClasses.push(style.nav);
    if (this.props.playerHover || this.props.playerNav) playerClasses.push(style.hover);
    if (this.props.metadataLoaded) playerClasses.push(style.metadataLoaded);
    if (this.props.adBreak) playerClasses.push(style.adBreak);
    if (this.props.metadataLoaded) playerClasses.push(style['state-' + this.props.currentState]);
    if (this.props.seekbarDraggingActive) playerClasses.push(style.hover);
    if (this.props.fullscreen) playerClasses.push(style.fullscreen);
    if (this.props.playerClientRect && this.props.playerClientRect.width <= 480) playerClasses.push(style.sizeSm);
    else if (this.props.playerClientRect && this.props.playerClientRect.width <= 768) playerClasses.push(style.sizeMd);

    playerClasses = playerClasses.join(' ');

    return (
      <div
        tabIndex="0"
        className={playerClasses}
        onClick={() => this.onClick()}
        onTouchEnd={(e) => this.onTouchEnd(e)}
        onMouseOver={() => this.onMouseOver()}
        onMouseMove={() => this.onMouseMove()}
        onMouseLeave={(event) => this.onMouseLeave(event)}
        onKeyDown={(e) => this.onKeyDown(e)}>
        {props.children}
      </div>
    );
  }
}

export {Shell};
