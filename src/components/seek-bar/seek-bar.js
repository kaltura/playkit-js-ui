//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import reduce from '../../reducers';
import * as actions from '../../actions';
import store from '../../store';
import BaseComponent from '../base';
import { toHHMMSS } from '../../utils/time-format';

@connect(reduce, bindActions(actions))
class SeekBarControl extends BaseComponent {
  _framePreviewElement: HTMLElement;
  _seekBarElement: HTMLElement;
  _playerElement: HTMLElement;
  _draggingActive: boolean;
  progressElementWidth: string;

  constructor(obj: IControlParams) {
    super({name: 'SeekBar', player: obj.player});
  }

  componentDidMount() {
    this.connectPlayerEventsToStore();
    store.subscribe(() => {
      this.setState({
        virtualProgress: store.getState().seekBar.virtualTime,
        currentTime: store.getState().currentTime,
        isDraggingActive: store.getState().seekBar.isDraggingActive
      });
    });

    this._playerElement = document.getElementsByClassName('player')[0];
    this._framePreviewElement = document.getElementsByClassName('frame-preview-img')[0];
    this._seekBarElement = document.getElementsByClassName('seek-bar')[0];

    this.player.addEventListener(this.player.Event.TIME_UPDATE, () => {
      if (this.state.isDraggingActive) return;
      this.updateSeekBarProgress(this.player.currentTime, this.player.duration);
    });
  }

  connectPlayerEventsToStore() {
    this.player.addEventListener(this.player.Event.PLAYER_STATE_CHANGED, (e) => {
      this.props.updatePlayerState({previousState: e.payload.oldState.type, currentState: e.payload.newState.type});
    });

    this.player.addEventListener(this.player.Event.TIME_UPDATE, () => {
      this.props.updateCurrentTime(this.player.currentTime);
    });

    this.player.addEventListener(this.player.Event.LOADED_METADATA, () => {
      this.props.updateDuration(this.player.duration);
    });

    this.player.addEventListener(this.player.Event.VOLUME_CHANGE, () => {
      this.props.updateVolume(this.player.volume);
    });

    this.player.addEventListener(this.player.Event.PLAY, () => {
      this.props.updateIsPlaying(true);
    });

    this.player.addEventListener(this.player.Event.PAUSE, () => {
      this.props.updateIsPlaying(false);
    });
  }

  onSeekbarClick = e => {
    let time = this.getTime(e);
    this.player.currentTime = time;
    this.updateSeekBarProgress(time, this.player.duration);
    this.logger.debug(`Seek to ${time}s`);
  }

  onSeekbarMouseDown = e => {
    if (this.state.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.player.duration);
      this.updateSeekBarProgress(time, this.player.duration, true);
    }
  }

  onSeekbarMouseMove = e => {
    if (!this.state.isDraggingActive) {
      let time = this.getTime(e);
      this.updateSeekBarProgress(time, this.player.duration, true);
    }
    this.updateFramePreview(e);
  }

  onSeekbarMouseOut = () => {
    this.updateSeekBarProgress(0, this.player.duration, true);
  }

  updateSeekBarProgress(currentTime: number, duration: number, virtual: boolean = false) {
    let width = currentTime / duration * 100;

    if (virtual) {
      this.props.updateVirtualTime(currentTime);
    }
    else {
      this.setState({
        progress: `${width}%`,
        currentTime: toHHMMSS(currentTime)
      });
    }
  }

  updateFramePreview(e: Event) {
    let time = this.player.duration * ((e.clientX - this._seekBarElement.offsetLeft - this._playerElement.offsetLeft) / this._seekBarElement.clientWidth);
    time = parseInt(time);
    let backgroundPositionX = `-${time * 160}px`;
    this._framePreviewElement.style.backgroundPositionX = backgroundPositionX;
  }

  getTime(e: Event): Number {
    let time = this.player.duration * ((e.clientX - this._seekBarElement.offsetLeft - this._playerElement.offsetLeft) / this._seekBarElement.clientWidth);
    time = parseFloat(time.toFixed(2));
    if (time < 0) return 0;
    if (time > this.player.duration) return this.player.duration;
    return time;
  }

  render() {
    return (
      <div className='seek-bar' onClick={e => this.onSeekbarClick(e)} onMouseMove={e => this.onSeekbarMouseMove(e)} onMouseDown={e => this.onSeekbarMouseDown(e)} onMouseOut={() => this.onSeekbarMouseOut()}>
        <div className='progress-bar'>
          <div className='progress' style={{width: this.state.progress}}>
            <a className='scrubber' />
          </div>
          <div className='virtual-progress' style={{width: (this.state.virtualProgress / this.player.duration * 100) + '%'}}>
            <div className='frame-preview'>
              <div className='frame-preview-img' style='background-image: url(https://fanart.tv/fanart/movies/10193/moviebackground/toy-story-3-54bab125af0f8.jpg)' />
            </div>
            <div className='time-preview'>{ toHHMMSS(this.state.virtualProgress)}</div>
          </div>
          <div className='buffered' style='width: 60%;' />
        </div>
      </div>
    )
  }

}
export default SeekBarControl;
