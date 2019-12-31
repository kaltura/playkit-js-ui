//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {KeyMap} from '../../utils/key-map';
import {default as Icon, IconType} from '../icon';
import {withPlayer} from '../player';
import {withKeyboardEvent} from 'components/keyboard';
import {withLogger} from 'components/logger';
import {withEventDispatcher} from 'components/event-dispatcher';

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

@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
@withKeyboardEvent(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
/**
 * Fullscreen component
 *
 * @class Fullscreen
 * @example <Fullscreen />
 * @extends {Component}
 */
class Fullscreen extends Component {
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      eventType: 'keydown',
      handlers: [
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
      ]
    }
  ];
  /**
   * on component mount
   *
   * @returns {void}
   * @memberof Fullscreen
   */
  componentDidMount(): void {
    this.props.registerEvents(this._keyboardEventHandlers);
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
    player.isFullscreen ? player.enterFullscreen() : player.exitFullscreen();
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
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id="controls.fullscreen" />}
            className={this.props.fullscreen ? [style.controlButton, style.isFullscreen].join(' ') : style.controlButton}
            onClick={() => this.toggleFullscreen()}>
            <Icon type={IconType.Maximize} />
            <Icon type={IconType.Minimize} />
          </button>
        </Localizer>
      </div>
    );
  }
}

Fullscreen.displayName = COMPONENT_NAME;
export {Fullscreen};
