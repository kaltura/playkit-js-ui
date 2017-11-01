//@flow
import style from '../../styles/style.scss';
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/volume';
import Portal from 'preact-portal';
import BaseComponent from '../base';
import { default as Icon, IconType } from '../icon';
import Tooltip from '../tooltip';

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
 * @example <VolumeControl player={this.player} />
 * @extends {BaseComponent}
 */
class VolumeControl extends BaseComponent {
  _volumeControlElement: HTMLElement;
  _volumeProgressBarElement: HTMLElement;

  /**
   * Creates an instance of VolumeControl.
   *
   * @constructor
   * @param {Object} obj obj
   * @memberof VolumeControl
   */
  constructor(obj: Object) {
    super({name: 'Volume', player: obj.player});
  }

  /**
   * after component mounted, update initial volume and muted value and listen to volume change
   *
   * @method componentDidMount
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

    this.player.addEventListener(this.player.Event.MUTE_CHANGE, e => {
      this.props.updateMuted(e.payload.mute);

      // hide tooltip on user interaction
      if (!e.payload.mute && this.state.unmuteHint) {
        this.hideTooltip();
      }
    });

    this.player.addEventListener(this.player.Event.FALLBACK_TO_MUTED_AUTOPLAY, () => {
      this.setState({unmuteHint: true});
    });

    document.addEventListener('mouseup', (e: any) => this.onVolumeProgressBarMouseUp(e));
    document.addEventListener('mousemove', (e: any) => this.onVolumeProgressBarMouseMove(e));
  }

  /**
   * hide unmute tooltip
   *
   * @returns {void}
   * @memberof VolumeControl
   */
  hideTooltip(): void {
    this.setState({unmuteHint: false});
  }

  /**
   * get the volume progress bar height percentage string
   *
   * @method getVolumeProgessHeight
   * @returns {string} - volume progress bar new height based on volume
   * @memberof VolumeControl
   */
  getVolumeProgressHeight(): string {
    return this.props.muted ? '0%' : Math.round(this.props.volume * 100) + '%';
  }

  /**
   * on volume progress bar mouse down, update volume dragging status in store state
   *
   * @method onVolumeProgressBarMouseDown
   * @returns {void}
   * @memberof VolumeControl
   */
  onVolumeProgressBarMouseDown(): void {
    this.props.updateVolumeDraggingStatus(true);
  }

  /**
   * on volume progress bar mouse move, update the volume if dragging is active
   *
   * @method onVolumeProgressBarMouseMove
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
   * @method onVolumeProgressBarMouseUp
   * @param {Event} e - mouse up event
   * @returns {void}
   * @memberof VolumeControl
   */
  onVolumeProgressBarMouseUp(e: Event): void {
    if (this.props.isDraggingActive) {
      this.props.updateVolumeDraggingStatus(false);
      this.changeVolume(e);
    }
  }

  /**
   * on volume control button click, toggle mute in player and store state
   *
   * @method onVolumeControlButtonClick
   * @returns {void}
   * @memberof VolumeControl
   */
  onVolumeControlButtonClick(): void {
    this.logger.debug(`Toggle mute. ${this.player.muted} => ${!this.player.muted}`);
    this.player.muted = !this.player.muted;
  }

  /**
   * change volume based on event mouse position compared to volume progress bar element
   * if muted value is true in store state, change it to false both in store state and in player instance.
   *
   * @method changeVolume
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
    }
  }

  /**
   * get element cordinates
   *
   * @method getCoords
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
      var controlButtonClass = [style.controlButtonContainer, style.volumeControl];
      if (this.props.isDraggingActive) controlButtonClass.push(style.draggingActive);
      if (this.props.muted || this.props.volume === 0) controlButtonClass.push(style.isMuted);

      return (
        <div ref={c => this._volumeControlElement=c} className={controlButtonClass.join(' ')}>
          <button className={style.controlButton} onClick={() => this.onVolumeControlButtonClick()} aria-label='Volume'>
            <Icon type={IconType.VolumeBase} />
            <Icon type={IconType.VolumeWaves} />
            <Icon type={IconType.VolumeMute} />
          </button>
          <div className={style.volumeControlBar} role='slider'
            aria-valuemin='0' aria-valuemaz='100' aria-valuenow={this.player.volume * 100}
            aria-valuetext={`${this.player.volume * 100}% volume ${this.player.muted ? 'muted' : ''}`}>
            <div
              className={style.bar}
              ref={c => this._volumeProgressBarElement=c}
              onMouseDown={() => this.onVolumeProgressBarMouseDown()}
            >
              <div className={style.progress} style={{height: this.getVolumeProgressHeight()}} />
            </div>
          </div>
          {
            !this.state.unmuteHint ? undefined :
            (
              <Portal into="#overlay-portal">
                <a
                  className={[style.btn, style.btnDarkTransparent, style.unmuteButton].join(' ')}
                  onClick={() => this.player.muted = !this.player.muted}>
                  <div className={style.unmuteIconContainer}>
                    <Icon type={IconType.VolumeBase} />
                    <Icon type={IconType.VolumeMute} />
                  </div>
                  Unmute
                </a>
              </Portal>
            )
          }
        </div>
      )
  }
}

export default VolumeControl;
