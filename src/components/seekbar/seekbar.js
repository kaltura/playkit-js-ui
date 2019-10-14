//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {toHHMMSS} from '../../utils/time-format';
import {KeyMap} from '../../utils/key-map';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/shell';
import {KEYBOARD_DEFAULT_SEEK_JUMP} from '../keyboard/keyboard';
import {bindMethod} from '../../utils/bind-method';
import {withPlayer} from '../player';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  config: state.config.components.seekbar,
  isMobile: state.shell.isMobile
});

const COMPONENT_NAME = 'SeekBar';

@connect(
  mapStateToProps,
  bindActions(actions)
)
@withPlayer
/**
 * SeekBar component
 *
 * @class SeekBar
 * @extends {Component}
 */
class SeekBar extends Component {
  state: Object;
  onPlayerMouseUp: Function;
  onPlayerMouseMove: Function;
  _seekBarElement: HTMLElement;
  _framePreviewElement: HTMLElement;
  _timeBubbleElement: HTMLElement;
  /**
   * Creates an instance of SeekBar.
   * @memberof SeekBar
   */
  constructor() {
    super();
    this.onPlayerMouseUp = bindMethod(this, this.onPlayerMouseUp);
    this.onPlayerMouseMove = bindMethod(this, this.onPlayerMouseMove);
  }

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof SeekBar
   */
  componentWillMount(): void {
    this.setState({virtualTime: 0});
  }

  /**
   * on component mount, bind mouseup and mousemove events to top player element
   *
   * @returns {void}
   * @memberof SeekBar
   */
  componentDidMount(): void {
    document.addEventListener('mouseup', this.onPlayerMouseUp);
    document.addEventListener('mousemove', this.onPlayerMouseMove);
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
  onSeekbarMouseDown(e: Event): void {
    if (this.props.isMobile) {
      return;
    }
    e.preventDefault(); // fixes firefox mouseup not firing after dragging the scrubber
    this.props.updateSeekbarDraggingStatus(true);
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.props.duration);
    }
  }

  /**
   * player mouse up handler for seekbar porpuses
   *
   * @param {Event} e - mouse up event
   * @returns {void}
   * @memberof SeekBar
   */
  onPlayerMouseUp(e: Event): void {
    if (this.props.isMobile) {
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
  }

  /**
   * player mouse move handler for seekbar porpuses
   *
   * @param {Event} e - mouse move event
   * @returns {void}
   * @memberof SeekBar
   */
  onPlayerMouseMove(e: Event): void {
    if (this.props.isMobile) {
      return;
    }
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.props.duration);
      this.updateSeekBarProgress(time, this.props.duration, true);
    }
  }

  /**
   * seekbar mouse move handler
   *
   * @param {Event} e - mouse move event
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarMouseMove(e: Event): void {
    if (this.props.isMobile) {
      return;
    }
    let time = this.getTime(e);
    this.updateSeekBarProgress(time, this.props.duration, true);
  }

  /**
   * seekbar touch start handler
   *
   * @param {Event} e - touch start event
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarTouchStart(e: Event): void {
    this.props.updateSeekbarDraggingStatus(true);
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.props.duration);
    }
  }

  /**
   * seekbar touch move handler
   *
   * @param {Event} e - touch move event
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarTouchMove(e: Event): void {
    let time = this.getTime(e);
    this.updateSeekBarProgress(time, this.props.duration, true);
    if (this.props.isDraggingActive) {
      this.updateSeekBarProgress(time, this.props.duration);
    }
    e.preventDefault();
  }

  /**
   * seekbar key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarKeyDown(e: KeyboardEvent): void {
    if (this.props.adBreak) {
      return;
    }
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
    switch (e.keyCode) {
      case KeyMap.LEFT:
        newTime = player.currentTime - KEYBOARD_DEFAULT_SEEK_JUMP > 0 ? player.currentTime - 5 : 0;
        seek(player.currentTime, newTime);
        break;
      case KeyMap.RIGHT:
        newTime = player.currentTime + KEYBOARD_DEFAULT_SEEK_JUMP > player.duration ? player.duration : player.currentTime + 5;
        seek(player.currentTime, newTime);
        break;
    }
  }

  /**
   * seekbar touch end handler
   *
   * @param {Event} e - mouse end event
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarTouchEnd(e: Event): void {
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
  }

  /**
   * seekbar mouse over handler
   *
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarMouseOver(): void {
    if (this.props.isMobile) return;
    this.props.updateSeekbarHoverActive(true);
  }

  /**
   * seekbar mouse leave handler
   *
   * @returns {void}
   * @memberof SeekBar
   */
  onSeekbarMouseLeave(): void {
    if (this.props.isMobile) return;
    this.props.updateSeekbarHoverActive(false);
  }

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
      this.setState({virtualTime: currentTime});
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
    let xPosition = e.clientX || (e.changedTouches && e.changedTouches[0] && e.changedTouches[0].clientX);
    let time =
      this.props.duration *
      ((xPosition - this._seekBarElement.offsetLeft - this.getOffset(this.props.playerElement).left) / this._seekBarElement.clientWidth);
    time = parseFloat(time.toFixed(2));
    if (time < 0) return 0;
    if (time > this.props.duration) return this.props.duration;
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
    if (player.duration > 0 && player.buffered.length > 0) {
      const buffered = player.isLive() ? player.buffered.end(0) - player.getStartTimeOfDvrWindow() : player.buffered.end(0);
      const bufferedPercent = (buffered / player.duration) * 100;
      return bufferedPercent < 100 ? bufferedPercent : 100;
    }
    return 0;
  }

  /**
   * utility function to get the thumb sprite background position
   *
   * @returns {string} background-position string value
   * @memberof SeekBar
   */
  getThumbSpriteOffset(): string {
    const percent = this.state.virtualTime / this.props.duration;
    const sliceIndex = Math.ceil(this.props.config.thumbsSlices * percent);
    return -(sliceIndex * this.props.config.thumbsWidth) + 'px 0px';
  }

  /**
   * get the left position the frame preview element should be in
   *
   * @returns {number} left position
   * @memberof SeekBar
   */
  getFramePreviewOffset(): number {
    if (this._seekBarElement && this._framePreviewElement) {
      let leftOffset = (this.state.virtualTime / this.props.duration) * this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth / 2;
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
      let leftOffset = (this.state.virtualTime / this.props.duration) * this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth / 2;
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
    if (
      !this.props.config.thumbsSprite ||
      !this.props.config.thumbsSlices ||
      !this.props.config.thumbsWidth ||
      !this.props.showFramePreview ||
      this.props.isMobile
    )
      return undefined;

    return (
      <div className={style.framePreview} style={this._getFramePreviewStyle()} ref={c => (this._framePreviewElement = c)}>
        <div className={style.framePreviewImg} style={this._getFramePreviewImgStyle()} />
      </div>
    );
  }

  /**
   * Gets the style of the frame preview image.
   * @returns {string} - The css style string.
   * @memberof SeekBar
   * @private
   */
  _getFramePreviewImgStyle(): string {
    let framePreviewImgStyle = `background-image: url(${this.props.config.thumbsSprite});`;
    framePreviewImgStyle += `background-position: ${this.getThumbSpriteOffset()};`;
    framePreviewImgStyle += `background-size: ${this.props.config.thumbsSlices * this.props.config.thumbsWidth}px 100%;`;
    return framePreviewImgStyle;
  }

  /**
   * Gets the style of the frame preview.
   * @returns {string} - The css style string.
   * @memberof SeekBar
   * @private
   */
  _getFramePreviewStyle(): string {
    let framePreviewStyle = `left: ${this.getFramePreviewOffset()}px;`;
    framePreviewStyle += `width: ${this.props.config.thumbsWidth}px;`;
    return framePreviewStyle;
  }

  /**
   * render time bubble
   *
   * @returns {React$Element} - component
   * @memberof SeekBar
   */
  renderTimeBubble(): React$Element<any> | void {
    if (!this.props.showTimeBubble || this.props.isMobile) return undefined;
    const timeBubbleStyle = `left: ${this.getTimeBubbleOffset()}px`;
    const timeBubbleValue = this.props.isDvr ? '-' + toHHMMSS(this.props.duration - this.state.virtualTime) : toHHMMSS(this.state.virtualTime);
    return (
      <div className={style.timePreview} style={timeBubbleStyle} ref={c => (this._timeBubbleElement = c)}>
        {timeBubbleValue}
      </div>
    );
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof SeekBar
   */
  render(props: any): React$Element<any> {
    const virtualProgressWidth = `${(this.state.virtualTime / props.duration) * 100}%`;
    const progressWidth = `${(props.currentTime / props.duration) * 100}%`;
    const bufferedWidth = `${Math.round(this.getBufferedPercent())}%`;
    const seekbarStyleClass = [style.seekBar];
    if (props.adBreak) seekbarStyleClass.push(style.adBreak);
    if (props.isDvr) seekbarStyleClass.push(style.live);
    if (props.isMobile) seekbarStyleClass.push(style.hover);
    if (props.isDraggingActive) seekbarStyleClass.push(style.hover);

    return (
      <div
        tabIndex="0"
        className={seekbarStyleClass.join(' ')}
        ref={c => (this._seekBarElement = c)}
        role="slider"
        aria-label="Seek slider"
        aria-valuemin="0"
        aria-valuemax={Math.round(this.props.duration)}
        aria-valuenow={Math.round(this.props.currentTime)}
        aria-valuetext={`${toHHMMSS(this.props.currentTime)} of ${toHHMMSS(this.props.duration)}`}
        onMouseOver={() => this.onSeekbarMouseOver()}
        onMouseLeave={() => this.onSeekbarMouseLeave()}
        onMouseMove={e => this.onSeekbarMouseMove(e)}
        onMouseDown={e => this.onSeekbarMouseDown(e)}
        onTouchStart={e => this.onSeekbarTouchStart(e)}
        onTouchMove={e => this.onSeekbarTouchMove(e)}
        onTouchEnd={e => this.onSeekbarTouchEnd(e)}
        onKeyDown={e => this.onSeekbarKeyDown(e)}>
        <div className={style.progressBar}>
          {this.renderFramePreview()}
          {this.renderTimeBubble()}
          <div className={style.virtualProgress} style={{width: virtualProgressWidth}} />
          <div className={style.buffered} style={{width: bufferedWidth}} />
          <div className={style.progress} style={{width: progressWidth}}>
            {props.adBreak ? undefined : <a className={style.scrubber} />}
          </div>
        </div>
      </div>
    );
  }
}

SeekBar.displayName = COMPONENT_NAME;
export {SeekBar};
