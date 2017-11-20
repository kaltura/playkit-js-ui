//@flow
import style from './_play-pause.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {actions} from '../../reducers/play-pause';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPlaying: state.engine.isPlaying,
  adBreak: state.engine.adBreak,
  adIsPlaying: state.engine.adIsPlaying,
  isEnded: state.engine.isEnded
});

@connect(mapStateToProps, bindActions(actions))
  /**
   * PlayPauseControl component
   *
   * @class PlayPauseControl
   * @example <PlayPauseControl player={this.player} />
   * @extends {BaseComponent}
   */
class PlayPauseControl extends BaseComponent {

  /**
   * Creates an instance of PlayPauseControl.
   * @param {Object} obj obj
   * @memberof PlayPauseControl
   */
  constructor(obj: Object) {
    super({name: 'PlayPause', player: obj.player});
  }

  /**
   * toggle play / pause
   *
   * @returns {void}
   * @memberof PlayPauseControl
   */
  togglePlayPause(): void {
    this.logger.debug('Toggle play');
    this.isPlayingAdOrPlayback() ? this.player.pause() : this.player.play();
  }

  /**
   * check if currently playing ad or playback
   *
   * @returns {boolean} - if currently playing ad or playback
   * @memberof PlayPauseControl
   */
  isPlayingAdOrPlayback(): boolean {
    return (this.props.adBreak && this.props.adIsPlaying) || (!this.props.adBreak && this.props.isPlaying);
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlayPauseControl
   */
  render(props: any): React$Element<any> | void {
    const controlButtonClass = this.isPlayingAdOrPlayback() ? [style.controlButton, style.isPlaying].join(' ') : style.controlButton;

    return (
      <div className={[style.controlButtonContainer, style.controlPlayPause].join(' ')}>
        <Localizer>
          <button
            aria-label={<Text id={this.isPlayingAdOrPlayback() ? 'controls.pause' : 'controls.play'}/>}
            className={controlButtonClass}
            onClick={() => this.togglePlayPause()}
          >
            {props.isEnded && !props.adBreak ? <Icon type={IconType.StartOver}/> : (
              <div>
                <Icon type={IconType.Play}/>
                <Icon type={IconType.Pause}/>
              </div>
            )}

          </button>
        </Localizer>
      </div>
    )
  }
}

export default PlayPauseControl;
