import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {KeyMap} from '../../utils/key-map';
import {Icon, IconType} from '../icon';
import {withPlayer} from '../player';
import {withKeyboardEvent} from '../../components/keyboard';
import {withLogger, WithLoggerProps} from '../../components/logger';
import {Tooltip} from '../../components/tooltip';
import {withEventDispatcher, WithEventDispatcherProps} from '../../components/event-dispatcher';
import {Button} from '../../components/button';
import {ButtonControl} from '../../components/button-control';
import {KeyboardEventHandlers} from '../../types';
import {WithPlayerProps} from '../player/with-player';
import {WithKeyboardEventProps} from '../keyboard/with-keyboard-event';

type TextProps = {
  fullscreenText: string;
  fullscreenExitText: string;
};

type FullscreenProps = {
  isInFullscreen: boolean;
};

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isInFullscreen: state.engine.fullscreen
});

const COMPONENT_NAME = 'Fullscreen';

/**
 * Fullscreen component
 *
 * @class Fullscreen
 * @example <Fullscreen />
 * @extends {Component}
 */
@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
@withKeyboardEvent(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({
  fullscreenText: 'controls.fullscreen',
  fullscreenExitText: 'controls.fullscreenExit'
})
class Fullscreen extends Component<
  FullscreenProps & WithPlayerProps & WithLoggerProps & WithEventDispatcherProps & TextProps & WithKeyboardEventProps,
  any
> {
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.ENTER
      },
      action: event => {
        this.handleKeydown(event);
      }
    },
    {
      key: {
        code: KeyMap.F
      },
      action: event => {
        this.handleKeydown(event);
      }
    },
    {
      key: {
        code: KeyMap.ESC
      },
      action: event => {
        this.handleKeydown(event);
      }
    }
  ];
  /**
   * on component mount
   *
   * @returns {void}
   * @memberof Fullscreen
   */
  componentDidMount(): void {
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  /**
   * handle keyboard events
   *
   * @param {KeyboardEvent} event - keyboard event
   * @returns {void}
   * @memberof Fullscreen
   */
  handleKeydown(event: KeyboardEvent): void {
    switch (event.keyCode) {
      case KeyMap.ENTER:
        if (!event.repeat) {
          this.toggleFullscreen();
        }
      case KeyMap.F:
        if (!this.props.player!.isFullscreen()) {
          this.toggleFullscreen();
        }
        break;
      case KeyMap.ESC:
        if (this.props.player!.isFullscreen()) {
          this.toggleFullscreen();
        }
        break;
      default:
        break;
    }
  }
  /**
   * toggle fullscreen based on current fullscreen state in store
   *
   * @returns {void}
   * @memberof Fullscreen
   */
  toggleFullscreen = (): void => {
    const {logger, player} = this.props;
    logger.debug(`Toggle fullscreen`);
    player!.isFullscreen() ? player!.exitFullscreen() : player!.enterFullscreen();
    this.props.notifyClick!();
  };

  /**
   * render component
   *
   * @returns {React$Element} - component
   * @memberof Fullscreen
   */
  render(): VNode<any> {
    return (
      <ButtonControl name={COMPONENT_NAME}>
        <Tooltip label={this.props.isInFullscreen ? this.props.fullscreenExitText : this.props.fullscreenText}>
          <Button
            tabIndex="0"
            aria-label={this.props.isInFullscreen ? this.props.fullscreenExitText : this.props.fullscreenText}
            className={this.props.isInFullscreen ? [style.controlButton, style.isFullscreen].join(' ') : style.controlButton}
            onClick={this.toggleFullscreen}
          >
            <Icon type={IconType.Maximize} />
            <Icon type={IconType.Minimize} />
          </Button>
        </Tooltip>
      </ButtonControl>
    );
  }
}

Fullscreen.displayName = COMPONENT_NAME;
export {Fullscreen};
