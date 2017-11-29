//@flow
import {h} from 'preact';
import style from './_overlay-action.scss';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/overlay-action';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  iconType: state.overlayAction.iconType,
  isPlaying: state.engine.isPlaying,
  adBreak: state.engine.adBreak,
  adIsPlaying: state.engine.adIsPlaying,
  playerHover: state.shell.playerHover,
  isMobile: state.shell.isMobile
});

/**
 * Default overlay action timeout
 * @type {number}
 * @const
 */
export const OVERLAY_ACTION_DEFAULT_TIMEOUT = 300;

@connect(mapStateToProps, bindActions(actions))
  /**
   * OverlayAction component
   *
   * @class OverlayAction
   * @example <OverlayAction player={this.player} />
   * @extends {BaseComponent}
   */
class OverlayAction extends BaseComponent {
  state: Object;
  _iconTimeout: ?number = null;

  /**
   * Creates an instance of OverlayAction.
   * @param {Object} obj obj
   * @memberof OverlayAction
   */
  constructor(obj: Object) {
    super({name: 'OverlayAction', player: obj.player});
  }

  /**
   * check if currently playing ad or playback
   *
   * @returns {boolean} - if currently playing ad or playback
   * @memberof OverlayAction
   */
  isPlayingAdOrPlayback(): boolean {
    return (this.props.adBreak && this.props.adIsPlaying) || (!this.props.adBreak && this.props.isPlaying);
  }

  /**
   * toggle play pause and set animation to icon change
   *
   * @returns {void}
   * @memberof OverlayAction
   */
  togglePlayPause(): void {
    if (this.isPlayingAdOrPlayback()) {
      this.player.pause();
      this.props.updateOverlayActionIcon(IconType.Pause);
    } else {
      this.player.play();
      this.props.updateOverlayActionIcon(IconType.Play);
    }
  }

  /**
   * handler for overlay click
   *
   * @returns {void}
   * @memberof OverlayAction
   */
  onOverlayClick(): void {
    if (!this.props.isMobile || this.props.isMobile && this.props.playerHover) {
      this.togglePlayPause();
    }
  }

  /**
   * should component update handler
   *
   * @returns {boolean} - always update component
   * @param {Object} nextProps - next props of the component
   * @memberof OverlayAction
   */
  shouldComponentUpdate(nextProps: Object): boolean {
    if (nextProps.iconType) {
      this.toggleOverlayActionIcon(nextProps.iconType);
    }
    return true;
  }

  /**
   * toggles the overlay action icon
   *
   * @param {string | Array<string>} iconType - the icon string or array of icon strings
   * @returns {void}
   * @memberof OverlayAction
   */
  toggleOverlayActionIcon(iconType: string | Array<string>): void {
    if (this._iconTimeout !== null) {
      clearTimeout(this._iconTimeout);
      this._iconTimeout = null;
      this.setState({animation: false});
      this.forceUpdate();
    }
    this.setState({animation: true, iconType: iconType});
    this._iconTimeout = setTimeout(() => {
      this.setState({animation: false});
    }, OVERLAY_ACTION_DEFAULT_TIMEOUT);
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof OverlayAction
   */
  render(): React$Element<any> {
    return (
      <div className={`${style.overlayAction} ${this.state.animation ? style.in : ''}`}
           onClick={() => this.onOverlayClick()}>
        {this.state.animation ? this.renderIcons() : undefined}
      </div>
    )
  }

  /**
   * renders the icons
   *
   * @returns {React$Element} - icon element/s
   * @memberof OverlayAction
   */
  renderIcons(): React$Element<any> {
    if (Array.isArray(this.state.iconType)) {
      return this.state.iconType.map((i, x) => <Icon key={x} type={i}/>);
    }
    return <Icon type={this.state.iconType}/>;
  }

  /**
   * component did update handler
   *
   * @returns {void}
   * @memberof OverlayAction
   */
  componentDidUpdate(): void {
    if (this.state.animation) {
      this.props.updateOverlayActionIcon(null);
    }
  }
}

export default OverlayAction;
