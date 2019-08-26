//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {PLAYER_SIZE} from '../shell/shell';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPictureInPictureSupported: state.engine.isPictureInPictureSupported,
  playerSize: state.shell.playerSize
});

/**
 * PictureInPicture component
 *
 * @class PictureInPicture
 * @extends {BaseComponent}
 */
@connect(mapStateToProps)
class PictureInPicture extends BaseComponent {
  /**
   * Creates an instance of PictureInPicture.
   * @param {Object} obj - the object passed when created
   * @memberof PictureInPicture
   */
  constructor(obj: Object) {
    super({name: 'PictureInPicture', player: obj.player});
  }

  /**
   * On PIP icon clicked
   * @returns {void}
   * @private
   */
  _onClick(): void {
    if (this.player.isInPictureInPicture()) {
      this.player.exitPictureInPicture();
    } else {
      this.player.enterPictureInPicture();
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

export {PictureInPicture};
