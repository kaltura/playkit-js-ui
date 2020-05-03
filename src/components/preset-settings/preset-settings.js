//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from 'utils/bind-actions';
import {actions} from 'reducers/shell';
import {withPlayer} from '../player';
import {PlayerArea} from '../player-area';

@withPlayer
@connect(
  state => ({
    activePresetName: state.shell.activePresetName
  }),
  bindActions(actions)
)
export class PresetSettings extends Component {

  _removePreVideoAreaComponent = null;

  static defaultProps = {
    allowSidePanels: false,
    allowPlayerArea: false,
    allowVideoArea: false
  };

  shouldComponentUpdate(): boolean {
    return false;
  }

  componentDidMount(): void {
    const {activePresetName, allowSidePanels, allowPlayerArea, allowVideoArea, preVideoAreaRenderer} = this.props;
    this.props.updatePresetSettings({
      allowSidePanels,
      allowPlayerArea,
      allowVideoArea
    });

    if (!preVideoAreaRenderer || !activePresetName) {
      return null;
    }

    this._removePreVideoAreaComponent = this.context.presetComponentsStore.addNewComponent(
      {
        label: 'active-preset-pre-video-content',
        area: 'PreVideoArea',
        get: () => preVideoAreaRenderer,  
        presets: [activePresetName]
      }
    )

  }

  /**
   * componentWillUnmount
   *
   * @returns {void}
   */
  componentWillUnmount(): void {
    if (!this._removePreVideoAreaComponent) {
      return;
    }

    this._removePreVideoAreaComponent();
  }

  render() {
    const {children, className, preAppendTo} = this.props;

    return (
    <PlayerArea className={className} name={'PlayerArea'} preAppendTo={preAppendTo}>
      {children}
    </PlayerArea>
    )
  }
}
