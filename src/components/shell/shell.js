//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/shell';
import { isMobile } from '../../utils/is-mobile';

const mapStateToProps = state => ({
  metadataLoaded: state.engine.metadataLoaded,
  currentState: state.engine.playerState.currentState,
  playerClasses: state.shell.playerClasses,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
class Shell extends BaseComponent {
  constructor() {
    super({name: 'Shell'});
  }

  onMouseOver() {
    this.props.addPlayerClass('hover');
  }

  onMouseLeave() {
    this.props.removePlayerClass('hover');
  }

  componentDidMount() {
    this.props.updateIsMobile(isMobile());
  }

  render(props) {
    var playerClasses = 'player skin-default';
    playerClasses += ` ${props.playerClasses.join(' ')}`;

    if (this.props.metadataLoaded) playerClasses += ` metadata-loaded`;
    if (this.props.metadataLoaded) playerClasses += ` state-${this.props.currentState}`;

    return (
      <div className={playerClasses} onMouseOver={() => this.onMouseOver()} onMouseLeave={() => this.onMouseLeave()}>
        { props.children }
      </div>
    )
  }
}

export default Shell;
