import {h, Component, VNode} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {actions} from '../../reducers/settings';
import {SmartContainerItem} from '../../components';
import {IconType} from '../icon';
import {withPlayer} from '../player';
import {withLogger} from '../logger';
import {withEventDispatcher} from '../event-dispatcher';

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
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({
  speedLabelText: 'settings.speed',
  speedNormalLabelText: 'settings.speedNormal'
})
class SpeedMenu extends Component<any, any> {
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
  render(props: any): VNode<any> | undefined {
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
