//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import { connect } from 'preact-redux';

const mapStateToProps = state => ({
  metadataLoaded: state.engine.metadataLoaded,
  currentState: state.engine.playerState.currentState,
  playerClasses: state.shell.playerClasses
});

@connect(mapStateToProps)
class Shell extends BaseComponent {
  constructor() {
    super({name: 'Shell'});
  }

  render(props) {
    var playerClasses = 'player skin-default';
    playerClasses += ` ${props.playerClasses.join(' ')}`;

    if (this.props.metadataLoaded) playerClasses += ` metadata-loaded`;
    if (this.props.metadataLoaded) playerClasses += ` state-${this.props.currentState}`;

    return (
      <div className={playerClasses}>
        { props.children }
      </div>
    )
  }
}

export default Shell;
