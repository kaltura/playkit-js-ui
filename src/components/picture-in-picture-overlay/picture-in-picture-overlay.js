//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import BaseComponent from '../base';
import {connect} from 'preact-redux';
import {IconType} from '../icon/index';
import {Icon} from '../icon/icon';
import {Localizer, Text} from 'preact-i18n';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  poster: state.engine.poster,
  isInPictureInPicture: state.engine.isInPictureInPicture,
  isChangingSource: state.engine.isChangingSource
});

@connect(mapStateToProps)
/**
 * CastOverlay component
 *
 * @class CastOverlay
 * @example <CastOverlay player={this.player} />
 * @extends {BaseComponent}
 */
class PictureInPictureOverlay extends BaseComponent {
  /**
   * Creates an instance of CastOverlay.
   * @param {Object} obj obj
   * @memberof CastOverlay
   */
  constructor(obj: Object) {
    super({name: 'PictureInPictureOverlay', player: obj.player});
  }

  _handleClick(): void {
    this.player.exitPictureInPicture();
  }

  /**
   * render component
   *
   * @returns {?React$Element} - component element
   * @memberof CastOverlay
   */
  render(): ?React$Element<any> {
    if (!this.props.isInPictureInPicture) {
      return;
    }

    let posterStyle = {};
    const posterClasses = [style.pictureInPicturePoster];
    if (this.props.poster) {
      const backgroundImage = this.props.isChangingSource ? '' : `url(${this.props.poster})`;
      posterStyle = {
        backgroundImage,
        backgroundSize: 'contain'
      };
      posterClasses.push(style.hasPoster);
    }

    return (
      <div>
        <div className={style.pictureInPictureOverlay}>
          <div className={posterClasses.join(' ')} style={posterStyle} onMouseOver={e => e.stopPropagation()}>
            <div className={style.darkLayer} />
          </div>
          <div className={style.pictureInPictureControl}>
            <Localizer>
              <span className={style.pictureInPictureText}>
                <Text id="pictureInPicture.overlay_text" />
              </span>
            </Localizer>
            <Localizer>
              <button className={[style.pictureInPictureButton, style.controlButtonContainer].join(' ')} onClick={() => this._handleClick()}>
                <Text id="pictureInPicture.overlay_button" />
              </button>
            </Localizer>
          </div>
        </div>
      </div>
    );
  }
}

export {PictureInPictureOverlay};
