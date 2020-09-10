//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {withPlayer} from 'components/player';
import {bindActions} from '../../utils/bind-actions';
import {actions as seekbarActions} from '../../reducers/seekbar';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  duration: state.engine.duration,
  seekbarClientRect: state.seekbar.clientRect,
  hideTimeBubble: state.seekbar.hideTimeBubble
});

const COMPONENT_NAME = 'CuePoint';

@connect(mapStateToProps, bindActions(seekbarActions))
@withPlayer
class CuePoint extends Component {
  _markerRef: ?HTMLDivElement;
  _hideTimeBubble: boolean;

  _getMarkerPosition() {
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

  _getPreviewPosition(previewWidth) {
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

  onMouseOver() {
    if (this.props.preview) {
      this.props.updateCuePointActive(true);
      if (!this.props.hideTimeBubble && this.props.preview.displayTime === false) {
        this._hideTimeBubble = true;
        this.props.updateHideTimeBubble(true);
      }
    }
  }

  onMouseLeave() {
    this.props.updateCuePointActive(false);
    if (this._hideTimeBubble) {
      this._hideTimeBubble = false;
      this.props.updateHideTimeBubble(false);
    }
  }

  componentDidMount(): void {
    this._hideTimeBubble = false;
  }

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

  render(props: any): React$Element<any> | void {
    const previewWidth = props.preview.width || 160;
    const previewHeight = props.preview.height || 90;
    const markerStyle = {backgroundColor: props.marker.color, width: props.marker.width};
    let markerProps = {
      style: markerStyle
    };
    if (props.marker.className) {
      markerProps.className = props.marker.className;
    }
    markerProps = {...markerProps, ...props.marker.props};
    const previewStyle = {
      width: `${previewWidth}px`,
      height: `${previewHeight}px`
    };
    let previewProps = {
      style: previewStyle
    };
    if (props.preview.className) {
      previewProps.className = props.preview.className;
    }
    previewProps = {...previewProps, ...props.preview.props};
    return (
      <div
        onMouseOver={() => this.onMouseOver()}
        onMouseLeave={() => this.onMouseLeave()}
        className={style.cuePointContainer}
        style={{left: `${this._getMarkerPosition()}px`}}
        ref={this._setMarkerRef}>
        {props.marker.get ? (
          h(props.marker.get, markerProps)
        ) : (
          <div style={markerStyle} className={[style.cuePoint, props.marker.className].join(' ')} />
        )}
        {this._markerRef && props.preview.get ? (
          <div
            className={[style.cuePointPreviewContainer].join(' ')}
            style={{
              left: `${this._getPreviewPosition(previewWidth)}px`,
              zIndex: props.preview.displayTime === false ? 'initial' : -1
            }}>
            {h(props.preview.get, previewProps)}
          </div>
        ) : undefined}
      </div>
    );
  }
}

CuePoint.displayName = COMPONENT_NAME;
export {CuePoint};
