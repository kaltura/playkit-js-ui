//@flow
import style from './_seekbar.scss';
import {h, Component} from 'preact';
import {toHHMMSS} from '../../utils/time-format';

/**
 * SeekBarControl component
 *
 * @class SeekBarControl
 * @example <SeekBarControl
 *  playerElement={this.player.getView().parentElement}
 *  showFramePreview={this.props.showFramePreview}
 *  showTimeBubble={this.props.showTimeBubble}
 *  changeCurrentTime={time => this.player.currentTime = time}
 *  thumbsSprite={this.config.thumbsSprite}
 *  thumbsSlices={this.config.thumbsSlices}
 *  thumbsWidth={this.config.thumbsWidth}
 *  updateSeekbarDraggingStatus={data => this.props.updateSeekbarDraggingStatus(data)}
 *  updateCurrentTime={data => this.props.updateCurrentTime(data)}
 *  currentTime={this.props.currentTime}
 *  duration={this.props.duration}
 *  isDraggingActive={this.props.isDraggingActive}
 *  isMobile={this.props.isMobile}
 * />
 * @extends {Component}
 */
class SeekBarControl extends Component {
  state: Object;
  _seekBarElement: HTMLElement;
  _framePreviewElement: HTMLElement;
  _timeBubbleElement: HTMLElement;
  _movex: number;
  framePreviewImg: string;

  /**
   * before component mounted, set initial state
   *
   * @returns {void}
   * @memberof SeekBarControl
   */
  componentWillMount() {
    this.setState({virtualTime: 0});

  }

  /**
   * on component mount, bind mouseup and mousemove events to top player element
   *
   * @returns {void}
   * @memberof SeekBarControl
   */
  componentDidMount() {
    document.addEventListener('mouseup', (e: Event) => {
      this.onPlayerMouseUp(e);
    });

    document.addEventListener('mousemove', (e: Event) => {
      this.onPlayerMouseMove(e);
    });
  }

  /**
   * seekbar mouse down handler
   *
   * @param {Event} e - mouse down event
   * @returns {void}
   * @memberof SeekBarControl
   */
  onSeekbarMouseDown(e: Event): void {
    if (this.props.isMobile) return;

    this.props.updateSeekbarDraggingStatus(true);
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.props.duration);
    }
  }

  /**
   * onTap event handler
   *
   * @param {Event} e - onClick event
   * @returns {void}
   * @memberof SeekBarControl
   */
  onTap(e: Event): void {
    if (!this.props.isMobile) return;

    let time = this.getTime(e);
    this.props.changeCurrentTime(time);
    this.updateSeekBarProgress(time, this.props.duration);
    this.props.updateSeekbarDraggingStatus(false);
  }

  /**
   * player mouse up handler for seekbar porpuses
   *
   * @param {Event} e - mouse up event
   * @returns {void}
   * @memberof SeekBarControl
   */
  onPlayerMouseUp(e: Event): void {
    if (this.props.isMobile) return;

    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.props.changeCurrentTime(time);
      this.updateSeekBarProgress(time, this.props.duration);
      this.props.updateSeekbarDraggingStatus(false);
    }
  }

  /**
   * player mouse move handler for seekbar porpuses
   *
   * @param {Event} e - mouse move event
   * @returns {void}
   * @memberof SeekBarControl
   */
  onPlayerMouseMove(e: Event): void {
    if (this.props.isMobile) return;

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
   * @memberof SeekBarControl
   */
  onSeekbarMouseMove(e: Event): void {
    if (this.props.isMobile) return;

    let time = this.getTime(e);
    this.updateSeekBarProgress(time, this.props.duration, true);
  }

  /**
   * seekbar touch start handler
   *
   * @param {Event} e - touch start event
   * @returns {void}
   * @memberof SeekBarControl
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
   * @memberof SeekBarControl
   */
  onSeekbarTouchMove(e: Event): void {
    let time = this.getTime(e);
    this._movex = time;
    this.updateSeekBarProgress(time, this.props.duration, true);

    if (this.props.isDraggingActive) {
      this.updateSeekBarProgress(time, this.props.duration);
    }
  }

  /**
   * seekbar touch end handler
   *
   * @returns {void}
   * @memberof SeekBarControl
   */
  onSeekbarTouchEnd(): void {
    if (this.props.isDraggingActive) {
      let time = this._movex;
      this.props.changeCurrentTime(time);
      this.updateSeekBarProgress(time, this.props.duration);
    }
    this.props.updateSeekbarDraggingStatus(false);
  }

  /**
   * abstract function to update virtual progress ui using component state or report to upper component of time change
   *
   * @param {number} currentTime - current time
   * @param {number} duration - duration
   * @param {boolean} [virtual=false] - virtual relates to the hover seekbar position
   * @returns {void}
   * @memberof SeekBarControl
   */
  updateSeekBarProgress(currentTime: number, duration: number, virtual: boolean = false): void {
    if (virtual) {
      this.setState({virtualTime: currentTime});
    }
    else {
      this.props.updateCurrentTime(currentTime);
    }
  }

  /**
   * utility function to get element offset from window
   *
   * @param {*} element - element to get the offset for
   * @returns {{ top: number, left: number }} - object with offset in both asixs
   * @memberof SeekBarControl
   */
  getOffset(element: any): { top: number, left: number } {
    var _x = 0;
    var _y = 0;
    while (element && !isNaN(element.offsetLeft) && !isNaN(element.offsetTop)) {
      _x += element.offsetLeft - element.scrollLeft;
      _y += element.offsetTop - element.scrollTop;
      element = element.offsetParent;
    }
    return {top: _y, left: _x};
  }

  /**
   * get current time based on position of the mouseEvent on the seekbar
   *
   * @param {*} e - event
   * @returns {number} - current time in seconds
   * @memberof SeekBarControl
   */
  getTime(e: any): number {
    let xPosition = e.touches ? e.touches[0].clientX : e.clientX;
    let time = this.props.duration * ((xPosition - this._seekBarElement.offsetLeft - this.getOffset(this.props.playerElement).left) / this._seekBarElement.clientWidth);
    time = parseFloat(time.toFixed(2));
    if (time < 0) return 0;
    if (time > this.props.duration) return this.props.duration;
    return time;
  }

  /**
   * utility function to get the thumb sprite background position
   *
   * @returns {string} background-position string value
   * @memberof SeekBarControl
   */
  getThumbSpriteOffset(): string {
    const percent = this.state.virtualTime / this.props.duration;
    const sliceIndex = Math.ceil(this.props.thumbsSlices * percent);
    return -(sliceIndex * this.props.thumbsWidth) + 'px 0px';
  }

  /**
   * get the left position the frame preview element should be in
   *
   * @returns {number} left position
   * @memberof SeekBarControl
   */
  getFramePreviewOffset(): number {
    if (this._seekBarElement && this._framePreviewElement) {
      let leftOffset = (this.state.virtualTime / this.props.duration * this._seekBarElement.clientWidth) - (this._framePreviewElement.clientWidth / 2);
      if (leftOffset < 0) return 0;
      else if (leftOffset > this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth) return (this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth);
      else return leftOffset;
    }
    else return 0;
  }

  /**
   * get the left position to time bubble should be in
   *
   * @returns {number} left position
   * @memberof SeekBarControl
   */
  getTimeBubbleOffset(): number {
    if (this._timeBubbleElement) {
      let leftOffset = (this.state.virtualTime / this.props.duration * this._seekBarElement.clientWidth) - (this._timeBubbleElement.clientWidth / 2);
      if (leftOffset < 0)
        return 0;
      else if (leftOffset > this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth)
        return (this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth);
      else
        return leftOffset;
    }
    else return 0;
  }

  /**
   * render frame preview
   *
   * @returns {React$Element} - component
   * @memberof SeekBarControl
   */
  renderFramePreview(): React$Element<any> | void {
    if (
      !this.props.thumbsSprite || !this.props.thumbsSlices || !this.props.thumbsWidth ||
      !this.props.showFramePreview ||
      this.props.isMobile
    ) return undefined;

    return (
      <div
        className={style.framePreview}
        style={this._getFramePreviewStyle()}
        ref={c => this._framePreviewElement = c}>
        <div
          className={style.framePreviewImg}
          style={this._getFramePreviewImgStyle()}/>
      </div>
    )
  }

  _getFramePreviewImgStyle(): string {
    let framePreviewImgStyle = `background-image: url(${this.props.thumbsSprite});`;
    framePreviewImgStyle += `background-position: ${this.getThumbSpriteOffset()};`;
    framePreviewImgStyle += `background-size: ${this.props.thumbsSlices * this.props.thumbsWidth}px 100%;`;
    return framePreviewImgStyle;
  }

  _getFramePreviewStyle(): string {
    let framePreviewStyle = `left: ${this.getFramePreviewOffset()}px;`;
    framePreviewStyle += `width: ${this.props.thumbsWidth}px;`;
    return framePreviewStyle;
  }

  /**
   * render time bubble
   *
   * @returns {React$Element} - component
   * @memberof SeekBarControl
   */
  renderTimeBubble(): React$Element<any> | void {
    if (!this.props.showTimeBubble || this.props.isMobile) return undefined;
    var timeBubbleStyle = `left: ${this.getTimeBubbleOffset()}px`;
    var timeBubbleValue = this.props.isDvr ? '-' + toHHMMSS(this.props.duration - this.state.virtualTime) : toHHMMSS(this.state.virtualTime);
    return <div className={style.timePreview} style={timeBubbleStyle}
                ref={c => this._timeBubbleElement = c}>{timeBubbleValue}</div>
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof SeekBarControl
   */
  render(props: any): React$Element<any> {
    var virtualProgressWidth = `${this.state.virtualTime / props.duration * 100}%`;
    var progressWidth = `${props.currentTime / props.duration * 100}%`;
    var seekbarStyleClass = [style.seekBar];
    if (props.adBreak) seekbarStyleClass.push(style.adBreak);
    if (props.isDvr) seekbarStyleClass.push(style.live);
    if (props.isMobile) seekbarStyleClass.push(style.hover);
    if (props.isDraggingActive) seekbarStyleClass.push(style.hover);

    return (
      <div
        className={seekbarStyleClass.join(' ')}
        ref={c => this._seekBarElement = c}
        role='slider'
        aria-label='Seek slider'
        aria-valuemin='0'
        aria-valuemax={Math.round(this.props.duration)}
        aria-valuenow={Math.round(this.props.currentTime)}
        aria-valuetext={`${toHHMMSS(this.props.currentTime)} of ${toHHMMSS(this.props.duration)}`}
        onClick={e => this.onTap(e)}
        onMouseMove={e => this.onSeekbarMouseMove(e)}
        onMouseDown={e => this.onSeekbarMouseDown(e)}
        onTouchStart={e => this.onSeekbarTouchStart(e)}
        onTouchMove={e => this.onSeekbarTouchMove(e)}
        onTouchEnd={() => this.onSeekbarTouchEnd()}
      >
        <div className={style.progressBar}>
          <div className={style.progress} style={{width: progressWidth}}>
            {
              props.adBreak ? undefined :
                <a className={style.scrubber}/>
            }
          </div>
          <div className={style.virtualProgress} style={{width: virtualProgressWidth}}/>
          {this.renderTimeBubble()}
          {this.renderFramePreview()}
          <div className={style.buffered} style='width: 60%;'/>
        </div>
      </div>
    )
  }

}

export default SeekBarControl;
