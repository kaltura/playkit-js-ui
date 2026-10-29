//@flow
import style from '../../styles/style.scss';
import {h, Component, VNode} from 'preact';
import {Localizer, Text} from 'preact-i18n';
import {connect} from 'react-redux';
import {default as Icon, IconType} from '../icon';
import {KeyMap, bindActions, hasTimeToShow} from '../../utils';
import {withPlayer} from '../player';
import {withLogger} from '../logger';
import {actions} from '../../reducers/playlist';
import {Button} from '../button';

/**
 * The maximum next item poster width
 * @type {number}
 * @const
 */
const MAX_POSTER_WIDTH: number = 384;

/**
 * mapping state to props
 * @param {*} state - redux store state
 * @returns {Object} - mapped state to this component
 */
const mapStateToProps = state => ({
  playlist: state.engine.playlist,
  isPlaybackEnded: state.engine.isPlaybackEnded,
  countdownCanceled: state.playlist.countdownCanceled
});

const COMPONENT_NAME = 'PlaylistNextScreen';

/**
 * PlaylistNextScreen component
 *
 * @class PlaylistNextScreen
 * @example <PlaylistNextScreen type="next"/>
 * @extends {Component}
 */
@connect(mapStateToProps, bindActions(actions))
@withPlayer
@withLogger(COMPONENT_NAME)
class PlaylistNextScreen extends Component<any, any> {
  focusElement!: HTMLDivElement;
  countdownTimer?: number;

  /**
   * constructor
   * @param {*} props - component props
   * @returns {void}
   */
  constructor(props: any) {
    super(props);
    this.state = {secondsLeft: 0};
  }

  /**
   * if mounted while the screen should already be shown, then focus for keyboard a11y and start the countdown
   * @returns {void}
   * @memberof PlaylistNextScreen
   */
  componentDidMount(): void {
    if (this._shouldRender(this.props)) {
      this.focusElement && this.focusElement.focus();
      this._startCountdown();
    }
  }

  /**
   * after component updated, if was renderd and now should then focus for keyboard a11y and start the countdown
   * @param {Object} previousProps - previous props
   * @returns {void}
   * @memberof PlaylistNextScreen
   */
  componentDidUpdate(previousProps: any): void {
    const wasRendered = this._shouldRender(previousProps);
    const isRendered = this._shouldRender(this.props);
    if (!wasRendered && isRendered) {
      this.focusElement && this.focusElement.focus();
      this._startCountdown();
    } else if (wasRendered && !isRendered) {
      this._clearCountdownTimer();
    }
    if (isRendered && !previousProps.countdownCanceled && this.props.countdownCanceled) {
      // the cancel button is removed on cancel, so give the focus back to the poster
      this.focusElement && this.focusElement.focus();
    }
    // PlaylistCountdown resets this flag while playing, but it stops updating once playback ended, so a cancel lasts until the replay
    if (previousProps.isPlaybackEnded && !this.props.isPlaybackEnded && this.props.countdownCanceled) {
      this.props.updatePlaylistCountdownCanceled(false);
    }
  }

  /**
   * component will unmount handler
   * @returns {void}
   * @memberof PlaylistNextScreen
   */
  componentWillUnmount(): void {
    this._clearCountdownTimer();
  }

  /**
   * whether the next item starts on its own once the countdown on this screen is over.
   * When countdown.timeToShow is configured the in-video countdown pop-up is used instead.
   * @param {*} props - component props
   * @returns {boolean} - is the countdown mode
   * @private
   */
  _isCountdownMode(props: any): boolean {
    const {options, countdown} = props.player.playlist;
    return !!(countdown.showing && !hasTimeToShow(countdown.timeToShow) && (options.autoContinue || options.loop));
  }

  /**
   * should render component
   * @param {*} props - component props
   * @returns {boolean} - component element
   */
  _shouldRender(props: any): boolean {
    return !!(
      props.playlist &&
      props.playlist.next &&
      props.playlist.next.sources &&
      props.isPlaybackEnded &&
      (this._isCountdownMode(props) || !props.player.playlist.options.autoContinue)
    );
  }

  /**
   * starts counting down to the next item
   * @returns {void}
   * @private
   */
  _startCountdown(): void {
    this._clearCountdownTimer();
    if (!this._isCountdownMode(this.props) || this.props.countdownCanceled) {
      return;
    }
    const secondsLeft = Math.max(0, Math.ceil(this.props.player.playlist.countdown.duration));
    if (!secondsLeft) {
      this.props.player.playlist.playNext();
      return;
    }
    this.setState({secondsLeft});
    this.countdownTimer = window.setInterval(() => {
      const left = this.state.secondsLeft - 1;
      if (left > 0) {
        this.setState({secondsLeft: left});
      } else {
        this._clearCountdownTimer();
        this.props.player.playlist.playNext();
      }
    }, 1000);
  }

  /**
   * stops the countdown timer
   * @returns {void}
   * @private
   */
  _clearCountdownTimer(): void {
    if (this.countdownTimer) {
      window.clearInterval(this.countdownTimer);
      this.countdownTimer = undefined;
    }
  }

  /**
   * cancel the automatic switch to the next item
   *
   * @param {Event} e - click or key event
   * @returns {void}
   * @memberof PlaylistNextScreen
   */
  cancelNext = (e: any): void => {
    this.props.logger.debug('Cancel auto play next item');
    e.stopPropagation();
    this._clearCountdownTimer();
    this.props.updatePlaylistCountdownCanceled(true);
  };

  /**
   * next poster click handler
   *
   * @returns {void}
   * @memberof PlaylistNextScreen
   */
  onPosterClick = (): void => {
    this.props.player.playlist.playNext();
  };

  /**
   * poster key down handler
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof PlaylistNextScreen
   */
  onKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ENTER || e.keyCode === KeyMap.SPACE) {
      e.preventDefault();
      this.onPosterClick();
    }
  };

  /**
   * overlay key down handler, ESC cancels the countdown wherever the focus is on the screen
   *
   * @param {KeyboardEvent} e - keyboard event
   * @returns {void}
   * @memberof PlaylistNextScreen
   */
  onOverlayKeyDown = (e: KeyboardEvent): void => {
    if (e.keyCode === KeyMap.ESC && this.countdownTimer) {
      this.cancelNext(e);
    }
  };

  /**
   * @private
   * @memberof PlaylistNextScreen
   * @returns {string} - Next poster URL
   */
  _getPosterUrl(): string {
    const next = this.props.playlist.next;
    if (next.sources.poster) {
      return next.sources.poster.indexOf(`entry_id/${next.sources.id}`) > -1 && next.sources.poster.indexOf('/width/') === -1
        ? `${next.sources.poster}/width/${MAX_POSTER_WIDTH}`
        : next.sources.poster;
    }
    return '';
  }

  /**
   * render component
   *
   * @param {*} props - component props
   * @returns {React$Element} - component element
   * @memberof PlaylistNextScreen
   */
  render(props: any): VNode<any> | undefined {
    if (!this._shouldRender(props)) {
      return undefined;
    }
    const next = props.playlist.next;
    const isCounting = this._isCountdownMode(props) && !props.countdownCanceled;
    return (
      <div className={style.playlistNextScreenOverlay} onKeyDown={this.onOverlayKeyDown}>
        {isCounting && (
          <div className={style.playlistNextScreenCancel}>
            <Localizer>
              <Button aria-label={<Text id="playlist.cancel" />} className={style.controlButton} onClick={this.cancelNext}>
                <Icon type={IconType.Close} />
              </Button>
            </Localizer>
          </div>
        )}
        <div className={style.playlistNextScreenContent}>
          <div id="playlistNextScreenTextId" className={style.playlistNextScreenText}>
            <Localizer>
              <div className={style.playlistNextScreenTextTitle}>
                {isCounting ? <Text id="playlist.up_next_in" /> : <Text id="playlist.next" />}
                {isCounting && (
                  <div className={style.playlistNextScreenTimeLeft}>
                    {this.countdownTimer ? this.state.secondsLeft : Math.ceil(props.player.playlist.countdown.duration)}
                  </div>
                )}
              </div>
            </Localizer>
            <div className={style.playlistNextScreenTextName}>{`${next.sources.metadata ? next.sources.metadata.name : ''}`}</div>
          </div>
          <div className={style.playlistNextScreenPosterPlaceholder}>
            <div className={style.playlistNextScreenPosterAspectRatio}>
              <div
                role="button"
                aria-labelledby="playlistNextScreenTextId"
                ref={el => (el ? (this.focusElement = el) : undefined)}
                tabIndex={0}
                className={style.playlistNextScreenPoster}
                onClick={this.onPosterClick}
                onKeyDown={this.onKeyDown}
              >
                <div className={style.playlistNextScreenPosterImg} style={`background-image: url(${this._getPosterUrl()});`} />
                <Icon type={IconType.Play} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PlaylistNextScreen.displayName = COMPONENT_NAME;
export {PlaylistNextScreen};
