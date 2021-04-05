//@flow
import {h, Component} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils/bind-actions';
import {default as reduce, actions} from '../../reducers/engine';
import {actions as loadingActions} from '../../reducers/loading';
import {actions as shellActions} from '../../reducers/shell';
import {withPlayer} from '../player';
import {withEventManager} from 'event/with-event-manager';
import {withLogger} from 'components/logger';

const COMPONENT_NAME = 'EngineConnector';

/**
 * EngineConnector component
 *
 * @class EngineConnector
 * @example <EngineConnector />
 * @extends {Component}
 */
@connect(reduce, bindActions({...actions, ...loadingActions, ...shellActions}))
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
class EngineConnector extends Component {
  /**
   * after component mounted, set event listeners and update redux store
   *
   * @returns {void}
   * @memberof EngineConnector
   */
  componentDidMount() {
    const {player, eventManager} = this.props;
    const TrackType = player.Track;
    this.props.updatePrePlayback(!player.config.playback.autoplay);

    eventManager.listen(player, player.Event.PLAYER_RESET, () => {
      this.props.updateCurrentTime(0);
      this.props.updateIsIdle(true);
      this.props.updateIsPlaybackStarted(false);
    });

    eventManager.listen(player, player.Event.SOURCE_SELECTED, () => {
      this.props.updateIsCastAvailable(player.isCastAvailable());
      this.props.updateIsVr(player.isVr());
      this.props.updateIsInPictureInPicture(player.isInPictureInPicture());
      if (player.config.playback.autoplay) {
        this.props.updateLoadingSpinnerState(true);
      } else {
        this.props.updateLoadingSpinnerState(false);
      }
    });

    eventManager.listen(player, player.Event.CHANGE_SOURCE_STARTED, () => {
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

    eventManager.listen(player, player.Event.CHANGE_SOURCE_ENDED, () => {
      this.props.updateIsChangingSource(false);
      this.props.updatePlayerPoster(player.poster);
      this.props.updateIsIdle(false);
    });

    eventManager.listen(player, player.Event.PLAYER_STATE_CHANGED, e => {
      this.props.updatePlayerState(e.payload.oldState.type, e.payload.newState.type);
    });

    eventManager.listen(player, player.Event.TIME_UPDATE, () => {
      this.props.updateCurrentTime(player.isLive() ? player.liveTime : player.currentTime);
    });

    eventManager.listen(player, player.Event.DURATION_CHANGE, () => {
      this.props.updateDuration(player.duration);
    });

    eventManager.listen(player, player.Event.LOADED_DATA, () => {
      this.props.updateDuration(player.duration);
      this.props.updatePictureInPictureSupport(player.isPictureInPictureSupported());
    });

    eventManager.listen(player, player.Event.LOADED_METADATA, () => {
      this.props.updateMuted(player.muted);
      this.props.updateMetadataLoadingStatus(true);
      this.props.updateIsLive(player.isLive());
      this.props.updateIsDvr(player.isDvr());
      this.props.updatePlayerPoster(player.poster);
    });

    eventManager.listen(player, player.Event.VOLUME_CHANGE, () => {
      this.props.updateVolume(player.volume);
    });

    eventManager.listen(player, player.Event.MUTE_CHANGE, () => {
      this.props.updateMuted(player.muted);
      if (this.props.engine.fallbackToMutedAutoPlay) {
        this.props.updateFallbackToMutedAutoPlay(player.muted);
      }
    });

    eventManager.listen(player, player.Event.PLAYBACK_START, () => {
      this.props.updatePrePlayback(false);
      this.props.updateIsPlaybackStarted(true);
      this.props.updateLoadingSpinnerState(true);
    });

    eventManager.listen(player, player.Event.AUTOPLAY_FAILED, () => {
      this.props.updatePrePlayback(true);
    });

    eventManager.listen(player, player.Event.FIRST_PLAY, () => {
      this.props.updatePrePlayback(false);
    });

    eventManager.listen(player, player.Event.PLAY, () => {
      this.props.updateIsPlaying(true);
      this.props.updateIsEnded(false);
      this.props.updateIsPaused(false);
      this.props.updateIsPlaybackEnded(false);
    });

    eventManager.listen(player, player.Event.PAUSE, () => {
      this.props.updateIsPlaying(false);
      this.props.updateIsPaused(true);
    });

    eventManager.listen(player, player.Event.SEEKING, () => {
      this.props.updateIsSeeking(true);
    });

    eventManager.listen(player, player.Event.SEEKED, () => {
      this.props.updateIsSeeking(false);
      this.props.updateLastSeekPoint(player.currentTime);
      this.props.updateIsPlaybackEnded(false);
    });

    eventManager.listen(player, player.Event.ENDED, () => {
      this.props.updateIsEnded(true);
      this.props.updateIsPlaying(false);
      this.props.updateIsPaused(true);
    });

    eventManager.listen(player, player.Event.PLAYBACK_ENDED, () => {
      this.props.updateIsPlaybackEnded(true);
    });

    eventManager.listen(player, player.Event.TRACKS_CHANGED, () => {
      let audioTracks = player.getTracks(TrackType.AUDIO);
      let videoTracks = player.getTracks(TrackType.VIDEO);
      let textTracks = player.getTracks(TrackType.TEXT);

      this.props.updateAudioTracks(audioTracks);
      this.props.updateVideoTracks(videoTracks);
      this.props.updateTextTracks(textTracks);
    });

    eventManager.listen(player, player.Event.TEXT_TRACK_CHANGED, () => {
      let tracks = player.getTracks(TrackType.TEXT);
      this.props.updateTextTracks(tracks);
    });

    eventManager.listen(player, player.Event.AUDIO_TRACK_CHANGED, () => {
      let tracks = player.getTracks(TrackType.AUDIO);
      this.props.updateAudioTracks(tracks);
    });

    eventManager.listen(player, player.Event.VIDEO_TRACK_CHANGED, () => {
      let tracks = player.getTracks(TrackType.VIDEO);
      this.props.updateVideoTracks(tracks);
    });

    eventManager.listen(player, player.Event.AD_BREAK_START, () => {
      this.props.updateHasError(false);
      this.props.updateAdBreak(true);
    });

    eventManager.listen(player, player.Event.AD_BREAK_END, () => {
      this.props.updateAdBreak(false);
    });

    eventManager.listen(player, player.Event.ALL_ADS_COMPLETED, () => {
      this.props.updateAdBreak(false);
    });

    eventManager.listen(player, player.Event.AD_PROGRESS, e => {
      let currentTime = e.payload.adProgress.currentTime;
      let duration = e.payload.adProgress.duration;

      this.props.updateAdBreakProgress(currentTime, duration);
    });

    eventManager.listen(player, player.Event.AD_COMPLETED, () => {
      this.props.updateAdBreakCompleted();
    });

    eventManager.listen(player, player.Event.AD_STARTED, e => {
      this.props.updateLoadingSpinnerState(false);
      this.props.updateAdIsPlaying(true);
      this.props.updatePrePlayback(false);
      this.props.updateAdIsBumper(e.payload.ad.bumper);
    });

    eventManager.listen(player, player.Event.AD_RESUMED, () => {
      this.props.updateAdIsPlaying(true);
    });

    eventManager.listen(player, player.Event.AD_PAUSED, () => {
      this.props.updateAdIsPlaying(false);
    });

    eventManager.listen(player, player.Event.AD_ERROR, e => {
      if (e.payload.severity === player.Error.Severity.CRITICAL) {
        this.props.updateAdBreak(false);
      }
    });

    eventManager.listen(player, player.Event.FALLBACK_TO_MUTED_AUTOPLAY, () => {
      this.props.updateFallbackToMutedAutoPlay(true);
    });

    eventManager.listen(player, player.Event.AD_LOADED, e => {
      const ad = e.payload.ad;
      this.props.updateAdIsLinear(ad.linear);
      this.props.updateAdIsBumper(ad.bumper);
      this.props.updateAdClickUrl(ad.clickThroughUrl);
      this.props.updateAdSkipTimeOffset(ad.skipOffset);
      this.props.updateAdSkippableState(ad.skippable);
    });

    eventManager.listen(player, player.Event.VR_STEREO_MODE_CHANGED, e => {
      this.props.updateVrStereoMode(e.payload.mode);
    });

    eventManager.listen(player, player.Event.ERROR, e => {
      if (e.payload.severity === player.Error.Severity.CRITICAL) {
        this.props.updateIsIdle(false);
        this.props.updateHasError(true);
      }
    });

    eventManager.listen(player, player.Event.Cast.CAST_SESSION_STARTED, e => {
      const session = e.payload.session;
      this.props.updateIsCasting(true);
      this.props.updateCastSession(session);
      if (session.resuming) {
        this.props.updateLoadingSpinnerState(false);
      }
    });

    eventManager.listen(player, player.Event.Cast.CAST_SESSION_ENDED, () => {
      this.props.updateIsCasting(false);
      this.props.updateCastSession(null);
    });

    eventManager.listen(player, player.Event.Cast.CAST_AVAILABLE, e => {
      const {available} = e.payload;
      this.props.updateIsCastAvailable(available);
    });

    eventManager.listen(player, player.Event.Playlist.PLAYLIST_ITEM_CHANGED, () => {
      this.props.updatePlaylist({next: player.playlist.next, prev: player.playlist.prev});
    });

    eventManager.listen(player, player.Event.ENTER_PICTURE_IN_PICTURE, () => {
      this.props.updateIsInPictureInPicture(true);
    });

    eventManager.listen(player, player.Event.LEAVE_PICTURE_IN_PICTURE, () => {
      this.props.updateIsInPictureInPicture(false);
    });

    eventManager.listen(player, player.Event.PRESENTATION_MODE_CHANGED, () => {
      this.props.updateIsInPictureInPicture(player.isInPictureInPicture());
      this.props.updateFullscreen(player.isFullscreen());
    });

    eventManager.listen(player, player.Event.ENTER_FULLSCREEN, () => {
      this.props.updateFullscreen(true);
    });

    eventManager.listen(player, player.Event.EXIT_FULLSCREEN, () => {
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
