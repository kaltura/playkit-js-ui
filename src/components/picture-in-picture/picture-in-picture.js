//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import BaseComponent from '../base';

/**
 * PictureInPicture component
 *
 * @class PictureInPicture
 * @extends {BaseComponent}
 */
class PictureInPicture extends BaseComponent {
  _isSupported: boolean = false;

  /**
   * Creates an instance of PictureInPicture.
   * @param {Object} obj - the object passed when created
   * @memberof PictureInPicture
   */
  constructor(obj: Object) {
    super({name: 'PictureInPicture', player: obj.player});
  }

  /**
   * registers the correct PIP handler function according to the browser
   * @returns {void}
   * @private
   */
  _onPlayerReady(): void {
    if (this.player.isPictureInPictureSupported()) {
      this._isSupported = true;
    }
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
   * after component mounted, wait till the player is ready and check for PIP support
   *
   * @returns {void}
   * @memberof SmartContainer
   */
  componentDidMount() {
    this.player.ready().then(() => this._onPlayerReady());
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof RewindControl
   */
  render(): React$Element<any> | void {
    if (this._isSupported) {
      return (
        <div className={[style.controlButtonContainer, style.pictureInPicture].join(' ')}>
          <Localizer>
            <button
              tabIndex="0"
              aria-label={<Text id={'controls.PictureInPicture'} />}
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
    } else {
      return;
    }
  }
}

export {PictureInPicture};
