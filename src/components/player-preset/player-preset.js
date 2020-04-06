//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from 'utils/bind-actions';
import {actions} from 'reducers/shell';
import {withPlayer} from '../player';
import {Container} from '../container';


@withPlayer
@connect(
  state => ({
    activePresetName: state.shell.activePresetName
  }),
  bindActions(actions)
)
export class PlayerPreset extends Component {

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
    const {activePresetName, allowSidePanels, allowPlayerArea, allowVideoArea, preVideoArea} = this.props;
    this.props.updatePresetSettings({
      allowSidePanels,
      allowPlayerArea,
      allowVideoArea
    });

    if (!preVideoArea || !activePresetName) {
      return null;
    }

    this._removePreVideoAreaComponent = this.context.presetComponentsStore.addNewComponent(
      {
        label: 'active-preset-pre-video-content',
        container: 'PreVideoArea',
        get: () => preVideoArea,  
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
    <Container className={className} name={'PresetArea'} preAppendTo={preAppendTo}>
      {children}
    </Container>
    )
  }
}
