//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';

const mapStateToProps = state => ({
  duration: state.engine.duration
});

@connect(mapStateToProps)
class SeekBarPreview extends Component {
  /**
   * utility function to get the thumb sprite background position
   *
   * @returns {string} background-position string value
   * @memberof SeekBar
   */
  getThumbSpriteOffset(): string {
    const percent = this.props.virtualTime / this.props.duration;
    const sliceIndex = Math.ceil(this.props.thumbsSlices * percent);
    return -(sliceIndex * this.props.thumbsWidth) + 'px 0px';
  }

  /**
   * Gets the style of the frame preview image.
   * @returns {string} - The css style string.
   * @memberof SeekBar
   * @private
   */
  _getFramePreviewImgStyle(): string {
    let framePreviewImgStyle = `background-image: url(${this.props.thumbsSprite});`;
    framePreviewImgStyle += `background-position: ${this.getThumbSpriteOffset()};`;
    framePreviewImgStyle += `background-size: ${this.props.thumbsSlices * this.props.thumbsWidth}px 100%;`;
    framePreviewImgStyle += `width: ${this.props.thumbsWidth}px;`;
    return framePreviewImgStyle;
  }

  render() {
    return (
      <div className={style.framePreviewImgContainer}>
        <div className={style.framePreviewImg} style={this._getFramePreviewImgStyle()} />
      </div>
    );
  }
}

SeekBarPreview.displayName = 'SeekBarPreview';
export {SeekBarPreview}
