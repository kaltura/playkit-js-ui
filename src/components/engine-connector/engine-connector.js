//@flow
import {h} from 'preact';
import {connect} from 'preact-redux';
import {bindActions} from '../../utils/bind-actions';
import {default as reduce, actions} from '../../reducers/engine';
import {actions as loadingActions} from '../../reducers/loading';
import {actions as shellActions} from '../../reducers/shell';
import BaseComponent from '../base';
import {withPlayer} from '../player';

const COMPONENT_NAME = 'EngineConnector';

@connect(
  reduce,
  bindActions({...actions, ...loadingActions, ...shellActions})
)
@withPlayer
/**
 * EngineConnector component
 *
 * @class EngineConnector
 * @example <EngineConnector />
 * @extends {BaseComponent}
 */
class EngineConnector extends BaseComponent {
  /**
   * Creates an instance of EngineConnector.
   * @memberof EngineConnector
   */
  constructor() {
    super({name: COMPONENT_NAME});
  }

  /**
   * after component mounted, set event listeners and update redux store
   *
   * @returns {void}
   * @memberof EngineConnector
   */
  componentDidMount() {
    const {player} = this.props;
    const TrackType = player.Track;
    this.props.updatePrePlayback(!player.config.playback.autoplay);

    this.eventManager.listen(player, player.Event.PLAYER_RESET, () => {
      this.props.updateCurrentTime(0);
      this.props.updateIsIdle(true);
      this.props.updateIsPlaybackStarted(false);
    });

    this.eventManager.listen(player, player.Event.SOURCE_SELECTED, () => {
      this.props.updateIsVr(player.isVr());
      this.props.updateIsInPictureInPicture(player.isInPictureInPicture());
      if (player.config.playback.autoplay) {
        this.props.updateLoadingSpinnerState(true);
      } else {
        this.props.updateLoadingSpinnerState(false);
      }
    });

    this.eventManager.listen(player, player.Event.CHANGE_SOURCE_STARTED, () => {
      this.props.updatePrePlayback(!player.config.playback.autoplay && !this.props.engine.isPlaybackStarted);
      this.props.updateIsChangingSource(true);
      this.props.updateFallbackToMutedAutoPlay(false);
      this.props.updateAdBreak(false);
      this.props.updateAdIsPlaying(false);
      this.props.updateIsPlaying(false);
      this.props.updateIsEnded(false);
      this.props.updateIsPlaybackEnded(false);
      this.props.updateLastSeekPoint(0);
      this.props.updateIsPaused(false);
      if (this.props.engine.isCasting) {
        this.props.updateLoadingSpinnerState(true);
      }
    });

    this.eventManager.listen(player, player.Event.CHANGE_SOURCE_ENDED, () => {
      this.props.updateIsChangingSource(false);
      this.props.updatePlayerPoster(player.poster);
      this.props.updateIsIdle(false);
    });

    this.eventManager.listen(player, player.Event.PLAYER_STATE_CHANGED, e => {
      this.props.updatePlayerState(e.payload.oldState.type, e.payload.newState.type);
    });

    this.eventManager.listen(player, player.Event.TIME_UPDATE, () => {
      this.props.updateCurrentTime(player.currentTime);
    });

    this.eventManager.listen(player, player.Event.DURATION_CHANGE, () => {
      this.props.updateDuration(player.duration);
    });

    this.eventManager.listen(player, player.Event.LOADED_DATA, () => {
      this.props.updateDuration(player.duration);
      this.props.updatePictureInPictureSupport(player.isPictureInPictureSupported());
    });

    this.eventManager.listen(player, player.Event.LOADED_METADATA, () => {
      this.props.updateMuted(player.muted);
      this.props.updateMetadataLoadingStatus(true);
      this.props.updateIsLive(player.isLive());
      this.props.updateIsDvr(player.isDvr());
      this.props.updatePlayerPoster(player.poster);
    });

    this.eventManager.listen(player, player.Event.VOLUME_CHANGE, () => {
      this.props.updateVolume(player.volume);
    });

    this.eventManager.listen(player, player.Event.MUTE_CHANGE, () => {
      this.props.updateMuted(player.muted);
      if (this.props.engine.fallbackToMutedAutoPlay) {
        this.props.updateFallbackToMutedAutoPlay(player.muted);
      }
    });

    this.eventManager.listen(player, player.Event.PLAYBACK_START, () => {
      this.props.updatePrePlayback(false);
      this.props.updateIsPlaybackStarted(true);
      this.props.updateLoadingSpinnerState(true);
    });

    this.eventManager.listen(player, player.Event.AUTOPLAY_FAILED, () => {
      this.props.updatePrePlayback(true);
    });

    this.eventManager.listen(player, player.Event.PLAY, () => {
      this.props.updateIsPlaying(true);
      this.props.updateIsEnded(false);
      this.props.updateIsPaused(false);
      this.props.updateIsPlaybackEnded(false);
    });

    this.eventManager.listen(player, player.Event.PAUSE, () => {
      this.props.updateIsPlaying(false);
      this.props.updateIsPaused(true);
    });

    this.eventManager.listen(player, player.Event.SEEKING, () => {
      this.props.updateIsSeeking(true);
    });

    this.eventManager.listen(player, player.Event.SEEKED, () => {
      this.props.updateIsSeeking(false);
      this.props.updateLastSeekPoint(player.currentTime);
      this.props.updateIsPlaybackEnded(false);
    });

    this.eventManager.listen(player, player.Event.ENDED, () => {
      this.props.updateIsEnded(true);
      this.props.updateIsPlaying(false);
      this.props.updateIsPaused(true);
    });

    this.eventManager.listen(player, player.Event.PLAYBACK_ENDED, () => {
      this.props.updateIsPlaybackEnded(true);
    });

    this.eventManager.listen(player, player.Event.TRACKS_CHANGED, () => {
      let audioTracks = player.getTracks(TrackType.AUDIO);
      let videoTracks = player.getTracks(TrackType.VIDEO);
      let textTracks = player.getTracks(TrackType.TEXT);

      this.props.updateAudioTracks(audioTracks);
      this.props.updateVideoTracks(videoTracks);
      this.props.updateTextTracks(textTracks);
    });

    this.eventManager.listen(player, player.Event.TEXT_TRACK_CHANGED, () => {
      let tracks = player.getTracks(TrackType.TEXT);
      this.props.updateTextTracks(tracks);
    });

    this.eventManager.listen(player, player.Event.AUDIO_TRACK_CHANGED, () => {
      let tracks = player.getTracks(TrackType.AUDIO);
      this.props.updateAudioTracks(tracks);
    });

    this.eventManager.listen(player, player.Event.VIDEO_TRACK_CHANGED, () => {
      let tracks = player.getTracks(TrackType.VIDEO);
      this.props.updateVideoTracks(tracks);
    });

    this.eventManager.listen(player, player.Event.AD_BREAK_START, () => {
      this.props.updateHasError(false);
      this.props.updateAdBreak(true);
    });

    this.eventManager.listen(player, player.Event.AD_BREAK_END, () => {
      this.props.updateAdBreak(false);
    });

    this.eventManager.listen(player, player.Event.ALL_ADS_COMPLETED, () => {
      this.props.updateAdBreak(false);
    });

    this.eventManager.listen(player, player.Event.AD_PROGRESS, e => {
      let currentTime = e.payload.adProgress.currentTime;
      let duration = e.payload.adProgress.duration;

      this.props.updateAdBreakProgress(currentTime, duration);
    });

    this.eventManager.listen(player, player.Event.AD_COMPLETED, () => {
      this.props.updateAdBreakCompleted();
    });

    this.eventManager.listen(player, player.Event.AD_STARTED, () => {
      this.props.updateLoadingSpinnerState(false);
      this.props.updateAdIsPlaying(true);
    });

    this.eventManager.listen(player, player.Event.AD_RESUMED, () => {
      this.props.updateAdIsPlaying(true);
    });

    this.eventManager.listen(player, player.Event.AD_PAUSED, () => {
      this.props.updateAdIsPlaying(false);
    });

    this.eventManager.listen(player, player.Event.AD_ERROR, e => {
      if (e.payload.severity === player.Error.Severity.CRITICAL) {
        this.props.updateAdBreak(false);
      }
    });

    this.eventManager.listen(player, player.Event.FALLBACK_TO_MUTED_AUTOPLAY, () => {
      this.props.updateFallbackToMutedAutoPlay(true);
    });

    this.eventManager.listen(player, player.Event.AD_LOADED, e => {
      const ad = e.payload.ad;
      this.props.updateAdIsLinear(ad.linear);
      this.props.updateAdClickUrl(ad.clickThroughUrl);
      this.props.updateAdSkipTimeOffset(ad.skipOffset);
      this.props.updateAdSkippableState(ad.skippable);
    });

    this.eventManager.listen(player, player.Event.VR_STEREO_MODE_CHANGED, e => {
      this.props.updateVrStereoMode(e.payload.mode);
    });

    this.eventManager.listen(player, player.Event.ERROR, e => {
      if (e.payload.severity === player.Error.Severity.CRITICAL) {
        this.props.updateIsIdle(false);
        this.props.updateHasError(true);
      }
    });

    this.eventManager.listen(player, player.Event.Cast.CAST_SESSION_STARTED, e => {
      const session = e.payload.session;
      this.props.updateIsCasting(true);
      this.props.updateCastSession(session);
      if (session.resuming) {
        this.props.updateLoadingSpinnerState(false);
      }
    });

    this.eventManager.listen(player, player.Event.Cast.CAST_SESSION_ENDED, () => {
      this.props.updateIsCasting(false);
      this.props.updateCastSession(null);
    });

    this.eventManager.listen(player, player.Event.Cast.CAST_AVAILABLE, e => {
      const {available} = e.payload;
      this.props.updateIsCastAvailable(available);
    });

    this.eventManager.listen(player, player.Event.Playlist.PLAYLIST_ITEM_CHANGED, () => {
      this.props.updatePlaylist({next: player.playlist.next, prev: player.playlist.prev});
    });

    this.eventManager.listen(player, player.Event.ENTER_PICTURE_IN_PICTURE, () => {
      this.props.updateIsInPictureInPicture(true);
    });

    this.eventManager.listen(player, player.Event.LEAVE_PICTURE_IN_PICTURE, () => {
      this.props.updateIsInPictureInPicture(false);
    });

    this.eventManager.listen(player, player.Event.PRESENTATION_MODE_CHANGED, () => {
      player.isInPictureInPicture() ? this.props.updateIsInPictureInPicture(true) : this.props.updateIsInPictureInPicture(false);
    });

    this.eventManager.listen(player, player.Event.ENTER_FULLSCREEN, () => {
      this.props.updateFullscreen(true);
    });

    this.eventManager.listen(player, player.Event.EXIT_FULLSCREEN, () => {
      this.props.updateFullscreen(false);
    });
  }

  /**
   * component shouldn't update the dom if props or internal state changed
   *
   * @returns {boolean} - should component update on changes or not
   * @memberof EngineConnector
   */
  shouldComponentUpdate(): boolean {
    return false;
  }

  /**
   * render component
   *
   * @returns {React$Element} - component element
   * @memberof EngineConnector
   */
  render(): React$Element<any> {
    return <span />;
  }
}

EngineConnector.displayName = COMPONENT_NAME;
export {EngineConnector};
