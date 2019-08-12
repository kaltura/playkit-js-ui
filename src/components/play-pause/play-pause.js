//@flow
import style from '../../styles/style.scss';
import {h} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import BaseComponent from '../base';
import {default as Icon, IconType} from '../icon';
import {KeyMap} from '../../utils/key-map';
import {isPlayingAdOrPlayback} from '../../reducers/getters';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPlayingAdOrPlayback: isPlayingAdOrPlayback(state.engine),
  isPlaying: state.engine.isPlaying,
  adBreak: state.engine.adBreak,
  isPlaybackEnded: state.engine.isPlaybackEnded
});

// TODO oren the name in the constructor is incorrect (should have been PlayPauseControl)
const COMPONENT_NAME = 'PlayPause';

@connect(mapStateToProps)
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
    super({name: COMPONENT_NAME, player: obj.player});
  }

  /**
   * toggle play / pause
   *
   * @returns {void}
   * @memberof PlayPauseControl
   */
  togglePlayPause(): void {
    this.logger.debug('Toggle play');
    this.props.isPlayingAdOrPlayback ? this.player.pause() : this.player.play();
    this.notifyClick();
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlayPauseControl
   */
  render(props: any): React$Element<any> | void {
    const controlButtonClass = this.props.isPlayingAdOrPlayback ? [style.controlButton, style.isPlaying].join(' ') : style.controlButton;
    return (
      <div className={[style.controlButtonContainer, style.controlPlayPause].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={
              <Text id={props.isPlaybackEnded ? 'controls.startOver' : this.props.isPlayingAdOrPlayback ? 'controls.pause' : 'controls.play'} />
            }
            className={controlButtonClass}
            onClick={() => this.togglePlayPause()}
            onKeyDown={e => {
              if (e.keyCode === KeyMap.ENTER) {
                this.togglePlayPause();
              }
            }}>
            {props.isPlaybackEnded ? (
              <Icon type={IconType.StartOver} />
            ) : (
              <div>
                <Icon type={IconType.Play} />
                <Icon type={IconType.Pause} />
              </div>
            )}
          </button>
        </Localizer>
      </div>
    );
  }
}

PlayPauseControl.displayName = COMPONENT_NAME;
export {PlayPauseControl};
