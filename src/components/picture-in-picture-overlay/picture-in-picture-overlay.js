//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {Localizer, Text} from 'preact-i18n';
import {withPlayer} from '../player';
import {withLogger} from 'components/logger';
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

const COMPONENT_NAME = 'PictureInPictureOverlay';

@connect(mapStateToProps)
@withPlayer
@withLogger(COMPONENT_NAME)
/**
 * PictureInPictureOverlay component
 *
 * @class PictureInPictureOverlay
 * @example <PictureInPictureOverlay />
 * @extends {Component}
 */
class PictureInPictureOverlay extends Component {
  /**
   * The button is clicked, play the video in the player instead of in picture in picture
   * @returns {void}
   * @memberof PictureInPictureOverlay
   */
  _handleClick(): void {
    this.props.player.exitPictureInPicture();
  }

  /**
   * render component
   *
   * @returns {?React$Element} - component element
   * @memberof PictureInPictureOverlay
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
          </div>
        </div>
      </div>
    );
  }
}

PictureInPictureOverlay.displayName = COMPONENT_NAME;
export {PictureInPictureOverlay};
