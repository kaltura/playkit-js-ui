//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {withPlayer} from 'components/player';
import {bindActions} from '../../utils/bind-actions';
import {actions as seekbarActions} from '../../reducers/seekbar';
import variables from '../../styles/_variables.scss';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  config: state.config.components.seekbar,
  duration: state.engine.duration,
  seekbarClientRect: state.seekbar.clientRect,
  hideTimeBubble: state.seekbar.hideTimeBubble,
  virtualTime: state.seekbar.virtualTime
});

const COMPONENT_NAME = 'CuePoint';

/**
 * CuePoint component
 *
 * @class CuePoint
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(seekbarActions))
@withPlayer
class CuePoint extends Component {
  _markerRef: ?HTMLDivElement;
  _hideTimeBubble: boolean;

  /**
   * @returns {number} - the marker left position
   * @private
   */
  _getMarkerPosition(): number {
    let left = 0;
    if (this._markerRef && this.props.duration) {
      const markerRect = this._markerRef.getBoundingClientRect();
      const seekbarRect = this.props.seekbarClientRect;
      const markerWidth = markerRect.width;
      const seekbarWidth = seekbarRect.width;
      const markerPosition = (this.props.time < this.props.duration ? this.props.time / this.props.duration : 1) * seekbarWidth;
      if (markerPosition - markerWidth / 2 > 0) {
        if (markerPosition + markerWidth / 2 > seekbarWidth) {
          left = seekbarWidth - markerWidth;
        } else {
          left = markerPosition - markerWidth / 2;
        }
      }
    }
    return left;
  }

  /**
   * @param {number} previewWidth - the preview width
   * @returns {number} - the preview left position
   * @private
   */
  _getPreviewPosition(previewWidth: number): number {
    let left = 0;
    if (this._markerRef) {
      const markerRect = this._markerRef.getBoundingClientRect();
      const seekbarRect = this.props.seekbarClientRect;
      const markerLeft = markerRect.left - seekbarRect.left;
      const markerWidth = markerRect.width;
      const markerRight = markerLeft + markerWidth;
      const seekbarWidth = seekbarRect.width;
      const previewOffset = (previewWidth - markerWidth) / 2;
      if (markerLeft - previewOffset > 0) {
        if (markerRight + previewOffset > seekbarWidth) {
          left = -(previewWidth - (seekbarWidth - markerLeft));
        } else {
          left = -previewOffset;
        }
      } else {
        left = -markerLeft;
      }
    }
    return left;
  }

  /**
   * on marker mouse over handler.
   * @returns {void}
   */
  onMarkerMouseOver(): void {
    if (this.props.preview) {
      this.props.updateCuePointActive(true);
      if (!this.props.hideTimeBubble && this.props.preview.hideTime) {
        this._hideTimeBubble = true;
        this.props.updateHideTimeBubble(true);
      }
    }
  }

  /**
   * on marker mouse leave handler.
   * @returns {void}
   */
  onMarkerMouseLeave(): void {
    this.props.updateCuePointActive(false);
    if (this._hideTimeBubble) {
      this._hideTimeBubble = false;
      this.props.updateHideTimeBubble(false);
    }
  }

  /**
   * on preview mouse over handler.
   * @returns {void}
   */
  onPreviewMouseOver(): void {
    this.props.updateSeekbarPreviewHoverActive(true);
  }

  /**
   * on preview mouse leave handler.
   * @returns {void}
   */
  onPreviewMouseLeave(): void {
    this.props.updateSeekbarPreviewHoverActive(false);
  }

  /**
   * componentDidMount
   * @returns {void}
   */
  componentDidMount(): void {
    this._hideTimeBubble = false;
  }

  /**
   * componentWillUnmount
   * @returns {void}
   */
  componentWillUnmount(): void {
    this.props.updateCuePointActive(false);
    if (this._hideTimeBubble) {
      this.props.updateHideTimeBubble(false);
    }
  }

  /**
   *
   * @param {HTMLDivElement} ref - ref
   * @returns {void}
   * @private
   */
  _setMarkerRef = (ref: HTMLDivElement | null) => {
    if (ref) {
      this._markerRef = ref;
      this.setState(prevState => ({render: !prevState.render}));
    }
  };

  /**
   * render component
   * @param {*} props - component props
   * @returns {React$Element} - component element
   */
  render(props: any): React$Element<any> | void {
    const {marker, preview, virtualTime, config} = props;

    const markerStyle = {backgroundColor: marker.color, width: marker.width};
    let markerProps = {
      className: marker.className ? [style.cuePoint, marker.className].join(' ') : style.cuePoint,
      style: marker.props ? {...markerStyle, ...marker.props.style} : markerStyle
    };
    markerProps = {...marker.props, ...markerProps};

    const previewWidth = preview.width || variables.framePreviewImgWidth;
    const previewHeight = preview.height || variables.framePreviewImgHeight;
    const previewStyle = {
      width: `${previewWidth}px`,
      height: `${previewHeight}px`
    };
    let previewProps: Object = {
      style: preview.props ? {...previewStyle, ...preview.props.style} : previewStyle
    };
    if (preview.className) {
      previewProps.className = preview.className;
    }
    previewProps = {
      ...preview.props,
      ...previewProps,
      seekbarProps: {
        virtualTime,
        thumbsSlices: config.thumbsSlices,
        thumbsWidth: config.thumbsWidth,
        thumbsSprite: config.thumbsSprite
      }
    };
    return (
      <div
        onMouseOver={() => this.onMarkerMouseOver()}
        onMouseLeave={() => this.onMarkerMouseLeave()}
        className={style.cuePointContainer}
        style={{left: `${this._getMarkerPosition()}px`}}
        ref={this._setMarkerRef}>
        {marker.get ? h(marker.get, markerProps) : <div style={markerStyle} className={[style.cuePoint, marker.className].join(' ')} />}
        {this._markerRef && preview.get ? (
          <div
            onMouseOver={() => this.onPreviewMouseOver()}
            onMouseLeave={() => this.onPreviewMouseLeave()}
            className={preview.sticky === false ? [style.cuePointPreviewContainer, style.nonSticky].join(' ') : style.cuePointPreviewContainer}
            style={{
              left: `${this._getPreviewPosition(previewWidth)}px`
            }}>
            {h(preview.get, previewProps)}
          </div>
        ) : undefined}
      </div>
    );
  }
}

CuePoint.displayName = COMPONENT_NAME;
export {CuePoint};
