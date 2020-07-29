//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {KeyMap} from '../../utils/key-map';
import {default as Icon, IconType} from '../icon';
import {withPlayer} from '../player';
import {withKeyboardEvent} from 'components/keyboard';
import {withLogger} from 'components/logger';
import {Tooltip} from 'components/tooltip';
import {withEventDispatcher} from 'components/event-dispatcher';
import {Button} from 'components/button';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  fullscreen: state.engine.fullscreen,
  targetId: state.config.targetId
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
@withText({fullscreenText: 'controls.fullscreen'})
class Fullscreen extends Component {
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
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
      case KeyMap.F:
        if (!this.props.player.isFullscreen()) {
          this.toggleFullscreen();
        }
        break;
      case KeyMap.ESC:
        if (this.props.player.isFullscreen()) {
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
  toggleFullscreen(): void {
    const {targetId, logger, player} = this.props;
    logger.debug(`Toggle fullscreen`);
    const playerContainer: HTMLElement | null = document.getElementById(targetId);
    player.isFullscreen() ? player.exitFullscreen() : player.enterFullscreen();
    if (playerContainer) {
      playerContainer.focus();
    }
    this.props.notifyClick();
  }

  /**
   * render component
   *
   * @returns {React$Element} - component
   * @memberof Fullscreen
   */
  render(): React$Element<any> {
    return (
      <div className={[style.controlButtonContainer, style.controlFullscreen].join(' ')}>
        <Tooltip label={this.props.fullscreenText}>
          <Button
            tabIndex="0"
            aria-label={this.props.fullscreenText}
            className={this.props.fullscreen ? [style.controlButton, style.isFullscreen].join(' ') : style.controlButton}
            onClick={() => this.toggleFullscreen()}>
            <Icon type={IconType.Maximize} />
            <Icon type={IconType.Minimize} />
          </Button>
        </Tooltip>
      </div>
    );
  }
}

Fullscreen.displayName = COMPONENT_NAME;
export {Fullscreen};
