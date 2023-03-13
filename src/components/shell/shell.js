//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions as shellActions} from '../../reducers/shell';
import {actions as engineActions} from '../../reducers/engine';
import {KeyMap} from '../../utils/key-map';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';
import {ResizeWatcher} from '../../utils/resize-watcher';
import {debounce} from 'utils/debounce';
import {FakeEvent} from 'event/fake-event';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  targetId: state.config.targetId,
  forceTouchUI: state.config.forceTouchUI,
  hoverTimeout: state.config.hoverTimeout,
  metadataLoaded: state.engine.metadataLoaded,
  currentState: state.engine.playerState.currentState,
  playerClasses: state.shell.playerClasses,
  isMobile: state.shell.isMobile,
  playerSize: state.shell.playerSize,
  isCasting: state.engine.isCasting,
  guiClientRect: state.shell.guiClientRect,
  playerHover: state.shell.playerHover,
  playerNav: state.shell.playerNav,
  seekbarDraggingActive: state.seekbar.draggingActive,
  seekbarHoverActive: state.seekbar.hoverActive,
  volumeHoverActive: state.volume.hover,
  adBreak: state.engine.adBreak,
  prePlayback: state.engine.prePlayback,
  smartContainerOpen: state.shell.smartContainerOpen,
  fullscreen: state.engine.fullscreen,
  fallbackToMutedAutoPlay: state.engine.fallbackToMutedAutoPlay,
  playlist: state.engine.playlist
});

const ON_PLAYER_RECT_CHANGE_DEBOUNCE_DELAY: number = 100;

const PLAYER_SIZE: {[size: string]: string} = {
  TINY: 'tiny',
  EXTRA_SMALL: 'extrasmall',
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
  EXTRA_LARGE: 'extralarge'
};

const PLAYER_BREAK_POINTS: {[size: string]: number} = {
  TINY: 280,
  EXTRA_SMALL: 380,
  SMALL: 480,
  MEDIUM: 768,
  LARGE: 1024
};

const COMPONENT_NAME = 'Shell';

/**
 * Shell component
 *
 * @class Shell
 * @example <Shell />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...shellActions, ...engineActions}))
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
class Shell extends Component {
  state: Object;
  hoverTimeout: ?TimeoutID;
  _environmentClasses: Array<string>;
  _playerResizeWatcher: ResizeWatcher;
  _playerRef: HTMLDivElement;

  /**
   * on mouse over, add hover class (shows the player ui) and timeout of 3 seconds bt default or what pass as prop configuration to component
   *
   * @returns {void}
   * @memberof Shell
   */
  onMouseOver = (): void => {
    if (this.props.isMobile) {
      return;
    }
    if (this.state.nav) {
      this.setState({nav: false});
      this.props.updatePlayerNavState(false);
    }
  };

  /**
   * on mouse leave, remove the hover class (hide the player gui)
   * @param {Event} event - the mouse leave event
   * @returns {void}
   * @memberof Shell
   */
  onMouseLeave = (event: Event): void => {
    /**
     * a hack to fix 'mouseleave' bug in chrome - the event is called sometimes on a click inside the div.
     * https://bugs.chromium.org/p/chromium/issues/detail?id=798535
     */
    if (!Object.prototype.hasOwnProperty.call(event, 'toElement')) {
      return;
    }
    if (this.props.isMobile) {
      return;
    }
    if (this.state.hover) {
      this._updatePlayerHover(false);
    }
  };

  /**
   * if ui hidden and mouse move, show the ui by adding the hover class
   *
   * @returns {void}
   * @memberof Shell
   */
  onMouseMove = (): void => {
    if (this.props.isMobile) {
      return;
    }
    this._updatePlayerHoverState();
  };

  /**
   * if the ui is in fallback to muted autoplay mode, unmute the player on any mouse down
   *
   * @returns {void}
   * @memberof Shell
   */
  onMouseUp = (): void => {
    this.unMuteFallback();
    this.props.notifyClick();
    this._startHoverTimeout();
  };

  /**
   * if the ui is in fallback to muted autoplay mode, unmute the player
   *
   * @returns {void}
   * @memberof Shell
   */
  unMuteFallback(): void {
    if (this.props.fallbackToMutedAutoPlay) {
      this.props.player.muted = false;
    }
  }

  /**
   * on touch end handler
   * @param {TouchEvent} e - touch event

   * @returns {void}
   * @memberof Shell
   */
  onTouchEnd = (e: TouchEvent): void => {
    if (this.props.prePlayback) {
      return;
    }
    if (this.props.fallbackToMutedAutoPlay) {
      this.props.player.muted = false;
    }
    if (!this.state.hover) {
      e.stopPropagation();
    }
    this._updatePlayerHoverState();
  };

  /**
   * key down handler
   *
   * @param {KeyboardEvent} e - event object
   * @returns {void}
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (!this.state.nav && e.keyCode === KeyMap.TAB) {
      this.setState({nav: true});
      this.props.updatePlayerNavState(true);
    }

    if (this.state.nav && (e.keyCode === KeyMap.ENTER || e.keyCode === KeyMap.SPACE)) {
      this.unMuteFallback();
      if (e.srcElement.contains(this._playerRef)) {
        e.preventDefault();
        this.props.player.paused ? this.props.player.play() : this.props.player.pause();
      }
    }
  };

  /**
   * componentWillMount
   *
   * @returns {void}
   * @memberof Shell
   */
  componentWillMount() {
    const {player, forceTouchUI} = this.props;
    this._environmentClasses = [
      `${__CSS_MODULE_PREFIX__}-${player.env.os.name.replace(/ /g, '-')}`,
      `${__CSS_MODULE_PREFIX__}-${player.env.browser.name.replace(/ /g, '-')}`
    ];
    const {isIPadOS, isTablet, isMobile} = player.env;
    this.props.updateIsMobile(isIPadOS || isTablet || isMobile || forceTouchUI);
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
    const {player, eventManager} = this.props;
    eventManager.listen(window, 'resize', debounce(this._onWindowResize, ON_PLAYER_RECT_CHANGE_DEBOUNCE_DELAY));
    eventManager.listen(document, 'scroll', debounce(this._updatePlayerClientRect, ON_PLAYER_RECT_CHANGE_DEBOUNCE_DELAY));
    this._playerResizeWatcher = new ResizeWatcher();
    this._playerResizeWatcher.init(document.getElementById(this.props.targetId));
    eventManager.listen(this._playerResizeWatcher, FakeEvent.Type.RESIZE, debounce(this._onWindowResize, ON_PLAYER_RECT_CHANGE_DEBOUNCE_DELAY));
    eventManager.listen(player, player.Event.FIRST_PLAY, () => this._onWindowResize());
    this._onWindowResize();
  }

  /**
   * window resize handler
   *
   * @returns {void}
   * @memberof Shell
   */
  _onWindowResize = () => {
    this._updatePlayerClientRect();
    if (document.body) {
      this.props.updateDocumentWidth(document.body.clientWidth);
    }
  };

  /**
   * update the player rect
   *
   * @returns {void}
   * @memberof Shell
   */
  _updatePlayerClientRect = () => {
    const playerContainer = document.getElementById(this.props.targetId);
    if (playerContainer) {
      this.props.updatePlayerClientRect(playerContainer.getBoundingClientRect());
    }
  };

  /**
   * before component mounted, remove event listeners
   *
   * @returns {void}
   * @memberof Shell
   */
  componentWillUnmount(): void {
    this._clearHoverTimeout();
    this._playerResizeWatcher.destroy();
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
      this._updatePlayerHover(true);
    }
    this._startHoverTimeout();
  }

  /**
   * update hover as atomic change - all props for hover change at one place
   * to be able to know to handle outside changes for player hover
   * @returns {void} - if hover state can be ended
   * @param {boolean} hover - is needed to update to hover or not
   * @private
   * @memberof Shell
   */
  _updatePlayerHover(hover: boolean): void {
    this.props.updatePlayerHoverState(hover);
    this.props.notifyHoverChange({hover});
    this.setState({hover});
  }

  /**
   * checks if hover state can be ended based on other components states
   * @returns {boolean} - if hover state can be ended
   * @private
   * @memberof Shell
   */
  _canEndHoverState(): boolean {
    return (
      !this.props.seekbarDraggingActive &&
      !this.props.seekbarHoverActive &&
      !this.props.volumeHoverActive &&
      !this.props.smartContainerOpen &&
      (!this.props.player.paused || this.props.adBreak)
    );
  }

  /**
   * starts the hover timeout.
   * @returns {void}
   * @private
   * @memberof Shell
   */
  _startHoverTimeout(): void {
    this._clearHoverTimeout();
    if (this.props.hoverTimeout) {
      this.hoverTimeout = setTimeout(() => {
        if (this._canEndHoverState()) {
          this._updatePlayerHover(false);
        }
      }, this.props.hoverTimeout);
    }
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
    // or hover state changed from different component - should be handled in shell
    // or from paused to playing
    // or after an ad break
    // or in ad break
    if (
      this.state.hover !== this.props.playerHover ||
      (this.props.currentState === 'playing' && prevProps.currentState === 'paused') ||
      (!this.props.prePlayback && prevProps.prePlayback) ||
      (!this.props.adBreak && prevProps.adBreak) ||
      (this.props.adBreak && !prevProps.adBreak)
    ) {
      // hover updated from different component should notify this change.
      if (this.state.hover !== this.props.playerHover) {
        this.props.notifyHoverChange({hover: this.props.playerHover});
      }
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
    let playerClasses = [style.player, style.skinDefault, ...this._environmentClasses].concat(props.playerClasses);

    if (this.props.prePlayback) playerClasses.push(style.prePlayback);
    if (this.props.isCasting) playerClasses.push(`${__CSS_MODULE_PREFIX__}-casting`);
    if (this.props.isMobile) playerClasses.push(style.touch);
    if (this.props.playerNav) playerClasses.push(style.nav);
    if (this.props.playerHover || this.props.playerNav) playerClasses.push(style.hover);
    if (this.props.metadataLoaded) playerClasses.push(style.metadataLoaded);
    if (this.props.adBreak) playerClasses.push(style.adBreak);
    if (this.props.metadataLoaded) playerClasses.push(style['state-' + this.props.currentState]);
    if (this.props.seekbarDraggingActive) playerClasses.push(style.hover);
    if (this.props.fullscreen) playerClasses.push(style.fullscreen);
    if (this.props.playlist) playerClasses.push(style.playlist);
    if (this.props.guiClientRect) {
      if (this.props.guiClientRect.width <= PLAYER_BREAK_POINTS.TINY) {
        playerClasses.push(style.sizeTy);
        this.props.updatePlayerSize(PLAYER_SIZE.TINY);
      } else if (this.props.guiClientRect.width <= PLAYER_BREAK_POINTS.EXTRA_SMALL) {
        playerClasses.push(style.sizeXs);
        this.props.updatePlayerSize(PLAYER_SIZE.EXTRA_SMALL);
      } else if (this.props.guiClientRect.width <= PLAYER_BREAK_POINTS.SMALL) {
        playerClasses.push(style.sizeSm);
        this.props.updatePlayerSize(PLAYER_SIZE.SMALL);
      } else if (this.props.guiClientRect.width <= PLAYER_BREAK_POINTS.MEDIUM) {
        playerClasses.push(style.sizeMd);
        this.props.updatePlayerSize(PLAYER_SIZE.MEDIUM);
      } else if (this.props.guiClientRect.width <= PLAYER_BREAK_POINTS.LARGE) {
        playerClasses.push(style.sizeLg);
        this.props.updatePlayerSize(PLAYER_SIZE.LARGE);
      } else {
        this.props.updatePlayerSize(PLAYER_SIZE.EXTRA_LARGE);
      }

      this.props.updateIsSmallSize(
        // in Tiny the ui is minimal and therefore this check is not relevant - left it this way to maintain current logic
        [PLAYER_SIZE.SMALL, PLAYER_SIZE.EXTRA_SMALL].includes(this.props.playerSize)
      );
    }
    playerClasses.push('notranslate');
    playerClasses = playerClasses.join(' ');

    return (
      <div
        tabIndex="0"
        ref={node => (this._playerRef = node)}
        aria-label="Video Player"
        className={playerClasses}
        onTouchEnd={this.onTouchEnd}
        onMouseUp={this.onMouseUp}
        onMouseOver={this.onMouseOver}
        onMouseMove={this.onMouseMove}
        onMouseLeave={this.onMouseLeave}
        onKeyDown={this.onKeyDown}>
        {props.children}
      </div>
    );
  }
}

export {Shell, PLAYER_SIZE};
