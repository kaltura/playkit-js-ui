//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/volume';
import BaseComponent from '../base';
import Icon from '../icon/icon';

const mapStateToProps = state => ({
  isDraggingActive: state.volume.isDraggingActive,
  volume: state.volume.volume,
  muted: state.volume.muted
});

@connect(mapStateToProps, bindActions(actions))
class VolumeControl extends BaseComponent {
  _volumeControlElement: HTMLElement;
  _volumeProgressBarElement: HTMLElement;

  constructor(obj: IControlParams) {
    super({name: 'Volume', player: obj.player});
  }

  componentDidMount() {
    this._volumeControlElement = document.getElementsByClassName('volume-control')[0];
    this._volumeProgressBarElement = this._volumeControlElement.getElementsByClassName('bar')[0];

    this.player.addEventListener(this.player.Event.LOADED_METADATA, () => {
      this.props.updateVolume(this.player.volume);
    })

    this.player.addEventListener(this.player.Event.VOLUME_CHANGE, () => {
      this.props.updateVolume(this.player.volume);
    });
  }

  getVolumeProgessHeight(): string {
    return this.props.muted ? '0%' : Math.round(this.props.volume * 100) + '%';
  }

  onVolumeProgressBarMouseDown() {
    this.props.updateVolumeDraggingStatus(true);
  }

  onVolumeProgressBarClick(e: Event) {
    this.changeVolume(e);
  }

  onVolumeControlButtonClick() {
    this.logger.debug(`Toggle mute. ${this.player.muted} => ${!this.player.muted}`);
    this.props.updateMuted(!this.props.muted);
    this.player.muted = !this.player.muted;
  }

  changeVolume(e: Event) {
    let barHeight = this._volumeProgressBarElement.clientHeight;
    let topY = this.getCoords(this._volumeProgressBarElement).top;
    let clickY = e.clientY;
    let volume = 1 - ((clickY - topY) / barHeight);
    volume = parseFloat(volume.toFixed(2));
    this.logger.debug(`Change volume from ${this.player.volume} => ${volume}`);
    this.player.volume = volume;
    if (this.props.muted) {
      this.player.muted = false;
      this.props.updateMuted(false);
    }
  }

  getCoords(el: HTMLElement): {top: number, left: number} {
    let box = el.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset
    }
  }

  render() {
      var controlButtonClass = 'control-button-container volume-control';
      if (this.props.isDraggingActive) controlButtonClass += ' dragging-active';
      if (this.props.muted || this.props.volume === 0) controlButtonClass += ' is-muted';

      return (
        <div className={controlButtonClass}>
          <button className='control-button' onClick={() => this.onVolumeControlButtonClick()} aria-label='Volume'>
            <Icon type='volume-base' />
            <Icon type='volume-waves' />
            <Icon type='volume-mute' />
          </button>
          <div className='volume-control-bar' role='slider' draggable='true'
            aria-valuemin='0' aria-valuemaz='100' aria-valuenow={this.player.volume * 100}
            aria-valuetext={`${this.player.volume * 100}% volume ${this.player.muted ? 'muted' : ''}`}>
            <div className='bar' onMouseDown={() => this.onVolumeProgressBarMouseDown()} onClick={e => this.onVolumeProgressBarClick(e)}>
              <div className='progress' style={{height: this.getVolumeProgessHeight()}} />
            </div>
          </div>
        </div>
      )
  }
}

export default VolumeControl;
