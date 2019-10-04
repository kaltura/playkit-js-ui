//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {Container} from '../container';
import {SidePanelsContainer} from '../side-panels-container';
import {bindActions} from 'utils/bind-actions';
import {actions} from 'reducers/shell';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = () => ({
  state: {}
});

@connect(
  mapStateToProps,
  bindActions(actions)
)
export class PresetArea extends Component {
  static defaultProps = {
    allowSidePanels: false
  };

  componentDidMount(): void {
    const {allowSidePanels} = this.props;
    this.props.updatePresetSettings({
      allowSidePanels
    });
  }

  render() {
    const {children, className, preAppendTo} = this.props;

    return (
      <Container className={className} name={'PresetArea'} preAppendTo={preAppendTo}>
        {children}
      </Container>
    );
  }
}
