import style from '../../styles/style.scss';
import { h, Component, VNode, RefObject, createRef } from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {default as Icon, IconType} from '../icon';
import {isPlayingAdOrPlayback} from '../../reducers/getters';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {withLogger} from '../logger';
import {bindActions, KeyMap} from '../../utils';
import {actions as settingActions} from '../../reducers/settings';
import {actions as overlayIconActions} from '../../reducers/overlay-action';
import {Tooltip} from '../../components/tooltip';
import {Button} from '../button';
import {actions as shellActions} from '../../reducers/shell';
import {ButtonControl} from '../button-control';
import {withEventManager} from '../../event';
import {PLAYER_SIZE} from '../shell';

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  isPlayingAdOrPlayback: isPlayingAdOrPlayback(state.engine),
  isPlaying: state.engine.isPlaying,
  adBreak: state.engine.adBreak,
  isPlaybackEnded: state.engine.isPlaybackEnded,
  playerSize: state.shell.playerSize
});

const COMPONENT_NAME = 'PlayPause';

/**
 * PlayPause component
 *
 * @class PlayPause
 * @example <PlayPause />
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions({...shellActions, ...settingActions, ...overlayIconActions}))
@withPlayer
@withLogger(COMPONENT_NAME)
@withEventDispatcher(COMPONENT_NAME)
@withEventManager
@withText({
  startOverText: 'controls.startOver',
  pauseText: 'controls.pause',
  playText: 'controls.play',
  title: 'controls.title'
})
class PlayPause extends Component<any, any> {
  private _playPauseButtonRef?: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();

  state = {
    entryName: ''
  };

  /**
   * component mounted
   *
   * @returns {void}
   * @memberof PlayPause
   */
  componentDidMount(): void {
    const {eventManager, player} = this.props;
    const smallSizes = [PLAYER_SIZE.TINY, PLAYER_SIZE.EXTRA_SMALL, PLAYER_SIZE.SMALL];
    eventManager.listenOnce(player, player.Event.UI.USER_CLICKED_PLAY, () => {
      eventManager.listenOnce(player, player.Event.Core.FIRST_PLAY, () => {
        if (!smallSizes.includes(this.props.playerSize)) {
          this._playPauseButtonRef?.current?.querySelector("button")?.focus();
        }
      });
    });
    eventManager.listenOnce(player, player.Event.Core.CHANGE_SOURCE_ENDED, () => {
      const entryName = player.sources?.metadata?.name;
      if (entryName) {
        this.setState({ entryName });
      }
    });
  }

  /**
   * toggle play / pause
   *
   * @returns {void}
   * @memberof PlayPause
   */
  togglePlayPause = (): void => {
    this.props.logger.debug('Toggle play');
    this.props.isPlayingAdOrPlayback ? this.props.player.pause() : this.props.player.play();
    this.props.notifyClick();
  };

  onKeyDown = (e: KeyboardEvent): void => {      
    if (e.keyCode === KeyMap.ENTER) {
      e.preventDefault();
      e.stopPropagation();
      this.togglePlayPause();
    } 
  };

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlayPause
   */
  render(props: any): VNode<any> | undefined {
    const controlButtonClass = this.props.isPlayingAdOrPlayback ? [style.controlButton, style.isPlaying].join(' ') : style.controlButton;
    const isStartOver = props.isPlaybackEnded && !this.props.adBreak;
    const entryName = `${this.props.title}: ${this.state.entryName}`;
    const playbackStateText = this.props.isPlayingAdOrPlayback ? this.props.pauseText : this.props.playText;
    const labelText = isStartOver ? this.props.startOverText : playbackStateText;
    return (

      <ButtonControl name={COMPONENT_NAME}>
        <div ref={this._playPauseButtonRef} >
          <Tooltip label={labelText}>
            <Button
              tabIndex="0"
              aria-label={`${labelText}, ${entryName}`}
              className={controlButtonClass}
              onClick={this.togglePlayPause}
              onKeyDown={this.onKeyDown}
            >
              {isStartOver ? (
                <Icon type={IconType.StartOver} />
              ) : (
                <div>
                  <Icon type={IconType.Play} />
                  <Icon type={IconType.Pause} />
                </div>
              )}
            </Button>
          </Tooltip>
        </div>
      </ButtonControl>

  )
    ;
  }
}

PlayPause.displayName = COMPONENT_NAME;
export {PlayPause};
