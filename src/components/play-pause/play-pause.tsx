import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {withText} from 'preact-i18n';
import {connect} from 'react-redux';
import {default as Icon, IconType} from '../icon';
import {isPlayingAdOrPlayback} from '../../reducers/getters';
import {withPlayer} from '../player';
import {withEventDispatcher} from '../event-dispatcher';
import {withLogger} from '../logger';
import {bindActions} from '../../utils';
import {actions as settingActions} from '../../reducers/settings';
import {actions as overlayIconActions} from '../../reducers/overlay-action';
import {Tooltip} from '../../components/tooltip';
import {Button} from '../button';
import {actions as shellActions} from '../../reducers/shell';
import {ButtonControl} from '../button-control';
import {withEventManager} from '../../event';

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
  playText: 'controls.play'
})
class PlayPause extends Component<any, any> {
  /**
   * component mounted
   *
   * @returns {void}
   * @memberof PlayPause
   */
  componentDidMount(): void {
    const {eventManager, player} = this.props;
    const playerContainer: HTMLDivElement = document.getElementById(player.config.ui.targetId) as HTMLDivElement;
    eventManager.listenOnce(player, player.Event.UI.USER_CLICKED_PLAY, () => {
      eventManager.listenOnce(player, player.Event.Core.FIRST_PLAY, () => {
        playerContainer.focus();
        playerContainer.setAttribute('role', 'application'); // Set JAWS screen reader into 'forms' mode, where keys are passed through to the web-page.
      });
    });
    eventManager.listen(document, 'keydown', event => {
      if (event.code === 'Space' || event.code === 'Enter') {
        if (document.activeElement === playerContainer) {
          event.preventDefault();
          this.props.isPlayingAdOrPlayback ? this.props.updateOverlayActionIcon(IconType.Pause) : this.props.updateOverlayActionIcon(IconType.Play);
          this.togglePlayPause();
          this.props.updatePlayerHoverState(true);
        }
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
    const playbackStateText = this.props.isPlayingAdOrPlayback ? this.props.pauseText : this.props.playText;
    const labelText = isStartOver ? this.props.startOverText : playbackStateText;
    return (
      <ButtonControl name={COMPONENT_NAME}>
        <Tooltip label={labelText}>
          <Button tabIndex="0" aria-label={labelText} className={controlButtonClass} onClick={this.togglePlayPause}>
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
      </ButtonControl>
    );
  }
}

PlayPause.displayName = COMPONENT_NAME;
export {PlayPause};
