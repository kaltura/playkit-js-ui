//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';

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
@connect(mapStateToProps)
class SeekBarPreview extends Component {
  /**
   * utility function to get the thumb sprite background position
   * @returns {string} background-position string value
   */
  getThumbSpriteOffset(): string {
    const percent = this.props.virtualTime / this.props.duration;
    const sliceIndex = Math.ceil(this.props.thumbsSlices * percent);
    return -(sliceIndex * this.props.thumbsWidth) + 'px 0px';
  }

  /**
   * Gets the style of the frame preview image.
   * @returns {string} - The css style string.
   * @private
   */
  _getFramePreviewImgStyle(): string {
    let framePreviewImgStyle = `background-image: url(${this.props.thumbsSprite});`;
    framePreviewImgStyle += `background-position: ${this.getThumbSpriteOffset()};`;
    framePreviewImgStyle += `background-size: ${this.props.thumbsSlices * this.props.thumbsWidth}px 100%;`;
    return framePreviewImgStyle;
  }

  /**
   * render component
   * @returns {React$Element} - component element
   */
  render() {
    if (!this.props.thumbsSprite || !this.props.thumbsSlices || !this.props.thumbsWidth) return undefined;
    return (
      <div className={[style.framePreviewImgContainer, style.nonSticky].join(' ')}>
        <div className={style.framePreviewImg} style={this._getFramePreviewImgStyle()} />
      </div>
    );
  }
}

SeekBarPreview.displayName = 'SeekBarPreview';
export {SeekBarPreview};
