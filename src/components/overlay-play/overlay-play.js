//@flow
import { h } from 'preact';
import { connect } from 'preact-redux';
import { bindActions } from '../../utils/bind-actions';
import { actions } from '../../reducers/play-pause';
import BaseComponent from '../base';
import { default as Icon, IconType } from '../icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPlaying: state.engine.isPlaying,
  adBreak: state.engine.adBreak,
  adIsPlaying: state.engine.adIsPlaying,
  playerHover: state.shell.playerHover,
  isMobile: state.shell.isMobile
});

@connect(mapStateToProps, bindActions(actions))
/**
 * OverlayPlay component
 *
 * @class OverlayPlay
 * @example <OverlayPlay player={this.player} />
 * @extends {BaseComponent}
 */
class OverlayPlay extends BaseComponent {
  state: Object;

  /**
   * Creates an instance of OverlayPlay.
   * @param {Object} obj obj
   * @memberof OverlayPlay
   */
  constructor(obj: Object) {
    super({name: 'OverlayPlay', player: obj.player});
  }

  /**
   * check if currently playing ad or playback
   *
   * @returns {boolean} - if currently playing ad or playback
   * @memberof OverlayPlay
   */
  isPlayingAdOrPlayback(): boolean {
    return (this.props.adBreak && this.props.adIsPlaying) || (!this.props.adBreak && this.props.isPlaying);
  }

  /**
   * toggle play pause and set animation to icon change
   *
   * @returns {void}
   * @memberof OverlayPlay
   */
  togglePlayPause(): void {
    this.logger.debug('Toggle play');
    this.setState({animation: true});
    setTimeout(() => {
      this.setState({animation: false});
    }, 400);

    this.isPlayingAdOrPlayback() ? this.player.pause() : this.player.play();
  }

  /**
   * handler for overlay click
   *
   * @returns {void}
   * @memberof OverlayPlay
   */
  onOverlayClick(): void {
    if (!this.props.isMobile || this.props.isMobile && this.props.playerHover) {
      this.togglePlayPause();
    }
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof OverlayPlay
   */
  render(): React$Element<any> {
    return (
      <div className={`kp-overlay-play ${this.state.animation ? 'kp-in' : ''}`} onClick={() => this.onOverlayClick()}>
        { this.isPlayingAdOrPlayback() ? <Icon type={IconType.Play} /> : <Icon type={IconType.Pause} /> }
      </div>
    )
  }
}

export default OverlayPlay;
