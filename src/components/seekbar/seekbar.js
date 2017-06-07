//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/seekbar';
import BaseComponent from '../base';
import { toHHMMSS } from '../../utils/time-format';

function mapStateToProps(state) {
  return {
    virtualProgress: state.seekbar.virtualTime,
    currentTime: state.engine.currentTime,
    duration: state.engine.duration,
    isDraggingActive: state.seekbar.isDraggingActive
  };
}

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

    this.player.addEventListener(this.player.Event.TIME_UPDATE, () => {
      if (this.props.isDraggingActive) return;
      this.props.updateCurrentTime(this.player.currentTime);
      this.updateSeekBarProgress(this.props.currentTime, this.player.duration);
    });
  }

  onSeekbarClick = e => {
    let time = this.getTime(e);
    this.player.currentTime = time;
    this.updateSeekBarProgress(time, this.player.duration);
    this.logger.debug(`Seek to ${time}s`);
  }

  onSeekbarMouseDown = e => {
    if (this.props.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.player.duration);
    }
  }

  onSeekbarMouseMove = e => {
    if (!this.state.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.player.duration, true);
    }
  }

  updateSeekBarProgress(currentTime: number, duration: number, virtual: boolean = false) {
    if (virtual) {
      this.props.updateVirtualTime(currentTime);
    }
  }

  getTime(e: Event): Number {
    let time = this.player.duration * ((e.clientX - this._seekBarElement.offsetLeft - this._playerElement.offsetLeft) / this._seekBarElement.clientWidth);
    time = parseFloat(time.toFixed(2));
    if (time < 0) return 0;
    if (time > this.player.duration) return this.player.duration;
    return time;
  }

  render() {
    var virtualProgressWidth = `${this.props.virtualProgress / this.props.duration * 100}%`;
    var progressWidth = `${this.props.currentTime / this.props.duration * 100}%`;

    return (
      <div className='seek-bar' onClick={e => this.onSeekbarClick(e)} onMouseMove={e => this.onSeekbarMouseMove(e)} onMouseDown={e => this.onSeekbarMouseDown(e)}>
        <div className='progress-bar'>
          <div className='progress' style={{width: progressWidth}}>
            <a className='scrubber' />
          </div>
          <div className='virtual-progress' style={{width: virtualProgressWidth}}>
            <div className='frame-preview'>
              <div className='frame-preview-img' style='background-image: url(https://fanart.tv/fanart/movies/10193/moviebackground/toy-story-3-54bab125af0f8.jpg)' />
            </div>
            <div className='time-preview'>{ toHHMMSS(this.props.virtualProgress)}</div>
          </div>
          <div className='buffered' style='width: 60%;' />
        </div>
      </div>
    )
  }

}
export default SeekBarControl;
