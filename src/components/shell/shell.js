//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {KeyMap} from "../../utils/key-map";

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  targetId: state.config.targetId,
  config: state.config.ui.shell,
  metadataLoaded: state.engine.metadataLoaded,
  currentState: state.engine.playerState.currentState,
  playerClasses: state.shell.playerClasses,
  isMobile: state.shell.isMobile,
  playerClientRect: state.shell.playerClientRect,
  playerHover: state.shell.playerHover,
  playerNav: state.shell.playerNav,
  seekbarDraggingActive: state.seekbar.draggingActive,
  seekbarHoverActive: state.seekbar.hoverActive,
  bottomBarHoverActive: state.shell.bottomBarHoverActive,
  volumeHoverActive: state.volume.hover,
  languageMenuOpen: state.language.menuOpen,
  settingsMenuOpen: state.settings.menuOpen,
  adBreak: state.engine.adBreak
});

/**
 * The default control bar hover time rendering timeout value
 * @type {number}
 * @const
 */
export const CONTROL_BAR_HOVER_DEFAULT_TIMEOUT: number = 3000;

@connect(mapStateToProps, bindActions(actions))
  /**
   * Shell component
   *
   * @class Shell
   * @example <Shell player={this.player}>...</Shell>
   * @extends {BaseComponent}
   */
class Shell extends BaseComponent {
  state: Object;
  _hoverTimeout: number;
  _fallbackToMutedAutoPlayMode: boolean;
  _el: HTMLDivElement;

  /**
   * Creates an instance of Shell.
   * @param {Object} obj obj
   * @memberof Shell
   */
  constructor(obj: Object) {
    super({name: 'Shell', player: obj.player});
    this._fallbackToMutedAutoPlayMode = false;
    this.player.addEventListener(this.player.Event.FALLBACK_TO_MUTED_AUTOPLAY, () => {
      this._fallbackToMutedAutoPlayMode = true
    });
  }

  /**
   * on mouse over, add hover class (shows the player ui) and timeout of 3 seconds bt default or what pass as prop configuration to component
   *
   * @returns {void}
   * @memberof Shell
   */
  onMouseOver(): void {
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
   *
   * @returns {void}
   * @memberof Shell
   */
  onMouseLeave(): void {
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
    this._updatePlayerHoverState();
  }

  /**
   * if the ui is in fallback to muted autoplay mode, unmute the player on any click
   *
   * @returns {void}
   * @memberof Shell
   */
  onClick(): void {
    if (this._fallbackToMutedAutoPlayMode) {
      this.player.muted = false;
      this._fallbackToMutedAutoPlayMode = false;
    }
    if (!this.state.nav) {
      this._el.focus();
    }
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
    this.props.updateIsMobile(!!this.player.env.device.type || this.props.config.forceTouchUI);
    if (document.body) {
      this.props.updateDocumentWidth(document.body.clientWidth);
    }
    const playerContainer = document.getElementById(this.props.targetId);
    if (playerContainer) {
      this.props.updatePlayerClientRect(playerContainer.getBoundingClientRect());
    }
    window.addEventListener('resize', () => {
      const playerContainer = document.getElementById(this.props.targetId);
      if (playerContainer) {
        this.props.updatePlayerClientRect(playerContainer.getBoundingClientRect());
      }
      if (document.body) {
        this.props.updateDocumentWidth(document.body.clientWidth);
      }
    });
    if (this.player.env.device.type) {
      this.props.updatePlayerHoverState(true);
    }
    this._updatePlayerHoverState();
  }

  /**
   * updates the player hover state
   * @returns {void}
   * @memberof Shell
   */
  _updatePlayerHoverState(): void {
    if (!this.state.hover) {
      this.props.updatePlayerHoverState(true);
      this.setState({hover: true});
    }
    if (this._hoverTimeout) {
      clearTimeout(this._hoverTimeout);
    }
    this._hoverTimeout = setTimeout(() => {
      if (this._canEndHoverState()) {
        this.props.updatePlayerHoverState(false);
        this.setState({hover: false});
      }
    }, this.props._hoverTimeout || CONTROL_BAR_HOVER_DEFAULT_TIMEOUT);
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
      && !this.props.languageMenuOpen
      && !this.props.settingsMenuOpen;
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Shell
   */
  render(props: any): React$Element<any> {
    let playerClasses = [style.player, style.skinDefault];
    playerClasses.push(props.playerClasses);

    if (this.props.isMobile) playerClasses.push(style.touch);
    if (this.props.playerNav) playerClasses.push(style.nav);
    if (this.props.playerHover || this.props.playerNav) playerClasses.push(style.hover);
    if (this.props.metadataLoaded) playerClasses.push(style.metadataLoaded);
    if (this.props.adBreak) playerClasses.push(style.adBreak);
    if (this.props.metadataLoaded) playerClasses.push(style['state-' + this.props.currentState]);
    if (this.props.seekbarDraggingActive) playerClasses.push(style.hover);
    if (this.props.playerClientRect && this.props.playerClientRect.width <= 480) playerClasses.push(style.sizeSm);
    else if (this.props.playerClientRect && this.props.playerClientRect.width <= 768) playerClasses.push(style.sizeMd);

    playerClasses = playerClasses.join(' ');

    return (
      <div
        tabIndex="0"
        ref={el => this._el = el}
        className={playerClasses}
        onClick={() => this.onClick()}
        onMouseOver={() => this.onMouseOver()}
        onMouseMove={() => this.onMouseMove()}
        onMouseLeave={() => this.onMouseLeave()}
        onKeyDown={(e) => this.onKeyDown(e)}>
        {props.children}
      </div>
    )
  }
}

export default Shell;
