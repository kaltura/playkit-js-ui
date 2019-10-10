//@flow
import {h, Component} from 'preact';
import {connect} from 'preact-redux';
import {Container} from '../container';
import {bindActions} from 'utils/bind-actions';
import {actions} from 'reducers/shell';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = (state) => ({
    activePresetName: state.shell.activePresetName
});

@connect(
  mapStateToProps,
  bindActions(actions)
)
export class PlayerArea extends Component {
  static defaultProps = {
  };

  render() {
    const {children, className, preAppendTo, activePresetName} = this.props;

    return (
      <Container key={activePresetName} className={className} name={'PlayerArea'} preAppendTo={preAppendTo}>
        {children}
      </Container>
    );
  }
}
