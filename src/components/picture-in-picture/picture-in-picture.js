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

@connect(mapStateToProps)
@withPlayer
@withKeyboardEvent(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withText({pipText: 'controls.pictureInPicture'})

/**
 * PictureInPicture component
 *
 * @class PictureInPicture
 * @extends {Component}
 */
class PictureInPicture extends Component {
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.P
      },
      action: () => {
        this.togglePip();
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
   * toggle pip
   * @returns {void}
   *
   * @memberof PictureInPicture
   */
  togglePip(): void {
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
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof PictureInPicture
   */
  render(): React$Element<any> | void {
    if (this.props.isPictureInPictureSupported && this.props.playerSize !== PLAYER_SIZE.EXTRA_SMALL) {
      return (
        <div className={[style.controlButtonContainer, style.pictureInPicture].join(' ')}>
          <Tooltip label={this.props.pipText}>
            <Button
              tabIndex="0"
              aria-label={this.props.pipText}
              className={this.props.isInPictureInPicture ? [style.controlButton, style.isInPictureInPicture].join(' ') : style.controlButton}
              onClick={() => this.togglePip()}>
              <Icon type={IconType.PictureInPictureStart} />
              <Icon type={IconType.PictureInPictureStop} />
            </Button>
          </Tooltip>
        </div>
      );
    }
  }
}

PictureInPicture.displayName = COMPONENT_NAME;
export {PictureInPicture};
