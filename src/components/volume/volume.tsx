import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/volume';
import {actions as engineActions} from '../../reducers/engine';
import {Icon, IconType} from '../icon';
import {KeyMap} from '../../utils';
import {withPlayer} from '../player';
import {withEventManager} from '../../event';
import {withLogger} from '../logger';
import {withEventDispatcher} from '../event-dispatcher';
import {Text, withText} from 'preact-i18n';
import {withKeyboardEvent} from '../keyboard';
import {actions as overlayIconActions} from '../../reducers/overlay-action';
import {Tooltip} from '../tooltip';
import {ToolTipType} from '../tooltip';
import {Button} from '../button';
import {ButtonControl} from '../button-control';
import {KeyboardEventHandlers} from '../../types';
import {FakeEvent} from '@playkit-js/playkit-js';

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

/**
 * translates
 * @param {any} props - Props
 * @returns {Object} - The object translations
 */
const translates = (props: any) => ({
  volumeLabel: props.muted ? <Text id="controls.unmute">Unmute</Text> : <Text id="controls.mute">Mute</Text>,
  volumeButtonAriaLabel: <Text id="volume.volume_button_aria_label">Volume</Text>,
  volumeButtonAriaDescription: <Text id="volume.volume_button_description">Click to volume control</Text>,
  sliderAriaLabel: <Text id="volume.volume_slider_aria_label">Volume control</Text>,
  sliderDescription: <Text id="volume.volume_slider_description">Use the arrows to control the volume</Text>
});

/**
 * Volume component
 *
 * @class Volume
 * @example <Volume />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...actions, ...engineActions, ...overlayIconActions}))
@withPlayer
@withEventManager
@withKeyboardEvent(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText(translates)
class Volume extends Component<any, any> {
  _volumeControlElement!: HTMLDivElement;
  _volumeSliderElement!: HTMLDivElement;
  _volumeProgressBarElement!: HTMLDivElement;
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.UP
      },
      action: event => {
        this.handleKeydown(event);
      }
    },
    {
      key: {
        code: KeyMap.DOWN
      },
      action: event => {
        this.handleKeydown(event);
      }
    },
    {
      key: {
        code: KeyMap.M
      },
      action: event => {
        this.handleKeydown(event);
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
    this.props.eventManager.listen(document, 'mouseup', this.onVolumeProgressBarMouseUp);
    this.props.eventManager.listen(document, 'mousemove', this.onVolumeProgressBarMouseMove);
    this.props.eventManager.listen(document, 'click', e => this.handleClickOutside(e));
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  _shouldRender(): boolean {
    const isActive = !(this.props.player.isImage() || this.props.player.isDocument());
    this.props.onToggle(COMPONENT_NAME, isActive);
    return isActive;
  }

  /**
   * event listener for clicking outside handler.
   *
   * @param {*} e - click event
   * @returns {void}
   * @memberof Volume
   */
  handleClickOutside(e: any) {
    if (!this.props.isMobile && !!this._volumeControlElement && !this._volumeControlElement.contains(e.target) && this.state.hover) {
      this.setState({hover: false});
    }
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
  onVolumeProgressBarMouseDown = (): void => {
    this.props.updateVolumeDraggingStatus(true);
  };

  /**
   * on volume progress bar mouse move, update the volume if dragging is active
   *
   * @method onVolumeProgressBarMouseMove
   * @param {FakeEvent} e - mouse move event
   * @returns {void}
   * @memberof Volume
   */
  onVolumeProgressBarMouseMove = (e: MouseEvent): void => {
    if (this.props.isDraggingActive) {
      this.changeVolume(e);
    }
  };

  /**
   * volume mouse over handler
   *
   * @returns {void}
   * @memberof Volume
   */
  onMouseOver = (): void => {
    if (this.props.isMobile) return;
    this.props.updateVolumeHover(true);
    this.setState({hover: true});
  };

  /**
   * volume mouse over handler
   *
   * @returns {void}
   * @memberof Volume
   */
  onMouseOut = (): void => {
    if (this.props.isMobile) return;
    this.props.updateVolumeHover(false);
    this.setState({hover: false});
  };

  /**
   * on volume control key down, update the volume in case of up/down keys
   *
   * @method handleKeydown
   * @param {KeyboardEvent} event - keyboardEvent event
   * @returns {void}
   * @memberof Volume
   */
  handleKeydown(event: KeyboardEvent, preventMute = false): void {
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
        this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves]);
        newVolume = Math.min(Math.round(player.volume * 100) + KEYBOARD_DEFAULT_VOLUME_JUMP, 100);
        changeVolume(newVolume);
        break;
      case KeyMap.DOWN:
        newVolume = Math.max(Math.round(player.volume * 100) - KEYBOARD_DEFAULT_VOLUME_JUMP, 0);
        newVolume === 0
          ? this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute])
          : this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWave]);
        changeVolume(newVolume);
        break;
      case KeyMap.M:
        player.muted
          ? this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeWaves])
          : this.props.updateOverlayActionIcon([IconType.VolumeBase, IconType.VolumeMute]);
        this.toggleMute();
        break;
      case KeyMap.ENTER:
      case KeyMap.SPACE:
        if (!preventMute) {
          this.toggleMute();
        }
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
  onKeyDown = (event: KeyboardEvent): void => {
    switch (event.keyCode) {
      case KeyMap.UP:
      case KeyMap.DOWN:
      case KeyMap.ENTER:
      case KeyMap.SPACE:
        event.preventDefault();
        event.stopPropagation();
        this.handleKeydown(event);
        break;
      case KeyMap.TAB:
        // allow tabbing to progress bar
        break;
      default:
        this.setState({hover: false});
        break;
    }
  };

  /**
   * on focus handler
   *
   * @returns {void}
   * @memberof Volume
   */
  onFocus = (): void => {
    if (!this.props.isMobile && !this.state.hover) {
      this.setState({hover: true});
    }
  };

  /**
   * on touch end handler
   *
   * @param {Event} e - event
   * @returns {void}
   * @memberof Volume
   */
  onTouchEnd = (e: Event): void => {
    e.stopImmediatePropagation();
  };

  /**
   * on volume progress bar mouse up, update the volume and change the dragging status to false
   *
   * @method onVolumeProgressBarMouseUp
   * @param {FakeEvent} e - mouse up event
   * @returns {void}
   * @memberof Volume
   */
  onVolumeProgressBarMouseUp = (e: MouseEvent): void => {
    if (this.props.isDraggingActive) {
      this.props.updateVolumeDraggingStatus(false);
      this.changeVolume(e);
    }
  };

  /**
   * on volume control button Mouse Down, toggle mute in player and store state
   *
   * @method toggleMute
   * @returns {void}
   * @memberof Volume
   */
  toggleMute = (): void => {
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
  };

  /**
   * change volume based on event mouse position compared to volume progress bar element
   * if muted value is true in store state, change it to false both in store state and in player instance.
   *
   * @method changeVolume
   * @param {FakeEvent} e - event to get the position from
   * @returns {void}
   * @memberof Volume
   */
  changeVolume(e: MouseEvent): void {
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
  _getHorizontalVolume(dimensions: any, e: MouseEvent): number {
    let barWidth = dimensions.width;
    let left = dimensions.left;
    let clickX = e.clientX;
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
  _getVerticalVolume(dimensions: any, e: MouseEvent): number {
    let barHeight = dimensions.height;
    let top = dimensions.top;
    let clickY = e.clientY;
    if (barHeight != 0) {
      return 1 - (clickY - top) / barHeight;
    } else {
      return 0;
    }
  }

  /**
   * on volume progress bar key down
   *
   * @param {KeyboardEvent} event - keyboardEvent event
   * @method onProgressBarKeyDown
   * @returns {void}
   * @memberof Volume
   */
  onProgressBarKeyDown = (event: KeyboardEvent): void => {
    switch (event.keyCode) {
      case KeyMap.TAB:
        this.setState({hover: false});
        break;
      default:
        event.preventDefault();
        event.stopPropagation();
        this.handleKeydown(event, true);
        break;
    }
  };

  handleClickOnVolumeButton = (e: Event): void => {
    e.stopPropagation?.();
    e.preventDefault?.();
    this._volumeSliderElement?.focus();
  };

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof Volume
   */
  render(): VNode<any> | undefined {
    if (!this._shouldRender) return undefined;
    const {player, isDraggingActive, muted, volume, smartContainerOpen} = this.props;
    const controlButtonClasses = [
      // for backward compatibility
      style.volumeControl
    ];
    if (isDraggingActive) controlButtonClasses.push(style.draggingActive);
    if (muted || volume === 0) controlButtonClasses.push(style.isMuted);
    if (this.state.hover && !smartContainerOpen) controlButtonClasses.push(style.hover);
    const volumePercentage = Math.round(player.volume * 100);

    return (
      <ButtonControl
        name={COMPONENT_NAME}
        ref={c => (c ? (this._volumeControlElement = c) : undefined)}
        className={controlButtonClasses}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}>
        <Tooltip label={this.props.volumeLabel} type={this.props.toolTipType ? this.props.toolTipType : ToolTipType.Left}>
          <Button
            tabIndex="0"
            aria-label={`${this.props.volumeLabel}`}
            className={style.controlButton}
            onMouseUp={this.toggleMute}
            onTouchEnd={this.onTouchEnd}
            onKeyDown={this.onKeyDown}>
            <Icon type={IconType.VolumeBase} />
            <Icon type={IconType.VolumeWaves} />
            <Icon type={IconType.VolumeMute} />
          </Button>
        </Tooltip>
        <span
          /* a11y element to reach volume seekbar with speech recognition */
          className={style.volumeButton}
          hidden={this.state.hover}
          role="button"
          tabIndex={-1}
          onClick={this.handleClickOnVolumeButton}
          aria-label={this.props.volumeButtonAriaLabel}
          aria-description={this.props.volumeButtonAriaDescription}
        />
        <div
          ref={node => (node ? (this._volumeSliderElement = node) : undefined)}
          tabIndex={0}
          aria-orientation="vertical"
          aria-label={this.props.sliderAriaLabel}
          aria-description={this.props.sliderDescription}
          onKeyDown={this.onProgressBarKeyDown}
          className={style.volumeControlBar}
          onFocus={this.onFocus}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={volumePercentage}
          aria-valuetext={`${volumePercentage}% volume ${player.muted ? 'muted' : ''}`}>
          <div
            className={style.bar}
            ref={c => (c ? (this._volumeProgressBarElement = c) : undefined)}
            onMouseDown={this.onVolumeProgressBarMouseDown}>
            <div className={style.progress} style={{height: this.getVolumeProgressHeight()}} />
          </div>
        </div>
      </ButtonControl>
    );
  }
}

Volume.displayName = COMPONENT_NAME;
export {Volume};
