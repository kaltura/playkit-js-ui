//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/seekbar';
import BaseComponent from '../base';
import { toHHMMSS } from '../../utils/time-format';

const mapStateToProps = state => ({
  virtualProgress: state.seekbar.virtualTime,
  currentTime: state.seekbar.currentTime,
  duration: state.engine.duration,
  isDraggingActive: state.seekbar.draggingActive
});

@connect(mapStateToProps, bindActions(actions))
class SeekBarControl extends BaseComponent {
  _seekBarElement: HTMLElement;
  _playerElement: HTMLElement;

  constructor(obj: IControlParams) {
    super({name: 'SeekBar', player: obj.player});
  }

  componentDidMount() {
    this._playerElement = document.getElementsByClassName('player')[0];
    this._seekBarElement = document.getElementsByClassName('seek-bar')[0];

    this.setState({virtualTime: 0});

    this.player.addEventListener(this.player.Event.TIME_UPDATE, () => {
      this.props.updateCurrentTime(this.player.currentTime);
    });
  }

  onSeekbarMouseDown = e => {
    this.props.updateSeekbarDraggingStatus(true);
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.player.duration);
    }
  }

  onSeekbarMouseUp = e => {
    let time = this.getTime(e);
    this.player.currentTime = time;
    this.updateSeekBarProgress(time, this.player.duration);
    this.props.updateSeekbarDraggingStatus(false);
    this.logger.debug(`Seek to ${time}s`);
  }

  onSeekbarMouseMove = e => {
    let time = this.getTime(e);
    this.updateSeekBarProgress(time, this.player.duration, true);

    if (this.props.isDraggingActive) {
      this.updateSeekBarProgress(time, this.player.duration);
    }
  }

  updateSeekBarProgress(currentTime: number, duration: number, virtual: boolean = false) {
    if (virtual) {
      this.setState({virtualTime: currentTime});
    }
    else {
      this.props.updateCurrentTime(currentTime);
    }
  }

  getTime(e: Event): Number {
    let time = this.player.duration * ((e.clientX - this._seekBarElement.offsetLeft - this._playerElement.offsetLeft) / this._seekBarElement.clientWidth);
    time = parseFloat(time.toFixed(2));
    if (time < 0) return 0;
    if (time > this.player.duration) return this.player.duration;
    return time;
  }

  getThumbSpriteOffset() {
    return - (Math.ceil(100 * this.state.virtualTime / this.player.duration) * 160) + 'px 0px';
  }

  render(props) {
    var virtualProgressWidth = `${this.state.virtualTime / props.duration * 100}%`;
    var progressWidth = `${props.currentTime / props.duration * 100}%`;
    var framePreviewStyle = 'background-image: url(http://cfvod.kaltura.com/p/1914121/sp/191412100/thumbnail/entry_id/1_umer46fd/version/100001/width/160/vid_slices/100); ';
    framePreviewStyle += `background-position: ${this.getThumbSpriteOffset()}`

    return (
      <div className='seek-bar' role='slider'
        aria-label='Seek slider' aria-valuemin='0' aria-valuemax={Math.round(this.player.duration)} aria-valuenow={Math.round(this.player.currentTime)}
        aria-valuetext={`${toHHMMSS(this.player.currentTime)} of ${toHHMMSS(this.player.duration)}`}
        onMouseMove={e => this.onSeekbarMouseMove(e)} onMouseDown={e => this.onSeekbarMouseDown(e)} onMouseUp={e => this.onSeekbarMouseUp(e)}>
        <div className='progress-bar'>
          <div className='progress' style={{width: progressWidth}}>
            <a className='scrubber' />
          </div>
          <div className='virtual-progress' style={{width: virtualProgressWidth}}>
            {
              props.showFramePreview ?
                (<div className='frame-preview'>
                  <div className='frame-preview-img' style={framePreviewStyle} />
                </div>) : ''
            }
            { this.props.showTimeBubble ? <div className='time-preview'>{ toHHMMSS(this.state.virtualTime)}</div> : '' }
          </div>
          <div className='buffered' style='width: 60%;' />
        </div>
      </div>
    )
  }

}
export default SeekBarControl;
