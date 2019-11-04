//@flow
import {Component} from 'preact';
import {withPresetAreas} from '../preset-areas';
import style from '../../styles/style.scss';

@withPresetAreas
export class VideoAreaContainer extends Component {
  _cachedStyle: null;

  shouldComponentUpdate(nextProps: PropsType): boolean {
    return nextProps.presetAreasService !== this.props.presetAreasService;
  }

  render() {
    const {children, presetAreasService, onResize} = this.props;
    const videoStyle = presetAreasService.calculateVideoStyles();

    if (onResize && (!this._cachedStyle || this._cachedStyle.width !== videoStyle.width || this._cachedStyle.height !== videoStyle.height)) {
      this._cachedStyle = videoStyle;
      onResize({width: videoStyle.width, height: videoStyle.height});
    }

    return children[0]({className: style.videoSize, style: videoStyle});
  }
}
