//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {toHHMMSS} from '../../utils/time-format';
import {KeyMap} from '../../utils/key-map';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions as shellActions} from '../../reducers/shell';
import {withPlayer} from '../player';
import {withKeyboardEvent} from 'components/keyboard';
import {actions as overlayIconActions} from 'reducers/overlay-action';
import {IconType} from '../icon';
import {withText} from 'preact-i18n';
import {PlayerArea} from '../player-area';
import {withEventManager} from 'event/with-event-manager';
import {FakeEvent} from 'event/fake-event';
import {SeekBarPreview} from '../seekbar-preview';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  config: state.config.components.seekbar,
  isMobile: state.shell.isMobile,
  previewHoverActive: state.seekbar.previewHoverActive,
  hidePreview: state.seekbar.hidePreview,
  hideTimeBubble: state.seekbar.hideTimeBubble
});

const COMPONENT_NAME = 'SeekBar';

/**
 * Default seek jump
 * @type {number}
 * @const
 */
const KEYBOARD_DEFAULT_SEEK_JUMP: number = 5;

/**
 * SeekBar component
 *
 * @class SeekBar
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...shellActions, ...overlayIconActions}))
@withPlayer
@withEventManager
@withKeyboardEvent(COMPONENT_NAME)
@withText({sliderAriaLabel: 'controls.seekBarSlider'})
class SeekBar extends Component {
  state: Object;
  _seekBarElement: HTMLElement;
  _framePreviewElement: HTMLElement;
  _timeBubbleElement: HTMLElement;
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.LEFT
      },
      action: event => {
        this.handleKeydown(event, false);
      }
    },
    {
      key: {
        code: KeyMap.RIGHT
      },
      action: event => {
        this.handleKeydown(event, false);
      }
    },
    {
      key: {
        code: KeyMap.HOME
      },
      action: event => {
        this.handleKeydown(event, false);
      }
    },
    {
      key: {
        code: KeyMap.END
      },
      action: event => {
        this.handleKeydown(event, false);
      }
    }
  ];

  /**
   * on component mount, bind mouseup and mousemove events to top player element
   *
   * @returns {void}
   * @memberof SeekBar
   */
  componentDidMount(): void {
    const {player, eventManager} = this.props;
    const clientRect = this._seekBarElement.getBoundingClientRect();
    this.props.updateSeekbarClientRect(clientRect);
    eventManager.listen(player, FakeEvent.Type.GUI_RESIZE, () => {
      this.setState({resizing: true});
      setTimeout(() => {
        const clientRect = this._seekBarElement.getBoundingClientRect();
        this.props.updateSeekbarClientRect(clientRect);
        this.setState({resizing: false});
      }, style.defaultTransitionTime);
    });
    document.addEventListener('mouseup', this.onPlayerMouseUp);
    document.addEventListener('mousemove', this.onPlayerMouseMove);
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  /**
   * before component unmounted, remove event listeners
   *
   * @returns {void}
   * @memberof SeekBar
   */
  componentWillUnmount(): void {
    document.removeEventListener('mouseup', this.onPlayerMouseUp);
    document.removeEventListener('mousemove', this.onPlayerMouseMove);
  }

  /**
   * seekbar mouse down handler
   *
   * @param {Event} e - mouse down event
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarMouseDown = (e: Event): void => {
    if (this.props.isMobile || this.props.previewHoverActive) {
      return;
    }
    e.preventDefault(); // fixes firefox mouseup not firing after dragging the scrubber
    this.props.updateSeekbarDraggingStatus(true);
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.props.duration);
    }
  };

  /**
   * player mouse up handler for seekbar porpuses
   *
   * @param {Event} e - mouse up event
   * @returns {void}
   * @memberof SeekBar
   */
  onPlayerMouseUp = (e: Event): void => {
    if (this.props.isMobile || this.props.previewHoverActive) {
      return;
    }
    if (this.props.isDraggingActive) {
      const oldTime = this.props.player.currentTime;
      const newTime = this.getTime(e);
      this.props.changeCurrentTime(newTime);
      this.updateSeekBarProgress(newTime, this.props.duration);
      this.props.updateSeekbarDraggingStatus(false);
      this.props.notifyChange({
        from: oldTime,
        to: newTime
      });
    }
  };

  /**
   * player mouse move handler for seekbar porpuses
   *
   * @param {Event} e - mouse move event
   * @returns {void}
   * @memberof SeekBar
   */
  onPlayerMouseMove = (e: Event): void => {
    if (this.props.isMobile) {
      return;
    }
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.props.duration);
      this.updateSeekBarProgress(time, this.props.duration, true);
    }
  };

  /**
   * seekbar mouse move handler
   *
   * @param {Event} e - mouse move event
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarMouseMove = (e: Event): void => {
    if (this.props.isMobile || this.props.previewHoverActive) {
      return;
    }
    let time = this.getTime(e);
    this.updateSeekBarProgress(time, this.props.duration, true);
  };

  /**
   * seekbar touch start handler
   *
   * @param {Event} e - touch start event
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarTouchStart = (e: Event): void => {
    this.props.updateSeekbarDraggingStatus(true);
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.props.duration);
    }
  };

  /**
   * seekbar touch move handler
   *
   * @param {Event} e - touch move event
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarTouchMove = (e: Event): void => {
    let time = this.getTime(e);
    this.updateSeekBarProgress(time, this.props.duration, true);
    if (this.props.isDraggingActive) {
      this.updateSeekBarProgress(time, this.props.duration);
    }
    e.preventDefault();
  };

  /**
   * seekbar key down handler
   *
   * @returns {void}
   * @param {KeyboardEvent} event - keyboardEvent event
   * @param {boolean} isAccessibility - accessibility handler
   * @memberof SeekBar
   */
  handleKeydown(event: KeyboardEvent, isAccessibility: boolean): void {
    const {player} = this.props;
    /**
     * Do seek operations.
     * @param {number} from - Seek start point.
     * @param {number} to - Seek end point.
     * @returns {void}
     */
    const seek = (from: number, to: number) => {
      player.currentTime = to;
      this.updateSeekBarProgress(player.currentTime, this.props.duration, true);
      this.props.notifyChange({
        from: from,
        to: to
      });
    };
    let newTime;
    this.props.updatePlayerHoverState(true);
    const basePosition = player.isLive() ? player.getStartTimeOfDvrWindow() : 0;
    const duration = player.isLive() ? player.liveDuration : player.duration;
    switch (event.keyCode) {
      case KeyMap.LEFT:
        if (!isAccessibility) {
          this.props.updateOverlayActionIcon(IconType.Rewind);
        }
        newTime = player.currentTime - KEYBOARD_DEFAULT_SEEK_JUMP > basePosition ? player.currentTime - KEYBOARD_DEFAULT_SEEK_JUMP : basePosition;
        seek(player.currentTime, newTime);
        break;
      case KeyMap.RIGHT:
        if (!isAccessibility) {
          this.props.updateOverlayActionIcon(IconType.Forward);
        }
        newTime = player.currentTime + KEYBOARD_DEFAULT_SEEK_JUMP > duration ? duration : player.currentTime + KEYBOARD_DEFAULT_SEEK_JUMP;
        seek(player.currentTime, newTime);
        break;
      case KeyMap.HOME:
        if (!isAccessibility) {
          this.props.updateOverlayActionIcon(IconType.StartOver);
        }
        newTime = basePosition;
        seek(player.currentTime, newTime);
        break;
      case KeyMap.END:
        if (!isAccessibility) {
          this.props.updateOverlayActionIcon(IconType.SeekEnd);
        }
        if (player.isLive()) {
          player.seekToLiveEdge();
        } else {
          newTime = duration;
          seek(player.currentTime, newTime);
        }
        break;
    }
  }

  /**
   * seekbar keydown accessibility handler
   *
   * @param {Event} e - mouse end event
   * @returns {void}
   * @memberof SeekBar
   */
  onKeyDown = (e: KeyboardEvent): void => {
    switch (e.keyCode) {
      case KeyMap.LEFT:
      case KeyMap.RIGHT:
        this.handleKeydown(e, true);
        break;
    }
  };

  /**
   * seekbar touch end handler
   *
   * @param {Event} e - mouse end event
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarTouchEnd = (e: Event): void => {
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      const oldTime = this.props.player.currentTime;
      const newTime = time;
      this.props.changeCurrentTime(newTime);
      this.updateSeekBarProgress(newTime, this.props.duration);
      this.props.notifyChange({
        from: oldTime,
        to: newTime
      });
    }
    this.props.updateSeekbarDraggingStatus(false);
  };

  /**
   * seekbar mouse over handler
   *
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarMouseOver = (): void => {
    if (this.props.isMobile) return;
    this.props.updateSeekbarHoverActive(true);
  };

  /**
   * seekbar mouse leave handler
   *
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarMouseLeave = (): void => {
    if (this.props.isMobile) return;
    this.props.updateSeekbarHoverActive(false);
  };

  /**
   * abstract function to update virtual progress ui using component state or report to upper component of time change
   *
   * @param {number} currentTime - current time
   * @param {number} duration - duration
   * @param {boolean} [virtual=false] - virtual relates to the hover seekbar position
   * @returns {void}
   * @memberof SeekBar
   */
  updateSeekBarProgress(currentTime: number, duration: number, virtual: boolean = false): void {
    if (virtual) {
      this.props.updateVirtualTime(currentTime);
    } else {
      this.props.updateCurrentTime(currentTime);
    }
  }

  /**
   * utility function to get element offset from window
   *
   * @param {*} element - element to get the offset for
   * @returns {{ top: number, left: number }} - object with offset in both asixs
   * @memberof SeekBar
   */
  getOffset(element: any): {top: number, left: number} {
    let _x = 0;
    let _y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      _x += element.offsetLeft - element.scrollLeft + this._getTransformX(element);
      _y += element.offsetTop - element.scrollTop;
      element = element.offsetParent;
    }
    //offset 0 is forced to handle browser compatibility issue
    if (this.props.player.isFullscreen()) {
      _x = 0;
    }
    return {top: _y, left: _x};
  }

  /**
   * calculating the transform of an element
   * @param {HTMLElement} element - the element to calculate the transform offset for
   * @returns {number} - the transform
   * @private
   */
  _getTransformX(element: HTMLElement): number {
    const computedStyle = getComputedStyle(element);
    // [scaleX(),skewY(),skewX(),scaleY(),translateX(),translateY()]
    const transform =
      computedStyle.getPropertyValue('transform') ||
      computedStyle.getPropertyValue('-webkit-transform') ||
      computedStyle.getPropertyValue('-moz-transform') ||
      computedStyle.getPropertyValue('-ms-transform') ||
      computedStyle.getPropertyValue('-o-transform');

    const transformValues = transform.match(/-?\d+/g);
    let translateXVal = 0;
    if (transformValues && transformValues.length > 0) {
      translateXVal = parseFloat(transformValues[4]);
    }
    return translateXVal;
  }

  /**
   * get current time based on position of the mouseEvent on the seekbar
   *
   * @param {*} e - event
   * @returns {number} - current time in seconds
   * @memberof SeekBar
   */
  getTime(e: any): number {
    const xPosition = typeof e.clientX === 'number' ? e.clientX : e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX;
    let time =
      this.props.duration *
      ((xPosition - this._seekBarElement.offsetLeft - this.getOffset(this.props.playerElement).left) / this._seekBarElement.clientWidth);
    time = parseFloat(time.toFixed(2));
    if (time < 0) {
      return 0;
    }
    if (time > this.props.duration) {
      return this.props.duration;
    }
    return time;
  }

  /**
   * get current buffered percent from the player
   *
   * @returns {number} - current buffered percent
   * @memberof SeekBar
   */
  getBufferedPercent(): number {
    const {player} = this.props;
    if (this.props.duration > 0 && player.buffered.length > 0) {
      const buffered = player.isLive() ? player.buffered.end(0) - player.getStartTimeOfDvrWindow() : player.buffered.end(0);
      const bufferedPercent = (buffered / this.props.duration) * 100;
      return bufferedPercent < 100 ? bufferedPercent : 100;
    }
    return 0;
  }

  /**
   * get the left position the frame preview element should be in
   *
   * @returns {number} left position
   * @memberof SeekBar
   */
  getFramePreviewOffset(): number {
    if (this._seekBarElement && this._framePreviewElement) {
      let leftOffset = (this.props.virtualTime / this.props.duration) * this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth / 2;
      if (leftOffset < 0) {
        return 0;
      } else if (leftOffset > this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth) {
        return this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth;
      } else {
        return leftOffset;
      }
    } else {
      return 0;
    }
  }

  /**
   * get the left position to time bubble should be in
   *
   * @returns {number} left position
   * @memberof SeekBar
   */
  getTimeBubbleOffset(): number {
    if (this._timeBubbleElement) {
      let leftOffset = (this.props.virtualTime / this.props.duration) * this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth / 2;
      if (leftOffset < 0) {
        return 0;
      } else if (leftOffset > this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth) {
        return this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth;
      } else {
        return leftOffset;
      }
    } else {
      return 0;
    }
  }

  /**
   * render frame preview
   *
   * @returns {React$Element} - component
   * @memberof SeekBar
   */
  renderFramePreview(): React$Element<any> | void {
    if (!this.props.showFramePreview || this.props.isMobile) return undefined;
    return (
      <div
        className={this.props.hidePreview ? [style.framePreview, style.hideFramePreview].join(' ') : style.framePreview}
        style={this._getFramePreviewStyle()}
        ref={c => (c ? (this._framePreviewElement = c) : undefined)}>
        <SeekBarPreview virtualTime={this.props.virtualTime} />
      </div>
    );
  }

  /**
   * Gets the style of the frame preview.
   * @returns {string} - The css style string.
   * @memberof SeekBar
   * @private
   */
  _getFramePreviewStyle(): string {
    return `left: ${this.getFramePreviewOffset()}px;`;
  }

  /**
   * render time bubble
   *
   * @returns {React$Element} - component
   * @memberof SeekBar
   */
  renderTimeBubble(): React$Element<any> | void {
    if (this.props.hideTimeBubble || !this.props.showTimeBubble || this.props.isMobile) return undefined;
    const timeBubbleStyle = `left: ${this.getTimeBubbleOffset()}px`;
    const timeBubbleValue = this.props.isDvr ? '-' + toHHMMSS(this.props.duration - this.props.virtualTime) : toHHMMSS(this.props.virtualTime);
    return (
      <div className={style.timePreview} style={timeBubbleStyle} ref={c => (c ? (this._timeBubbleElement = c) : undefined)}>
        {timeBubbleValue}
      </div>
    );
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @param {Object} state - component state
   * @returns {React$Element} - component
   * @memberof SeekBar
   */
  render(props: any, state: Object): React$Element<any> {
    const virtualProgressWidth = `${(props.virtualTime / props.duration) * 100}%`;
    const progressWidth = `${props.forceFullProgress ? 100 : (props.currentTime / props.duration) * 100}%`;
    const bufferedWidth = `${Math.round(this.getBufferedPercent())}%`;
    const seekbarStyleClass = [style.seekBar];
    if (props.adBreak) seekbarStyleClass.push(style.adBreak);
    if (props.isDvr) seekbarStyleClass.push(style.live);
    if (props.isMobile) seekbarStyleClass.push(style.hover);
    if (props.isDraggingActive) seekbarStyleClass.push(style.hover);
    if (state.resizing) seekbarStyleClass.push(style.resizing);

    return (
      <div
        tabIndex="0"
        className={seekbarStyleClass.join(' ')}
        ref={c => (c ? (this._seekBarElement = c) : undefined)}
        role="slider"
        aria-label={props.sliderAriaLabel}
        aria-valuemin="0"
        aria-valuemax={Math.round(this.props.duration)}
        aria-valuenow={Math.round(this.props.currentTime)}
        aria-valuetext={`${toHHMMSS(this.props.currentTime)} of ${toHHMMSS(this.props.duration)}`}
        onMouseOver={this.onSeekbarMouseOver}
        onMouseLeave={this.onSeekbarMouseLeave}
        onMouseMove={this.onSeekbarMouseMove}
        onMouseDown={this.onSeekbarMouseDown}
        onTouchStart={this.onSeekbarTouchStart}
        onTouchMove={this.onSeekbarTouchMove}
        onTouchEnd={this.onSeekbarTouchEnd}
        onKeyDown={this.onKeyDown}>
        <div className={style.progressBar}>
          <PlayerArea name={'SeekBar'} shouldUpdate={true}>
            {this.renderFramePreview()}
            {this.renderTimeBubble()}
            <div className={style.buffered} style={{width: bufferedWidth}} />
            <div className={style.progress} style={{width: progressWidth}}>
              {props.adBreak ? undefined : <a className={style.scrubber} />}
            </div>
            <div className={style.virtualProgress} style={{width: virtualProgressWidth}}>
              <div className={style.virtualProgressIndicator} />
            </div>
          </PlayerArea>
        </div>
      </div>
    );
  }
}

SeekBar.displayName = COMPONENT_NAME;
export {SeekBar};
