//@flow
import {h, Component} from 'preact';
import {withPresetAreas} from '../preset-areas';
import style from '../../styles/style.scss';

// todo sakal change to video-area component
@withPresetAreas
export class PresetVideoAreaContainer extends Component {
  shouldComponentUpdate(nextProps: PropsType): boolean {
    return nextProps.presetAreasService !== this.props.presetAreasService;
  }

  render() {
    const {children, presetAreasService} = this.props;
    const videoStyle = presetAreasService.calculateVideoStyles();
    console.log(`sakal render Preset Video Area  Container`);
    return children[0]({ className: style.videoSize, style: videoStyle});
  }
}
