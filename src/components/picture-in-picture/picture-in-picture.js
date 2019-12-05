//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {connect} from 'preact-redux';
import {PLAYER_SIZE} from '../shell/shell';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';
import {KeyMap} from 'utils/key-map';
import {withKeyboardEvent} from 'components/keyboard';
import {FakeEvent} from 'event/fake-event';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPictureInPictureSupported: state.engine.isPictureInPictureSupported,
  playerSize: state.shell.playerSize
});

const COMPONENT_NAME = 'PictureInPicture';

@connect(mapStateToProps)
@withPlayer
@withKeyboardEvent
@withLogger(COMPONENT_NAME)
/**
 * PictureInPicture component
 *
 * @class PictureInPicture
 * @extends {Component}
 */
class PictureInPicture extends Component {
  /**
   * @returns {void}
   * @memberof PictureInPicture
   */
  componentDidMount() {
    this.props.addKeyboardHandler(KeyMap.P, () => {
      const {player} = this.props;
      if (!player.isInPictureInPicture()) {
        this.props.logger.debug('Enter Picture In Picture');
        player.enterPictureInPicture();
        player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_ENTERED_PICTURE_IN_PICTURE));
      } else {
        this.props.logger.debug('Exit Picture In Picture');
        player.exitPictureInPicture();
        player.dispatchEvent(new FakeEvent(FakeEvent.Type.USER_EXITED_PICTURE_IN_PICTURE));
      }
    });
  }
  /**
   * On PIP icon clicked
   * @returns {void}
   * @private
   */
  _onClick(): void {
    const {player} = this.props;
    if (player.isInPictureInPicture()) {
      player.exitPictureInPicture();
    } else {
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
          <Localizer>
            <button
              tabIndex="0"
              aria-label={<Text id={'controls.pictureInPicture'} />}
              className={`${style.controlButton} ${this.state.animation ? style.rotate : ''}`}
              onClick={() => this._onClick()}>
              <Icon type={IconType.PictureInPicture} />
            </button>
          </Localizer>
        </div>
      );
    }
  }
}

PictureInPicture.displayName = COMPONENT_NAME;
export {PictureInPicture};
