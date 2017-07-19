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
  isMobile: state.shell.isMobile,
  isAd: state.shell.isAd,
  playerWidth: state.shell.playerWidth,
  playerHeight: state.shell.playerHeight
});

@connect(mapStateToProps, bindActions(actions))
class Shell extends BaseComponent {
  state: Object;

  constructor(obj: Object) {
    super({name: 'Shell', player: obj.player});
  }

  onMouseOver() {
    if (!this.state.hover) {
      this.props.addPlayerClass('hover');
      this.setState({hover: true});
    }
  }

  onMouseLeave() {
    if (this.state.hover) {
      this.setState({hover: false});
      this.props.removePlayerClass('hover');
    }
  }

  onMouseMove() {
    if (!this.state.hover) {
      this.setState({hover: true});
      this.props.addPlayerClass('hover');
    }
  }

  componentDidMount() {
    this.props.updateIsMobile(isMobile());
    if (document.body) {
      this.props.updateDocumentWidth(document.body.clientWidth);
    }
    this.player.addEventListener(this.player.Event.LOADED_METADATA, () => {
      this.props.updatePlayerWidth(this.player._el.parentElement.clientWidth);
    });
    window.addEventListener('resize', () => {
      this.props.updatePlayerWidth(this.player._el.parentElement.clientWidth);

      if (document.body) {
        this.props.updateDocumentWidth(document.body.clientWidth);
      }
    });

    document.addEventListener('keydown', e => {
      if (e.keyCode === 9) {
        this.props.addPlayerClass('keyboard-focused');
      }
    });

    document.addEventListener('click', () => {
      this.props.removePlayerClass('keyboard-focused');
    });

    if (isMobile()) {
      this.props.addPlayerClass('touch');
    }
  }

  render(props: any) {
    var playerClasses = 'player skin-default';
    playerClasses += ` ${props.playerClasses.join(' ')}`;

    if (this.props.metadataLoaded) playerClasses += ` metadata-loaded`;
    if (this.props.metadataLoaded) playerClasses += ` state-${this.props.currentState}`;

    return (
      <div
        className={playerClasses}
        onMouseOver={() => this.onMouseOver()}
        onMouseMove={() => this.onMouseMove()}
        onMouseLeave={() => this.onMouseLeave()}
      >
        { props.children }
      </div>
    )
  }
}

export default Shell;
