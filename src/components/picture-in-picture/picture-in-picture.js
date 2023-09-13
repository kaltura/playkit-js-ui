//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {withText} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {connect} from 'react-redux';
import {PLAYER_SIZE} from '../shell/shell';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';
import {KeyMap} from 'utils/key-map';
import {withKeyboardEvent} from 'components/keyboard';
import {withEventDispatcher} from 'components/event-dispatcher';
import {Tooltip} from 'components/tooltip';
import {Button} from 'components/button';
import {bindActions} from 'utils/bind-actions';
import {actions as shellActions} from 'reducers/shell';
import {ButtonControl} from 'components/button-control';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPictureInPictureSupported: state.engine.isPictureInPictureSupported,
  isInPictureInPicture: state.engine.isInPictureInPicture,
  playerSize: state.shell.playerSize
});

const COMPONENT_NAME = 'PictureInPicture';

/**
 * PictureInPicture component
 *
 * @class PictureInPicture
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(shellActions))
@withPlayer
@withKeyboardEvent(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({
  pictureInPictureText: 'controls.pictureInPicture',
  pictureInPictureExitText: 'controls.pictureInPictureExit',
  pictureInPictureExpandText: 'controls.pictureInPictureExpand'
})
class PictureInPicture extends Component {
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.P
      },
      action: () => {
        this.togglePip();
        this.props.updatePlayerHoverState(true);
      }
    }
  ];

  /**
   * component mounted
   *
   * @returns {void}
   * @memberof PictureInPicture
   */
  componentDidMount() {
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  /**
   * should render component
   * @returns {boolean} - whether to render the component
   */
  _shouldRender(): boolean {
    const isActive = !!(this.props.isPictureInPictureSupported === undefined || this.props.isPictureInPictureSupported);
    this.props.onToggle(COMPONENT_NAME, isActive);
    return isActive;
  }

  /**
   * toggle pip
   * @returns {void}
   *
   * @memberof PictureInPicture
   */
  togglePip = (): void => {
    const {player} = this.props;
    if (player.isInPictureInPicture()) {
      this.props.logger.debug('Exit Picture In Picture');
      this.props.notifyClick();
      player.exitPictureInPicture();
    } else {
      this.props.logger.debug('Enter Picture In Picture');
      this.props.notifyClick();
      player.enterPictureInPicture();
    }
  };

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof PictureInPicture
   */
  render(): React$Element<any> | void {
    if (this._shouldRender()) {
      return (
        <ButtonControl name={COMPONENT_NAME}>
          <Tooltip label={this.props.isInPictureInPicture ? this.props.pictureInPictureExpandText : this.props.pictureInPictureText}>
            <Button
              tabIndex="0"
              aria-label={this.props.isInPictureInPicture ? this.props.pictureInPictureExitText : this.props.pictureInPictureText}
              className={this.props.isInPictureInPicture ? [style.controlButton, style.isInPictureInPicture].join(' ') : style.controlButton}
              onClick={this.togglePip}>
              <Icon type={IconType.PictureInPictureStart} />
              <Icon type={IconType.PictureInPictureStop} />
            </Button>
          </Tooltip>
        </ButtonControl>
      );
    }
  }
}

PictureInPicture.displayName = COMPONENT_NAME;
export {PictureInPicture};
