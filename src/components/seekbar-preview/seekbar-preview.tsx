import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {withPlayer} from '../player';
import {ThumbnailInfo} from '@playkit-js/playkit-js';
import {WithPlayerProps} from '../player/with-player';

type SeekBarPreviewProps = {
  duration?: number;
  virtualTime: number;
};

const FRAME_PREVIEW_IMG_CONTAINER_OFFSET: number = 4;

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  duration: state.engine.duration
});

/**
 * SeekBarPreview component
 *
 * @class SeekBarPreview
 * @extends {Component}
 */
@withPlayer
@connect(mapStateToProps)
class SeekBarPreview extends Component<WithPlayerProps & SeekBarPreviewProps, any> {
  /**
   * Gets the style of the frame preview image.
   * @param {Object} thumbnailInfo  - The thumbnail info data.
   * @returns {string} - The css style string.
   * @private
   */
  _getFramePreviewImgStyle(thumbnailInfo: any): string {
    let framePreviewImgStyle = `background: url(${thumbnailInfo.url});`;
    framePreviewImgStyle += `background-position: -${thumbnailInfo.x}px -${thumbnailInfo.y}px;`;
    return framePreviewImgStyle;
  }

  /**
   * Gets the style of the frame preview image container.
   * @param {Object} thumbnailInfo  - The thumbnail info data.
   * @returns {Object} - The css object style.
   * @private
   */
  _getFramePreviewImgContainerStyle(thumbnailInfo: ThumbnailInfo): {height: string; width: string} {
    return {
      height: `${thumbnailInfo.height + FRAME_PREVIEW_IMG_CONTAINER_OFFSET}px`,
      width: `${thumbnailInfo.width + FRAME_PREVIEW_IMG_CONTAINER_OFFSET}px`
    };
  }

  /**
   * render component
   * @returns {React$Element} - component element
   */
  render() {
    const thumbnailInfo = this.props.player!.getThumbnail(this.props.virtualTime);
    if (thumbnailInfo) {
      return (
        <div style={this._getFramePreviewImgContainerStyle(thumbnailInfo)} className={[style.framePreviewImgContainer, style.nonSticky].join(' ')}>
          <div className={style.framePreviewImg} style={this._getFramePreviewImgStyle(thumbnailInfo)} />
        </div>
      );
    }
  }
}

SeekBarPreview.displayName = 'SeekBarPreview';
export {SeekBarPreview};
