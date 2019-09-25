//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {connect} from 'preact-redux';
import {PLAYER_SIZE} from '../shell/shell';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';

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
@withLogger(COMPONENT_NAME)
/**
 * PictureInPicture component
 *
 * @class PictureInPicture
 * @extends {Component}
 */
class PictureInPicture extends Component {
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
              onClick={() => this._onClick()}
              onKeyDown={e => {
                if (e.keyCode === KeyMap.ENTER) {
                  this._onClick();
                }
              }}>
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
