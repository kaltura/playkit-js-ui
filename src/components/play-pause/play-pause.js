//@flow
import style from '../../styles/style.scss';
import {h, Component} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'preact-redux';
import {default as Icon, IconType} from '../icon';
import {isPlayingAdOrPlayback} from '../../reducers/getters';
import {withPlayer} from '../player';
import {withEventDispatcher} from 'components/event-dispatcher';
import {withLogger} from 'components/logger';
import {KeyMap} from 'utils/key-map';
import {withKeyboardEvent} from 'components/keyboard';
import {bindActions} from 'utils/bind-actions';
import {actions as settingActions} from 'reducers/settings';
import {actions as overlayIconActions} from 'reducers/overlay-action';

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

const COMPONENT_NAME = 'PlayPause';

@connect(
  mapStateToProps,
  bindActions({...settingActions, ...overlayIconActions})
)
@withPlayer
@withKeyboardEvent(COMPONENT_NAME)
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
/**
 * PlayPause component
 *
 * @class PlayPause
 * @example <PlayPause />
 * @extends {Component}
 */
class PlayPause extends Component {
  _keyboardEventHandlers: Array<KeyboardEventHandlers> = [
    {
      key: {
        code: KeyMap.SPACE
      },
      action: () => {
        this.props.isPlayingAdOrPlayback ? this.props.updateOverlayActionIcon(IconType.Pause) : this.props.updateOverlayActionIcon(IconType.Play);
        this.togglePlayPause();
      }
    }
  ];
  /**
   * component mounted
   *
   * @returns {void}
   * @memberof PlayPause
   */
  componentDidMount(): void {
    this.props.registerKeyboardEvents(this._keyboardEventHandlers);
  }

  /**
   * toggle play / pause
   *
   * @returns {void}
   * @memberof PlayPause
   */
  togglePlayPause(): void {
    this.props.logger.debug('Toggle play');
    this.props.isPlayingAdOrPlayback ? this.props.player.pause() : this.props.player.play();
    this.props.notifyClick();
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlayPause
   */
  render(props: any): React$Element<any> | void {
    const controlButtonClass = this.props.isPlayingAdOrPlayback ? [style.controlButton, style.isPlaying].join(' ') : style.controlButton;
    const isStartOver = props.isPlaybackEnded && !this.props.adBreak;
    return (
      <div className={[style.controlButtonContainer, style.controlPlayPause].join(' ')}>
        <Localizer>
          <button
            tabIndex="0"
            aria-label={<Text id={isStartOver ? 'controls.startOver' : this.props.isPlayingAdOrPlayback ? 'controls.pause' : 'controls.play'} />}
            className={controlButtonClass}
            onClick={() => this.togglePlayPause()}>
            {isStartOver ? (
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

PlayPause.displayName = COMPONENT_NAME;
export {PlayPause};
