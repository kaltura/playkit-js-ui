//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/volume';
import BaseComponent from '../base';

const mapStateToProps = state => ({
  isDraggingActive: state.volume.isDraggingActive,
  volume: state.volume.volume,
  muted: state.volume.muted
});

@connect(mapStateToProps, bindActions(actions))
class VolumeControl extends BaseComponent {
  _volumeControlElement: HTMLElement;
  _volumeProgressBarElement: HTMLElement;
  _playerElement: HTMLElement;

  constructor(obj: IControlParams) {
    super({name: 'Volume', player: obj.player});
  }

  componentDidMount() {
    this._playerElement = document.getElementsByClassName('player')[0];
    this._volumeControlElement = document.getElementsByClassName('volume-control')[0];
    this._volumeProgressBarElement = this._volumeControlElement.getElementsByClassName('bar')[0];

    this.player.addEventListener(this.player.Event.LOADED_METADATA, () => {
      this.props.updateVolume(this.player.volume);
    })

    this.player.addEventListener(this.player.Event.VOLUME_CHANGE, () => {
      this.props.updateVolume(this.player.volume);
    });

    this._playerElement.addEventListener('mousemove', (e) => {
      if (this.props.isDraggingActive) {
        this.changeVolume(e);
      }
    });

    this._playerElement.addEventListener('mouseup', (e) => {
      if (this.props.isDraggingActive) {
        this.changeVolume(e);
        this.props.updateVolumeDraggingStatus(false);
      }
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
            <svg viewBox='0 0 1024 1024'>
              <path d='M224 352l234.504-156.336c29.545-19.697 53.496-7.194 53.496 28.053v576.566c0 35.19-24.059 47.677-53.496 28.053l-234.504-156.336h-127.906c-17.725 0-32.094-14.581-32.094-31.853v-256.295c0-17.592 14.012-31.853 32.094-31.853h127.906zM288 637.748l160 106.667v-464.83l-160 106.667v251.496zM128 416v192h96v-192h-96z' />
            </svg>
            <svg className='volume-waves' viewBox='0 0 1024 1024'>
              <path d='M802.017 837.177c82.359-86.627 129.183-201.774 129.183-324.26 0-123.976-47.976-240.409-132.127-327.329-12.293-12.697-32.552-13.025-45.249-0.732s-13.025 32.552-0.732 45.249c72.692 75.084 114.109 175.597 114.109 282.812 0 105.928-40.422 205.331-111.566 280.162-12.177 12.808-11.666 33.063 1.143 45.24s33.063 11.666 45.24-1.143z' />
              <path d='M667.436 743.221c67.761-60.884 107.273-147.888 107.273-241.233 0-87.318-34.552-169.203-94.836-229.446-12.501-12.493-32.762-12.486-45.255 0.015s-12.486 32.762 0.015 45.255c48.375 48.342 76.075 113.989 76.075 184.176 0 75.021-31.679 144.776-86.048 193.627-13.146 11.812-14.227 32.044-2.416 45.19s32.044 14.227 45.19 2.416z' />
            </svg>
            <svg className='volume-mute' viewBox='0 0 1024 1024'>
              <path d='M768 466.745l-67.986-67.986c-12.213-12.213-32.654-12.393-45.151 0.104-12.584 12.584-12.543 32.711-0.104 45.151l67.986 67.986-67.986 67.986c-12.213 12.213-12.393 32.654 0.104 45.151 12.584 12.584 32.711 12.543 45.151 0.104l67.986-67.986 67.986 67.986c12.213 12.213 32.654 12.393 45.151-0.104 12.584-12.584 12.543-32.711 0.104-45.151l-67.986-67.986 67.986-67.986c12.213-12.213 12.393-32.654-0.104-45.151-12.584-12.584-32.711-12.543-45.151-0.104l-67.986 67.986z' />
            </svg>
          </button>
          <div className='volume-control-bar'>
            <div className='bar' onMouseDown={() => this.onVolumeProgressBarMouseDown()} onClick={e => this.onVolumeProgressBarClick(e)}>
              <div className='progress' style={{height: this.getVolumeProgessHeight()}} />
            </div>
          </div>
        </div>
      )
  }
}

export default VolumeControl;
