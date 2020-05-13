//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from 'utils/bind-actions';
import {actions} from 'reducers/shell';
import {withPlayer} from '../player';
import {PlayerArea} from '../player-area';

@withPlayer
@connect(
  null,
  bindActions(actions)
)
export class PresetSettings extends Component {
  static defaultProps = {
    allowSidePanels: false,
    allowPlayerArea: false,
    allowVideoArea: false
  };

  shouldComponentUpdate(): boolean {
    return false;
  }

  componentDidMount(): void {
    const {allowSidePanels, allowPlayerArea, allowVideoArea} = this.props;
    this.props.updatePresetSettings({
      allowSidePanels,
      allowPlayerArea,
      allowVideoArea
    });
  }

  render() {
    return null;
  }
}
