//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/shell';
import { isMobile } from '../../utils/is-mobile';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  metadataLoaded: state.engine.metadataLoaded,
  currentState: state.engine.playerState.currentState,
  playerClasses: state.shell.playerClasses,
  isMobile: state.shell.isMobile,
  playerWidth: state.shell.playerWidth,
  playerHeight: state.shell.playerHeight
});

@connect(mapStateToProps, bindActions(actions))
/**
 * Shell component
 *
 * @class Shell
 * @extends {BaseComponent}
 */
class Shell extends BaseComponent {
  state: Object;
  hoverTimeout: number;

  /**
   * Creates an instance of Shell.
   * @param {Object} obj obj
   * @memberof Shell
   */
  constructor(obj: Object) {
    super({name: 'Shell', player: obj.player});
  }

  /**
   * on mouse over, add hover class (shows the player ui) and timeout of 3 seconds bt default or what pass as prop configuration to component
   *
   * @returns {void}
   * @memberof Shell
   */
  onMouseOver(): void {
    if (!this.state.hover) {
      this.props.addPlayerClass('hover');
      this.setState({hover: true});
    }
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    this.hoverTimeout = setTimeout(() => {
      this.props.removePlayerClass('hover');
      this.setState({hover: false});
    }, this.props.hoverTimeout || 3000);
  }

  /**
   * on mouse leave, remove the hover class (hide the player gui)
   *
   * @returns {void}
   * @memberof Shell
   */
  onMouseLeave(): void {
    if (this.state.hover) {
      this.setState({hover: false});
      this.props.removePlayerClass('hover');
    }
  }

  /**
   * if ui hidden and mouse move, show the ui by adding the hover class
   *
   * @returns {void}
   * @memberof Shell
   */
  onMouseMove(): void {
    if (!this.state.hover) {
      this.setState({hover: true});
      this.props.addPlayerClass('hover');
    }
  }

  /**
   * after component mounted, update the isMobile indication in the store state,
   * add event listener to get the player width and update these on resize as well.
   * also, update document width initially and on resize.
   *
   * @returns {void}
   * @memberof Shell
   */
  componentDidMount() {
    this.props.updateIsMobile(isMobile());
    if (document.body) {
      this.props.updateDocumentWidth(document.body.clientWidth);
    }
      this.player.addEventListener(this.player.Event.LOADED_METADATA, () => {
        this.props.updatePlayerWidth(this.player.getView().parentElement.clientWidth);
      });
      window.addEventListener('resize', () => {
        this.props.updatePlayerWidth(this.player.getView().parentElement.clientWidth);

        if (document.body) {
          this.props.updateDocumentWidth(document.body.clientWidth);
        }
      });
    if (isMobile()) {
      this.props.addPlayerClass('touch');
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {Element} - component element
   * @memberof Shell
   */
  render(props: any): Element {
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
