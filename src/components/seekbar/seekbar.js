//@flow
import { h, Component } from 'preact';
import { toHHMMSS } from '../../utils/time-format';

class SeekBarControl extends Component {
  state: Object;
  _seekBarElement: HTMLElement;
  _playerElement: any;
  _framePreviewElement: HTMLElement;
  _timeBubbleElement: HTMLElement;
  _movex: number;

  componentDidMount() {
    this._playerElement = document.getElementById('player-placeholder');
    this.setState({virtualTime: 0});
  }

  onSeekbarMouseDown(e: Event) {
    this.props.updateSeekbarDraggingStatus(true);
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.props.duration);
    }
  }

  onSeekbarMouseUp(e: Event) {
    let time = this.getTime(e);
    this.props.changeCurrentTime(time);
    this.updateSeekBarProgress(time, this.props.duration);
    this.props.updateSeekbarDraggingStatus(false);
  }

  onSeekbarMouseMove(e: Event) {
    let time = this.getTime(e);
    this.updateSeekBarProgress(time, this.props.duration, true);

    if (this.props.isDraggingActive) {
      this.updateSeekBarProgress(time, this.props.duration);
    }
  }

  onSeekbarTouchStart(e: Event) {
    this.props.updateSeekbarDraggingStatus(true);
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.props.duration);
    }
  }

  onSeekbarTouchMove(e: Event) {
    let time = this.getTime(e);
    this._movex = time;
    this.updateSeekBarProgress(time, this.props.duration, true);

    if (this.props.isDraggingActive) {
      this.updateSeekBarProgress(time, this.props.duration);
    }
  }

  onSeekbarTouchEnd(): void {
    let time = this._movex;
    this.props.changeCurrentTime(time);
    this.updateSeekBarProgress(time, this.props.duration);
    this.props.updateSeekbarDraggingStatus(false);
  }

  updateSeekBarProgress(currentTime: number, duration: number, virtual: boolean = false) {
    if (virtual) {
      this.setState({virtualTime: currentTime});
    }
    else {
      this.props.updateCurrentTime(currentTime);
    }
  }

  getTime(e: any): number {
    let xPosition = e.touches ? e.touches[0].clientX : e.clientX;
    let time = this.props.duration * ((xPosition - this._seekBarElement.offsetLeft - this._playerElement.offsetLeft) / this._seekBarElement.clientWidth);
    time = parseFloat(time.toFixed(2));
    if (time < 0) return 0;
    if (time > this.props.duration) return this.props.duration;
    return time;
  }

  getThumbSpriteOffset(): string {
    return - (Math.ceil(100 * this.state.virtualTime / this.props.duration) * 160) + 'px 0px';
  }

  getFramePreviewOffset(): number {
    if (this._seekBarElement) {
      let leftOffset = (this.state.virtualTime / this.props.duration * this._seekBarElement.clientWidth) - (this._framePreviewElement.clientWidth / 2);
      if (leftOffset < 0) return 0;
      else if (leftOffset > this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth) return (this._seekBarElement.clientWidth - this._framePreviewElement.clientWidth);
      else return leftOffset;
    }
    else return 0;
  }

  getTimeBubbleOffset(): number {
    if (this._timeBubbleElement) {
      let leftOffset = (this.state.virtualTime / this.props.duration * this._seekBarElement.clientWidth) - (this._timeBubbleElement.clientWidth / 2);
      if (leftOffset < 0) return 0;
      else if (leftOffset > this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth) return (this._seekBarElement.clientWidth - this._timeBubbleElement.clientWidth);
      else return leftOffset;
    }
    else return 0;
  }

  renderFramePreview() {
    if (!this.props.showFramePreview || this.props.isMobile) return undefined;
    var framePreviewStyle = `left: ${this.getFramePreviewOffset()}px`;
    var framePreviewImgStyle = 'background-image: url(http://cfvod.kaltura.com/p/1914121/sp/191412100/thumbnail/entry_id/1_umer46fd/version/100001/width/160/vid_slices/100); ';
    framePreviewImgStyle += `background-position: ${this.getThumbSpriteOffset()}`

    return (
      <div
        className='frame-preview'
        style={framePreviewStyle}
        ref={c => this._framePreviewElement=c}
      >
        <div className='frame-preview-img' style={framePreviewImgStyle} />
      </div>)
  }

  renderTimeBubble() {
    if (!this.props.showTimeBubble || this.props.isMobile) return undefined;
    var timeBubbleStyle = `left: ${this.getTimeBubbleOffset()}px`;
    return <div className='time-preview' style={timeBubbleStyle} ref={c => this._timeBubbleElement=c}>{ toHHMMSS(this.state.virtualTime)}</div>
  }

  render(props: any) {
    var virtualProgressWidth = `${this.state.virtualTime / props.duration * 100}%`;
    var progressWidth = `${props.currentTime / props.duration * 100}%`;

    return (
      <div
        className='seek-bar'
        ref={c => this._seekBarElement=c}
        role='slider'
        aria-label='Seek slider'
        aria-valuemin='0'
        aria-valuemax={Math.round(this.props.duration)}
        aria-valuenow={Math.round(this.props.currentTime)}
        aria-valuetext={`${toHHMMSS(this.props.currentTime)} of ${toHHMMSS(this.props.duration)}`}
        onMouseMove={e => this.onSeekbarMouseMove(e)}
        onMouseDown={e => this.onSeekbarMouseDown(e)}
        onMouseUp={e => this.onSeekbarMouseUp(e)}
        onTouchStart={e => this.onSeekbarTouchStart(e)}
        onTouchMove={e => this.onSeekbarTouchMove(e)}
        onTouchEnd={() => this.onSeekbarTouchEnd()}
      >
        <div className='progress-bar'>
          <div className='progress' style={{width: progressWidth}}>
            <a className='scrubber' />
          </div>
          <div className='virtual-progress' style={{width: virtualProgressWidth}} />
          {this.renderTimeBubble()}
          {this.renderFramePreview()}
          <div className='buffered' style='width: 60%;' />
        </div>
      </div>
    )
  }

}
export default SeekBarControl;
