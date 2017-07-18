//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/volume';
import BaseComponent from '../base';
import Icon from '../icon';

const mapStateToProps = state => ({
  isDraggingActive: state.volume.isDraggingActive,
  volume: state.volume.volume,
  muted: state.volume.muted,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
class VolumeControl extends BaseComponent {
  _volumeControlElement: HTMLElement;
  _volumeProgressBarElement: HTMLElement;

  constructor(obj: Object) {
    super({name: 'Volume', player: obj.player});
  }

  componentDidMount() {

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

  onVolumeControlButtonFocus() {
    this.setState({focus: true});
  }

  onVolumeControlButtonBlur() {
    this.setState({focus: false});
  }

  onVolumeProgressBarKeyDown(e: Event) {
    let newVolume;
    switch(e.which) {
      case 38: // up
      this.logger.debug("Keydown up");
      newVolume = Math.round(this.player.volume * 100) + 5;
      this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
      if (this.player.muted) {
        this.player.muted = false;
      }
      this.player.volume = newVolume / 100;
      break;

      case 40: // down
      this.logger.debug("Keydown down");
      newVolume = Math.round(this.player.volume * 100) - 5;
      if (newVolume < 5) {
        this.player.muted = true;
        return;
      }
      this.logger.debug(`Changing volume. ${this.player.volume} => ${newVolume}`);
      this.player.volume = newVolume / 100;
      break;
    }
  }

  changeVolume(e: Event) {
    let barHeight = this._volumeProgressBarElement.clientHeight;
    let topY = this.getCoords(this._volumeProgressBarElement).top;
    let clickY = (e: any).clientY;
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
      top: box.top,
      left: box.left
    }
  }

  render() {
      var controlButtonClass = 'control-button-container volume-control';
      if (this.props.isDraggingActive) controlButtonClass += ' dragging-active';
      if (this.state.focus) controlButtonClass += ' focus';
      if (this.props.muted || this.props.volume === 0) controlButtonClass += ' is-muted';

      return (
        <div
          ref={c => this._volumeControlElement=c}
          className={controlButtonClass}
        >
          <button
            className='control-button'
            tabIndex='0'
            aria-label='Volume'
            onClick={() => this.onVolumeControlButtonClick()}
            onFocus={() => this.onVolumeControlButtonFocus()}
            onBlur={() => this.onVolumeControlButtonBlur()}
          >
            <Icon type='volume-base' />
            <Icon type='volume-waves' />
            <Icon type='volume-mute' />
          </button>
          <div
            className='volume-control-bar' role='slider'
            aria-valuemin='0' aria-valuemaz='100' aria-valuenow={this.player.volume * 100}
            aria-valuetext={`${this.player.volume * 100}% volume ${this.player.muted ? 'muted' : ''}`}>
            <div
              className='bar'
              ref={c => this._volumeProgressBarElement=c}
              tabIndex='0'
              onFocus={() => this.onVolumeControlButtonFocus()}
              onBlur={() => this.onVolumeControlButtonBlur()}
              onMouseDown={() => this.onVolumeProgressBarMouseDown()}
              onClick={e => this.onVolumeProgressBarClick(e)}
              onKeyDown={e => this.onVolumeProgressBarKeyDown(e)}
            >
              <div className='progress' style={{height: this.getVolumeProgessHeight()}} />
            </div>
          </div>
        </div>
      )
  }
}

export default VolumeControl;
