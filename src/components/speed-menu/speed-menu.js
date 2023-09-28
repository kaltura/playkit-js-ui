//@flow
import {h, Component} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions, KeyMap} from 'utils';
import {actions} from 'reducers/settings';
import {SmartContainerItem} from 'components';
import {IconType} from '../icon';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withKeyboardEvent} from 'components/keyboard';
import {SpeedSelectedEvent} from 'event/events/speed-selected-event';

const COMPONENT_NAME = 'SpeedMenu';

/**
 * SpeedMenu component
 *
 * @class SpeedMenu
 * @example <SpeedMenu />
 * @extends {Component}
 */
@connect(null, bindActions(actions))
@withPlayer
@withKeyboardEvent(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({
  speedLabelText: 'settings.speed',
  speedNormalLabelText: 'settings.speedNormal'
})
class SpeedMenu extends Component {
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.PERIOD,
        shiftKey: true
      },
      action: event => {
        this.handleKeydown(event);
      }
    },
    {
      key: {
        code: KeyMap.SEMI_COLON,
        shiftKey: true
      },
      action: event => {
        this.handleKeydown(event);
      }
    },
    {
      key: {
        code: KeyMap.COMMA,
        shiftKey: true
      },
      action: event => {
        this.handleKeydown(event);
      }
    }
  ];

  /**
   * after component mounted, set event listener to click outside of the component
   *
   * @returns {void}
   * @memberof SpeedMenu
   */
  componentDidMount() {
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  /**
   * on settings control key down, update the settings in case of up/down keys
   *
   * @method handleKeydown
   * @param {KeyboardEvent} event - keyboardEvent event
   * @returns {void}
   * @memberof SpeedMenu
   */
  handleKeydown(event: KeyboardEvent): void {
    const {player, logger} = this.props;
    let playbackRate, index;
    switch (event.keyCode) {
      case KeyMap.PERIOD:
        playbackRate = player.playbackRate;
        index = player.playbackRates.indexOf(playbackRate);
        if (index < player.playbackRates.length - 1) {
          logger.debug(`Changing playback rate. ${playbackRate} => ${player.playbackRates[index + 1]}`);
          player.playbackRate = player.playbackRates[index + 1];
          this.props.updateOverlayActionIcon(IconType.SpeedUp);
          player.dispatchEvent(new SpeedSelectedEvent(player.playbackRate));
        }
        break;
      case KeyMap.SEMI_COLON:
        if (player.playbackRate !== player.defaultPlaybackRate) {
          logger.debug(`Changing playback rate. ${player.playbackRate} => ${player.defaultPlaybackRate}`);
          player.playbackRate = player.defaultPlaybackRate;
          this.props.updateOverlayActionIcon(IconType.Speed);
          player.dispatchEvent(new SpeedSelectedEvent(player.playbackRate));
        }
        break;
      case KeyMap.COMMA:
        playbackRate = player.playbackRate;
        index = player.playbackRates.indexOf(playbackRate);
        if (index > 0) {
          logger.debug(`Changing playback rate. ${playbackRate} => ${player.playbackRates[index - 1]}`);
          player.playbackRate = player.playbackRates[index - 1];
          this.props.updateOverlayActionIcon(IconType.SpeedDown);
          player.dispatchEvent(new SpeedSelectedEvent(player.playbackRate));
        }
        break;
    }
  }

  /**
   * change player playback rate and update it in the store state
   *
   * @param {number} playbackRate - playback rate value
   * @returns {void}
   * @memberof SpeedMenu
   */
  onSpeedChange = (playbackRate: number): void => {
    this.props.updateSpeed(playbackRate);
    this.props.player.playbackRate = playbackRate;
    this.props.notifyClick({
      type: 'speed',
      speed: playbackRate
    });
  };

  /**
   * render function
   *
   * @param {*} props - component props
   * @returns {React$Element} - component
   * @memberof SpeedMenu
   */
  render(props: any): React$Element<any> | void {
    const speedOptions = props.optionsRenderer
      ? props.optionsRenderer(props.player.playbackRates)
      : props.player.playbackRates.reduce((acc, speed) => {
          let speedOption = {
            value: speed,
            label: speed === 1 ? props.speedNormalLabelText : speed,
            active: false
          };
          if (speed === props.player.playbackRate) {
            speedOption.active = true;
          }
          acc.push(speedOption);
          return acc;
        }, []);

    return (
      <SmartContainerItem
        pushRef={el => {
          props.pushRef(el);
        }}
        icon={IconType.Speed}
        label={props.speedLabelText}
        options={speedOptions}
        onMenuChosen={this.onSpeedChange}
      />
    );
  }
}

SpeedMenu.displayName = COMPONENT_NAME;
export {SpeedMenu};
