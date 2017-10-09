//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/shell';

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
  playerHeight: state.shell.playerHeight,
  playerHover: state.shell.playerHover,
  seekbarDraggingActive: state.seekbar.draggingActive,
  adBreak: state.engine.adBreak
});

@connect(mapStateToProps, bindActions(actions))
/**
 * Shell component
 *
 * @class Shell
 * @example <Shell player={this.player}>...</Shell>
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
      this.props.updatePlayerHoverState(true);
      this.setState({hover: true});
    }
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout);
    }
    this.hoverTimeout = setTimeout(() => {
      if (!this.props.seekbarDraggingActive) {
        this.props.updatePlayerHoverState(false);
        this.setState({hover: false});
      }
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
      this.props.updatePlayerHoverState(false);
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
      this.props.updatePlayerHoverState(true);
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
    this.props.updateIsMobile(!!this.player.env.device.type);
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
    if (this.player.env.device.type) {
      this.props.updatePlayerHoverState(true);
    }
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof Shell
   */
  render(props: any): React$Element<any> {
    var playerClasses = 'player skin-default';
    playerClasses += ` ${props.playerClasses.join(' ')}`;

    if (this.props.isMobile) playerClasses += ` touch`;
    if (this.props.playerHover) playerClasses += ` hover`;
    if (this.props.metadataLoaded) playerClasses += ` metadata-loaded`;
    if (this.props.adBreak) playerClasses += ` ad-break`;
    if (this.props.metadataLoaded) playerClasses += ` state-${this.props.currentState}`;
    if (this.props.playerWidth <= 480) playerClasses += ' size-sm';
    else if (this.props.playerWidth <= 768) playerClasses += ' size-md';
    if (this.props.seekbarDraggingActive) playerClasses += ' hover';

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
