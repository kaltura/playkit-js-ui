//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import { connect } from 'preact-redux';

function mapStateToProps(state) {
  return {
    metadataLoaded: state.engine.metadataLoaded,
    currentState: state.engine.playerState.currentState
  };
}

@connect(mapStateToProps)
class Shell extends BaseComponent {
  constructor() {
    super({name: 'Shell'});
  }

  render(props) {
    var playerClasses = 'player skin-default';
    if (this.props.metadataLoaded) playerClasses += ` metadata-loaded`;
    if (this.props.metadataLoaded) playerClasses += ` state-${this.props.currentState}`;

    return (
      <div className={playerClasses}>{ props.children }</div>
    )
  }
}

export default Shell;
