//@flow
import {h, Component} from 'preact';
import style from '../../styles/style.scss';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/overlay-action';
import {actions as shellActions} from '../../reducers/shell';
import {default as Icon, IconType} from '../icon';
import {isPlayingAdOrPlayback} from '../../reducers/getters';
import {withPlayer} from '../player';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPlayingAdOrPlayback: isPlayingAdOrPlayback(state.engine),
  iconType: state.overlayAction.iconType,
  playerHover: state.shell.playerHover,
  isMobile: state.shell.isMobile,
  guiStyles: state.shell.layoutStyles.gui,
  isSmartContainerOpen: state.shell.smartContainerOpen,
  fullscreenConfig: state.config.components.fullscreen
});

/**
 * Default overlay action timeout
 * @type {number}
 * @const
 */
export const OVERLAY_ACTION_DEFAULT_TIMEOUT = 300;

/**
 * The buffer before
 * @type {number}
 * @const
 */
const PLAY_PAUSE_BUFFER_TIME: number = 200;

/**
 * The maximum time two click would be considered a double click
 * @type {number}
 * @const
 */
const DOUBLE_CLICK_MAX_BUFFER_TIME: number = 500;

/**
 * The maximum distance between 'pointerdown' point and 'pointerup' point to still be considered as click and not as dragging
 * @type {number}
 * @const
 */
const DRAGGING_THRESHOLD: number = 5;

const COMPONENT_NAME = 'OverlayAction';

/**
 * OverlayAction component
 *
 * @class OverlayAction
 * @example <OverlayAction />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...actions, ...shellActions}))
@withPlayer
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
class OverlayAction extends Component {
  state: Object;
  _iconTimeout: ?TimeoutID = null;
  _pointerDownPosX: number = NaN;
  _pointerDownPosY: number = NaN;
  _firstClickTime: number = 0;
  _clickTimeout: ?TimeoutID = null;

  /**
   * after component unmount, clear timeouts
   *
   * @returns {void}
   * @memberof OverlayAction
   */
  componentWillUnmount(): void {
    this.cancelClickTimeout();
    this.cancelIconTimeout();
  }

  /**
   * toggle play pause and set animation to icon change
   *
   * @returns {void}
   * @memberof OverlayAction
   */
  togglePlayPause(): void {
    if (this.props.isPlayingAdOrPlayback) {
      this.props.player.pause();
      this.props.updateOverlayActionIcon(IconType.Pause);
    } else {
      this.props.player.play();
      this.props.updateOverlayActionIcon(IconType.Play);
    }
    this.props.updatePlayerHoverState(true);
    this.props.notifyClick({
      type: 'PlayPause'
    });
  }

  /**
   * toggle exit-enter fullscreen
   *
   * @returns {void}
   * @memberof OverlayAction
   */
  toggleFullscreen(): void {
    if (!this.props.player.isFullscreen()) {
      this.props.logger.debug('Enter fullscreen');
      this.props.player.enterFullscreen();
    } else {
      this.props.logger.debug('Exit fullscreen');
      this.props.player.exitFullscreen();
    }
    this.props.notifyClick({
      type: 'Fullscreen'
    });
  }

  /**
   * Handler for overlay pointer (mouse/touch) down
   *
   * @param {*} event - mousedown/touchstart event
   * @returns {void}
   * @memberof OverlayAction
   */
  onOverlayPointerDown(event: any): void {
    this._pointerDownPosX = event.clientX || (event.changedTouches && event.changedTouches[0] && event.changedTouches[0].clientX);
    this._pointerDownPosY = event.clientY || (event.changedTouches && event.changedTouches[0] && event.changedTouches[0].clientY);
  }

  /**
   * Handler for overlay mouse up
   *
   * @param {*} event - mouseup event
   * @returns {void}
   * @memberof OverlayAction
   */
  onOverlayMouseUp(event: any): void {
    if (!this.isDragging(event)) {
      this.overlayClick();
    }
  }

  /**
   * handler for overlay touch end
   *
   * @param {*} event - touchend event
   * @returns {void}
   * @memberof OverlayAction
   */
  onOverlayTouchEnd(event: any): void {
    event.preventDefault();
    if (this.props.playerHover && !this.isDragging(event)) {
      this.togglePlayPause();
    }
  }

  /**
   * Whether the user is dragging
   *
   * @param {*} event - mouseup/touchend event
   * @returns {boolean} - is dragging
   */
  isDragging(event: any): boolean {
    const points = {
      clientX: event.clientX || (event.changedTouches && event.changedTouches[0] && event.changedTouches[0].clientX),
      clientY: event.clientY || (event.changedTouches && event.changedTouches[0] && event.changedTouches[0].clientY)
    };
    return (
      Math.abs(points.clientX - this._pointerDownPosX) > DRAGGING_THRESHOLD || Math.abs(points.clientY - this._pointerDownPosY) > DRAGGING_THRESHOLD
    );
  }

  /**
   * click action
   *
   * @returns {void}
   * @memberof OverlayAction
   */
  overlayClick(): void {
    if (this.props.isSmartContainerOpen) {
      return;
    }
    const {disableDoubleClick} = this.props.fullscreenConfig;
    if (!disableDoubleClick) {
      const now = Date.now();
      if (now - this._firstClickTime < PLAY_PAUSE_BUFFER_TIME) {
        this.cancelClickTimeout();
        this.toggleFullscreen();
        return;
      }
      if (now - this._firstClickTime < DOUBLE_CLICK_MAX_BUFFER_TIME) {
        this.cancelClickTimeout();
        this.togglePlayPause();
        this.toggleFullscreen();
        this._firstClickTime = 0;
        return;
      }

      this._firstClickTime = now;
    }
    this._clickTimeout = setTimeout(() => {
      this._clickTimeout = null;
      this.togglePlayPause();
    }, PLAY_PAUSE_BUFFER_TIME);
  }

  /**
   * cancel the clickTimeout
   *
   * @returns {void}
   * @memberof OverlayAction
   */
  cancelClickTimeout(): void {
    if (this._clickTimeout) {
      clearTimeout(this._clickTimeout);
      this._clickTimeout = null;
    }
  }

  /**
   * cancel the clickTimeout
   *
   * @returns {void}
   * @memberof OverlayAction
   */
  cancelIconTimeout(): void {
    if (this._iconTimeout) {
      clearTimeout(this._iconTimeout);
      this._iconTimeout = null;
    }
  }

  /**
   * should component update handler
   *
   * @returns {boolean} - always update component
   * @param {Object} nextProps - next props of the component
   * @memberof OverlayAction
   */
  shouldComponentUpdate(nextProps: Object): boolean {
    if (nextProps.iconType) {
      this.toggleOverlayActionIcon(nextProps.iconType);
    }
    return true;
  }

  /**
   * toggles the overlay action icon
   *
   * @param {string | Array<string>} iconType - the icon string or array of icon strings
   * @returns {void}
   * @memberof OverlayAction
   */
  toggleOverlayActionIcon(iconType: string | Array<string>): void {
    /**
     * @returns {void}
     */
    const showIcon = () => {
      this.setState({animation: true, iconType: iconType}, () => {
        this._iconTimeout = setTimeout(() => {
          this._iconTimeout = null;
          this.setState({animation: false});
        }, OVERLAY_ACTION_DEFAULT_TIMEOUT);
      });
    };
    if (this._iconTimeout !== null) {
      this.cancelIconTimeout();
      this.setState({animation: false}, () => {
        this.forceUpdate();
        showIcon();
      });
    } else {
      showIcon();
    }
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof OverlayAction
   */
  render(): React$Element<any> {
    const {guiStyles} = this.props;
    return (
      <div
        style={guiStyles}
        className={`${style.overlayAction} ${this.state.animation ? style.in : ''}`}
        onMouseDown={e => this.onOverlayPointerDown(e)}
        onTouchStart={e => this.onOverlayPointerDown(e)}
        onMouseUp={e => this.onOverlayMouseUp(e)}
        onTouchEnd={e => this.onOverlayTouchEnd(e)}>
        {this.state.animation ? this.renderIcons() : undefined}
      </div>
    );
  }

  /**
   * renders the icons
   *
   * @returns {React$Element} - icon element/s
   * @memberof OverlayAction
   */
  renderIcons(): React$Element<any> {
    if (Array.isArray(this.state.iconType)) {
      return this.state.iconType.map((i, x) => <Icon key={x} type={i} />);
    }
    return <Icon type={this.state.iconType} />;
  }

  /**
   * component did update handler
   *
   * @returns {void}
   * @memberof OverlayAction
   */
  componentDidUpdate(): void {
    if (this.state.animation) {
      this.props.updateOverlayActionIcon(null);
    }
  }
}

OverlayAction.displayName = COMPONENT_NAME;
export {OverlayAction};
