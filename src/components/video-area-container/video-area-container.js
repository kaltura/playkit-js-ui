//@flow
import {Component} from 'preact';
import {withPresetAreas} from '../preset-areas';
import style from '../../styles/style.scss';

@withPresetAreas
export class VideoAreaContainer extends Component {
  
  shouldComponentUpdate(nextProps: PropsType): boolean {
    return nextProps.presetAreasService !== this.props.presetAreasService;
  }

  render() {
    const {children, presetAreasService} = this.props;
    const videoStyle = presetAreasService.calculateVideoStyles();

    return children[0]({className: style.videoSize, style: videoStyle});
  }
}
