//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/volume';
import {actions as engineActions} from '../../reducers/engine';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {FakeEvent} from '../../event/fake-event';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {withLogger} from 'components/logger';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withText} from 'preact-i18n';
import {withKeyboardEvent} from 'components/keyboard';
import {actions as overlayIconActions} from 'reducers/overlay-action';
import {Tooltip} from 'components/tooltip';
import {ToolTipType} from 'components/tooltip/tooltip';
import {Button} from 'components/button';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isDraggingActive: state.volume.draggingActive,
  volume: state.engine.volume,
  muted: state.engine.muted,
  isMobile: state.shell.isMobile
});

const COMPONENT_NAME = 'Volume';

/**
 * Default volume jump
 * @type {number}
 * @const
 */
const KEYBOARD_DEFAULT_VOLUME_JUMP: number = 5;

@connect(mapStateToProps, bindActions({...actions, ...engineActions, ...overlayIconActions}))
@withPlayer
@withEventManager
@withKeyboardEvent(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({
  muteAriaLabel: 'controls.mute',
  unmuteAriaLabel: 'controls.unmute'
})

/**
 * Volume component
 *
 * @class Volume
 * @example <Volume />
 * @extends {Component}
 */
class Volume extends Component {
  _volumeControlElement: HTMLElement;
  _volumeProgressBarElement: HTMLElement;
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.UP
      },
      action: event => {
        this.handleKeydown(event, false);
      }
    },
    {
      key: {
        code: KeyMap.DOWN
      },
      action: event => {
        this.handleKeydown(event, false);
      }
    },
    {
      key: {
        code: KeyMap.M
      },
      action: event => {
        this.handleKeydown(event, false);
      }
    }
  ];

  /**
   * after component mounted, update initial volume and muted value and listen to volume change
   *
   * @method componentDidMount
   * @returns {void}
   * @memberof Volume
   */
  componentDidMount(): void {
    const {player} = this.props;
    this.props.eventManager.listen(player, player.Event.LOADED_METADATA, () => {
      this.props.updateVolume(player.volume);
      this.props.updateMuted(player.muted);
    });
    this.props.eventManager.listen(player, player.Event.VOLUME_CHANGE, () => {
      this.props.updateMuted(player.muted);
      this.props.updateVolume(player.volume);
    });
    this.props.eventManager.listen(document, 'mouseup', e => this.onVolumeProgressBarMouseUp(e));
    this.props.eventManager.listen(document, 'mousemove', e => this.onVolumeProgressBarMouseMove(e));
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  /**
   * get the volume progress bar height percentage string
   *
   * @method getVolumeProgessHeight
   * @returns {string} - volume progress bar new height based on volume
   * @memberof Volume
   */
  getVolumeProgressHeight(): string {
    return this.props.muted ? '0%' : Math.round(this.props.volume * 100) + '%';
  }

  /**
   * on volume progress bar mouse down, update volume dragging status in store state
   *
   * @method onVolumeProgressBarMouseDown
   * @returns {void}
   * @memberof Volume
   */
  onVolumeProgressBarMouseDown(): void {
    this.props.updateVolumeDraggingStatus(true);
  }

  /**
   * on volume progress bar mouse move, update the volume if dragging is active
   *
   * @method onVolumeProgressBarMouseMove
   * @param {FakeEvent} e - mouse move event
   * @returns {void}
   * @memberof Volume
   */
  onVolumeProgressBarMouseMove(e: FakeEvent): void {
    if (this.props.isDraggingActive) {
      this.changeVolume(e);
    }
  }

  /**
   * volume mouse over handler
   *
   * @returns {void}
   * @memberof Volume
   */
  onMouseOver(): void {
    if (this.props.isMobile) return;
    this.props.updateVolumeHover(true);
    this.setState({hover: true});
  }

  /**
   * volume mouse over handler
   *
   * @returns {void}
   * @memberof Volume
   */
  onMouseOut(): void {
    if (this.props.isMobile) return;
    this.props.updateVolumeHover(false);
    this.setState({hover: false});
  }

  /**
   * on volume control key down, update the volume in case of up/down keys
   *
   * @method handleKeydown
   * @param {KeyboardEvent} event - keyboardEvent event
   * @param {boolean} isAccessabilityHandler - accessability handler
   * @returns {void}
   * @memberof Volume
   */
  handleKeydown(event: KeyboardEvent, isAccessabilityHandler: boolean): void {
    const {player} = this.props;
    /**
     * Change volume operations.
     * @param {number} newVolume - The new volume.
     * @returns {void}
     */
    const changeVolume = (newVolume: number) => {
      if (newVolume === player.volume || newVolume > 100 || newVolume < 0) {
        return;
      }
      player.muted = newVolume < KEYBOARD_DEFAULT_VOLUME_JUMP;
      player.volume = newVolume / 100;
      this.props.notifyChange({volume: player.volume});
    };
    let newVolume;
    switch (event.keyCode) {
      case KeyMap.UP:
        if (isAccessabilityHandler) {
          this.setState({hover: true});
        } else {
          this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves]);
        }
        newVolume = Math.min(Math.round(player.volume * 100) + KEYBOARD_DEFAULT_VOLUME_JUMP, 100);
        changeVolume(newVolume);
        break;
      case KeyMap.DOWN:
        newVolume = Math.max(Math.round(player.volume * 100) - KEYBOARD_DEFAULT_VOLUME_JUMP, 0);
        if (isAccessabilityHandler) {
          this.setState({hover: true});
        } else {
          newVolume === 0
            ? this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute])
            : this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWave]);
        }
        changeVolume(newVolume);
        break;
      case KeyMap.M:
        if (!isAccessabilityHandler) {
          player.muted
            ? this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves])
            : this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute]);
        }
        this.toggleMute();
        break;
      case KeyMap.ENTER:
      case KeyMap.SPACE:
        this.toggleMute();
        break;
      default:
        break;
    }
  }

  /**
   * on volume control key down, update the volume in case of up/down keys
   *
   * @param {KeyboardEvent} event - keyboardEvent event
   * @method onKeyDown
   * @returns {void}
   * @memberof Volume
   */
  onKeyDown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case KeyMap.UP:
      case KeyMap.DOWN:
      case KeyMap.ENTER:
      case KeyMap.SPACE:
        this.handleKeydown(event, true);
        break;
      default:
        this.setState({hover: false});
        break;
    }
  }

  /**
   * on volume progress bar mouse up, update the volume and change the dragging status to false
   *
   * @method onVolumeProgressBarMouseUp
   * @param {FakeEvent} e - mouse up event
   * @returns {void}
   * @memberof Volume
   */
  onVolumeProgressBarMouseUp(e: FakeEvent): void {
    if (this.props.isDraggingActive) {
      this.props.updateVolumeDraggingStatus(false);
      this.changeVolume(e);
    }
  }

  /**
   * on volume control button Mouse Down, toggle mute in player and store state
   *
   * @method toggleMute
   * @returns {void}
   * @memberof Volume
   */
  toggleMute(): void {
    const {player} = this.props;
    if (player.volume === 0) {
      this.props.logger.debug(`Toggle mute. Volume is 0, set mute to false & volume to 0.5`);
      player.muted = false;
      player.volume = 0.5;
    } else {
      this.props.logger.debug(`Toggle mute. ${player.muted} => ${!player.muted}`);
      player.muted = !player.muted;
    }
    this.props.notifyClick();
  }

  /**
   * change volume based on event mouse position compared to volume progress bar element
   * if muted value is true in store state, change it to false both in store state and in player instance.
   *
   * @method changeVolume
   * @param {FakeEvent} e - event to get the position from
   * @returns {void}
   * @memberof Volume
   */
  changeVolume(e: FakeEvent): void {
    const {player} = this.props;
    const dimensions = this._volumeProgressBarElement.getBoundingClientRect();
    let volume;
    if (dimensions.height > dimensions.width) {
      volume = this._getVerticalVolume(dimensions, e);
    } else {
      volume = this._getHorizontalVolume(dimensions, e);
    }
    volume = parseFloat(volume.toFixed(2));
    if (volume <= 1 && volume >= 0) {
      this.props.logger.debug(`Change volume from ${player.volume} => ${volume}`);
      player.volume = volume;
      if (this.props.muted) {
        player.muted = false;
      }
      this.props.notifyChange({volume: player.volume});
    }
  }

  /**
   * Computes & returns the volume of the player according to the user horizontal click / mouse move.
   * @param {Object} dimensions - dimensions of the horizontal volume bar
   * @param {FakeEvent} e - click / move event
   * @return {number} - the volume of the player. a number in the range of 0 and 1.
   * @private
   */
  _getHorizontalVolume(dimensions: Object, e: FakeEvent): number {
    let barWidth = dimensions.width;
    let left = dimensions.left;
    let clickX = (e: any).clientX;
    if (barWidth != 0) {
      return (clickX - left) / barWidth;
    } else {
      return 0;
    }
  }

  /**
   * Computes & returns the volume of the player according to the user vertical click / mouse move.
   * @param {Object} dimensions - dimensions of the vertical volume bar
   * @param {FakeEvent} e - click / move event
   * @return {number} - the volume of the player. a number in the range of 0 and 1.
   * @private
   */
  _getVerticalVolume(dimensions: Object, e: FakeEvent): number {
    let barHeight = dimensions.height;
    let top = dimensions.top;
    let clickY = (e: any).clientY;
    if (barHeight != 0) {
      return 1 - (clickY - top) / barHeight;
    } else {
      return 0;
    }
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof Volume
   */
  render(): React$Element<any> {
    const {player, isDraggingActive, muted, volume, smartContainerOpen} = this.props;
    const controlButtonClass = [style.controlButtonContainer, style.volumeControl];
    if (isDraggingActive) controlButtonClass.push(style.draggingActive);
    if (muted || volume === 0) controlButtonClass.push(style.isMuted);
    if (this.state.hover && !smartContainerOpen) controlButtonClass.push(style.hover);

    return (
      <div
        ref={c => (this._volumeControlElement = c)}
        className={controlButtonClass.join(' ')}
        onMouseOver={() => this.onMouseOver()}
        onMouseOut={() => this.onMouseOut()}>
        <Tooltip label={muted ? this.props.unmuteAriaLabel : this.props.muteAriaLabel} type={ToolTipType.Left}>
          <Button
            tabIndex="0"
            aria-label={muted ? this.props.unmuteAriaLabel : this.props.muteAriaLabel}
            className={style.controlButton}
            onMouseUp={() => this.toggleMute()}
            onTouchEnd={e => e.stopImmediatePropagation()}
            onKeyDown={e => this.onKeyDown(e)}>
            <Icon type={IconType.VolumeBase} />
            <Icon type={IconType.VolumeWaves} />
            <Icon type={IconType.VolumeMute} />
          </Button>
        </Tooltip>
        <div
          className={style.volumeControlBar}
          role="slider"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={player.volume * 100}
          aria-valuetext={`${player.volume * 100}% volume ${player.muted ? 'muted' : ''}`}>
          <div className={style.bar} ref={c => (this._volumeProgressBarElement = c)} onMouseDown={() => this.onVolumeProgressBarMouseDown()}>
            <div className={style.progress} style={{height: this.getVolumeProgressHeight()}} />
          </div>
        </div>
      </div>
    );
  }
}

Volume.displayName = COMPONENT_NAME;
export {Volume};
