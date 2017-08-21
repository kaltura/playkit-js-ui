//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/volume';
import BaseComponent from '../base';
import { default as Icon, IconType } from '../icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isDraggingActive: state.volume.draggingActive,
  volume: state.volume.volume,
  muted: state.volume.muted,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
/**
 * VolumeControl component
 *
 * @class VolumeControl
 * @extends {BaseComponent}
 */
class VolumeControl extends BaseComponent {
  _volumeControlElement: HTMLElement;
  _volumeProgressBarElement: HTMLElement;

  /**
   * Creates an instance of VolumeControl.
   * @param {Object} obj obj
   * @memberof VolumeControl
   */
  constructor(obj: Object) {
    super({name: 'Volume', player: obj.player});
  }

  /**
   * after component mounted, update initial volume and muted value and listen to volume change
   *
   * @returns {void}
   * @memberof VolumeControl
   */
  componentDidMount() {
    this.player.addEventListener(this.player.Event.LOADED_METADATA, () => {
      this.props.updateVolume(this.player.volume);
      this.props.updateMuted(this.player.muted);
    })

    this.player.addEventListener(this.player.Event.VOLUME_CHANGE, () => {
      this.props.updateVolume(this.player.volume);
    });
  }

  /**
   * get the volume progress bar height percentage string
   *
   * @returns {string} - volume progress bar new height based on volume
   * @memberof VolumeControl
   */
  getVolumeProgessHeight(): string {
    return this.props.muted ? '0%' : Math.round(this.props.volume * 100) + '%';
  }

  /**
   * on volume progress bar mouse down, update volume dragging status in store state
   *
   * @returns {void}
   * @memberof VolumeControl
   */
  onVolumeProgressBarMouseDown(): void {
    this.props.updateVolumeDraggingStatus(true);
  }

  /**
   * on volume progress bar mouse move, update the volume if dragging is active
   *
   * @param {Event} e - mouse move event
   * @returns {void}
   * @memberof VolumeControl
   */
  onVolumeProgressBarMouseMove(e: Event): void {
    if (this.props.isDraggingActive) {
      this.changeVolume(e);
    }
  }

  /**
   * on volume progress bar mouse up, update the volume and change the dragging status to false
   *
   * @param {Event} e - mouse up event
   * @returns {void}
   * @memberof VolumeControl
   */
  onVolumeProgressBarMouseUp(e: Event): void {
    this.props.updateVolumeDraggingStatus(false);
    this.changeVolume(e);
  }

  /**
   * on colume control button click, toggle mute in player and store state
   *
   * @returns {void}
   * @memberof VolumeControl
   */
  onVolumeControlButtonClick(): void {
    this.logger.debug(`Toggle mute. ${this.player.muted} => ${!this.player.muted}`);
    this.props.updateMuted(!this.props.muted);
    this.player.muted = !this.player.muted;
  }

  /**
   * change volume based on event mouse position compared to volume progress bar element
   * if muted value is true in store state, change it to false both in store state and in player instance.
   *
   * @param {Event} e - event to get the position from
   * @returns {void}
   * @memberof VolumeControl
   */
  changeVolume(e: Event): void {
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

  /**
   * get element cordinates
   *
   * @param {HTMLElement} el element to inspect
   * @returns {{top: number, left: number}} object with the top and left position
   * @memberof VolumeControl
   */
  getCoords(el: HTMLElement): {top: number, left: number} {
    let box = el.getBoundingClientRect();

    return {
      top: box.top,
      left: box.left
    }
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof VolumeControl
   */
  render(): React$Element<any> {
      var controlButtonClass = 'control-button-container volume-control';
      if (this.props.isDraggingActive) controlButtonClass += ' dragging-active';
      if (this.props.muted || this.props.volume === 0) controlButtonClass += ' is-muted';

      return (
        <div ref={c => this._volumeControlElement=c} className={controlButtonClass}>
          <button className='control-button' onClick={() => this.onVolumeControlButtonClick()} aria-label='Volume'>
            <Icon type={IconType.VolumeBase} />
            <Icon type={IconType.VolumeWaves} />
            <Icon type={IconType.VolumeMute} />
          </button>
          <div className='volume-control-bar' role='slider'
            aria-valuemin='0' aria-valuemaz='100' aria-valuenow={this.player.volume * 100}
            aria-valuetext={`${this.player.volume * 100}% volume ${this.player.muted ? 'muted' : ''}`}>
            <div
              className='bar'
              ref={c => this._volumeProgressBarElement=c}
              onMouseDown={() => this.onVolumeProgressBarMouseDown()}
              onMouseUp={e => this.onVolumeProgressBarMouseUp(e)}
              onMouseMove={e => this.onVolumeProgressBarMouseMove(e)}
            >
              <div className='progress' style={{height: this.getVolumeProgessHeight()}} />
            </div>
          </div>
        </div>
      )
  }
}

export default VolumeControl;
