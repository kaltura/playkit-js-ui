//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import store from '../../store';

class Shell extends BaseComponent {
  constructor() {
    super({name: 'Shell'});
  }

  componentDidMount() {
    store.subscribe(() => {
      this.setState({
        metadataLoaded: store.getState().engine.metadataLoaded,
        currentState: store.getState().engine.playerState.currentState
      });
    })
  }

  render(props) {
    var playerClasses = 'player skin-default';
    if (this.state.metadataLoaded) playerClasses += ` metadata-loaded`;
    if (this.state.metadataLoaded) playerClasses += ` state-${this.state.currentState}`;

    return (
      <div className={playerClasses}>{ props.children }</div>
    )
  }
}

export default Shell;
