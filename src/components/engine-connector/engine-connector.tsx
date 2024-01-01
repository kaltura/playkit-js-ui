import {h, Component, VNode} from 'preact';
import {connect} from 'react-redux';
import {bindActions} from '../../utils';
import {default as reduce, actions as EngineActions} from '../../reducers/engine';
import {actions as LoadingActions} from '../../reducers/loading';
import {actions as ShellActions} from '../../reducers/shell';
import {actions as SeekbarActions} from '../../reducers/seekbar';
import {withPlayer} from '../player';
import {withEventManager} from '../../event';
import {withLogger} from '../logger';
import {KalturaPlayer} from '@playkit-js/kaltura-player-js';
import {EventManager} from '@playkit-js/playkit-js';
import {EngineState} from '../../types/reducers/engine';

type EngineConnectorProps = {
  engine: EngineState;
  player: KalturaPlayer;
  eventManager: EventManager;
} & typeof EngineActions &
  typeof LoadingActions &
  typeof ShellActions & {seekbarUpdateCurrentTime: typeof SeekbarActions.updateCurrentTime};

// Rename so it doesn't clash with the equivalent action in engine state
const seekbarUpdateCurrentTime = SeekbarActions.updateCurrentTime;

const COMPONENT_NAME = 'EngineConnector';

/**
 * EngineConnector component
 *
 * @class EngineConnector
 * @example <EngineConnector />
 * @extends {Component}
 */
@connect(reduce, bindActions({...EngineActions, ...LoadingActions, ...ShellActions, seekbarUpdateCurrentTime}))
@withPlayer
@withEventManager
@withLogger(COMPONENT_NAME)
class EngineConnector extends Component<EngineConnectorProps, any> {
  /**
   * after component mounted, set event listeners and update redux store
   *
   * @returns {void}
   * @memberof EngineConnector
   */
  componentDidMount() {
    const {player, eventManager} = this.props as EngineConnectorProps;
    const TrackType = player.Track;
    this.props.updatePrePlayback(!player.config.playback.autoplay);

    eventManager.listen(player, player.Event.Core.PLAYER_RESET, event => {
      this.props.updateCurrentTime(0);
      this.props.seekbarUpdateCurrentTime(0);
      if (!event.payload.isChangeMedia) {
        this.props.updateIsIdle(true);
      }
      this.props.updateIsPlaybackStarted(false);
      this.props.updateDataLoadingStatus(false);
    });

    eventManager.listen(player, player.Event.Core.SOURCE_SELECTED, () => {
      this.props.updateIsCastAvailable(player.isCastAvailable());
      this.props.updateIsLive(player.isLive());
      this.props.updateIsVr(player.isVr());
      this.props.updateIsImg(player.isUntimedImg());

      this.props.updateIsAudio(player.isAudio());

      this.props.updateIsInPictureInPicture(player.isInPictureInPicture());
      if (player.config.playback.autoplay) {
        this.props.updateLoadingSpinnerState(true);
      } else {
        this.props.updateLoadingSpinnerState(false);
      }
    });

    eventManager.listen(player, player.Event.Core.CHANGE_SOURCE_STARTED, () => {
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

    eventManager.listen(player, player.Event.Core.CHANGE_SOURCE_ENDED, () => {
      this.props.updateIsChangingSource(false);
      this.props.updatePlayerPoster(player.poster);
      this.props.updateIsIdle(false);
    });

    eventManager.listen(player, player.Event.Core.PLAYER_STATE_CHANGED, e => {
      this.props.updatePlayerState(e.payload.oldState.type, e.payload.newState.type);
    });

    eventManager.listen(player, player.Event.Core.TIME_UPDATE, () => {
      this.props.updateCurrentTime(player.currentTime!);
    });

    eventManager.listen(player, player.Event.Core.DURATION_CHANGE, () => {
      this.props.updateDuration(player.isLive() ? player.liveDuration! : player.duration!);
    });

    eventManager.listen(player, player.Event.Core.LOADED_DATA, () => {
      this.props.updateDuration(player.isLive() ? player.liveDuration! : player.duration!);
      this.props.updatePictureInPictureSupport(player.isPictureInPictureSupported());
      this.props.updateDataLoadingStatus(true);
    });

    eventManager.listen(player, player.Event.Core.LOADED_METADATA, () => {
      this.props.updateMuted(player.muted!);
      this.props.updateMetadataLoadingStatus(true);
      this.props.updateIsLive(player.isLive());
      this.props.updateIsDvr(player.isDvr());
      this.props.updatePlayerPoster(player.poster);
    });

    eventManager.listen(player, player.Event.Core.VOLUME_CHANGE, () => {
      this.props.updateVolume(player.volume!);
    });

    eventManager.listen(player, player.Event.Core.MUTE_CHANGE, () => {
      this.props.updateMuted(player.muted!);
      if (this.props.engine.fallbackToMutedAutoPlay) {
        this.props.updateFallbackToMutedAutoPlay(player.muted!);
      }
    });

    eventManager.listen(player, player.Event.Core.PLAYBACK_START, () => {
      this.props.updatePrePlayback(false);
      this.props.updateIsPlaybackStarted(true);
      this.props.updateLoadingSpinnerState(true);
    });

    eventManager.listen(player, player.Event.Core.AUTOPLAY_FAILED, () => {
      this.props.updatePrePlayback(true);
    });

    eventManager.listen(player, player.Event.Core.FIRST_PLAY, () => {
      this.props.updatePrePlayback(false);
    });

    eventManager.listen(player, player.Event.Core.PLAY, () => {
      this.props.updateIsPlaying(true);
      this.props.updateIsEnded(false);
      this.props.updateIsPaused(false);
      this.props.updateIsPlaybackEnded(false);
    });

    eventManager.listen(player, player.Event.Core.PAUSE, () => {
      this.props.updateIsPlaying(false);
      this.props.updateIsPaused(true);
    });

    eventManager.listen(player, player.Event.Core.SEEKING, () => {
      this.props.updateIsSeeking(true);
    });

    eventManager.listen(player, player.Event.Core.SEEKED, () => {
      this.props.updateIsSeeking(false);
      this.props.updateLastSeekPoint(player.currentTime!);
      this.props.updateIsPlaybackEnded(false);
    });

    eventManager.listen(player, player.Event.Core.ENDED, () => {
      this.props.updateIsEnded(true);
      this.props.updateIsPlaying(false);
      this.props.updateIsPaused(true);
    });

    eventManager.listen(player, player.Event.Core.PLAYBACK_ENDED, () => {
      this.props.updateIsPlaybackEnded(true);
    });

    eventManager.listen(player, player.Event.Core.TRACKS_CHANGED, () => {
      let audioTracks = player.getTracks(TrackType.AUDIO);
      let videoTracks = player.getTracks(TrackType.VIDEO);
      let textTracks = player.getTracks(TrackType.TEXT);

      this.props.updateAudioTracks(audioTracks);
      this.props.updateVideoTracks(videoTracks);
      this.props.updateTextTracks(textTracks);
    });

    eventManager.listen(player, player.Event.Core.TEXT_TRACK_CHANGED, () => {
      let tracks = player.getTracks(TrackType.TEXT);
      this.props.updateTextTracks(tracks);
    });

    eventManager.listen(player, player.Event.Core.AUDIO_TRACK_CHANGED, () => {
      let tracks = player.getTracks(TrackType.AUDIO);
      this.props.updateAudioTracks(tracks);
    });

    eventManager.listen(player, player.Event.Core.VIDEO_TRACK_CHANGED, () => {
      let tracks = player.getTracks(TrackType.VIDEO);
      this.props.updateVideoTracks(tracks);
    });

    eventManager.listen(player, player.Event.Core.AD_BREAK_START, () => {
      this.props.updateHasError(false);
      this.props.updateAdBreak(true);
    });

    eventManager.listen(player, player.Event.Core.AD_BREAK_END, () => {
      this.props.updateAdBreak(false);
    });

    eventManager.listen(player, player.Event.Core.ALL_ADS_COMPLETED, () => {
      this.props.updateAdBreak(false);
    });

    eventManager.listen(player, player.Event.Core.AD_PROGRESS, e => {
      let currentTime = e.payload.adProgress.currentTime;
      let duration = e.payload.adProgress.duration;

      this.props.updateAdBreakProgress(currentTime, duration);
    });

    eventManager.listen(player, player.Event.Core.AD_COMPLETED, () => {
      this.props.updateAdBreakCompleted();
    });

    eventManager.listen(player, player.Event.Core.AD_STARTED, e => {
      const ad = e.payload.ad;
      this.props.updateLoadingSpinnerState(false);
      this.props.updateAdIsPlaying(true);
      this.props.updatePrePlayback(false);
      this.props.updateAdIsBumper(ad.bumper);
      this.props.updateAdContentType(ad.contentType);
    });

    eventManager.listen(player, player.Event.Core.AD_RESUMED, () => {
      this.props.updateAdIsPlaying(true);
    });

    eventManager.listen(player, player.Event.Core.AD_PAUSED, () => {
      this.props.updateAdIsPlaying(false);
    });

    eventManager.listen(player, player.Event.Core.AD_ERROR, e => {
      if (e.payload.severity === player.Error.Severity.CRITICAL) {
        this.props.updateAdBreak(false);
      }
    });

    eventManager.listen(player, player.Event.Core.FALLBACK_TO_MUTED_AUTOPLAY, () => {
      this.props.updateFallbackToMutedAutoPlay(true);
    });

    eventManager.listen(player, player.Event.Core.AD_LOADED, e => {
      const ad = e.payload.ad;
      this.props.updateAdIsLinear(ad.linear);
      this.props.updateAdIsBumper(ad.bumper);
      this.props.updateAdClickUrl(ad.clickThroughUrl);
      this.props.updateAdSkipTimeOffset(ad.skipOffset);
      this.props.updateAdSkippableState(ad.skippable);
    });

    eventManager.listen(player, player.Event.Core.VR_STEREO_MODE_CHANGED, e => {
      this.props.updateVrStereoMode(e.payload.mode);
    });

    eventManager.listen(player, player.Event.Core.ERROR, e => {
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

    eventManager.listen(player, player.Event.Core.ENTER_PICTURE_IN_PICTURE, () => {
      this.props.updateIsInPictureInPicture(true);
    });

    eventManager.listen(player, player.Event.Core.LEAVE_PICTURE_IN_PICTURE, () => {
      this.props.updateIsInPictureInPicture(false);
    });

    eventManager.listen(player, player.Event.Core.PRESENTATION_MODE_CHANGED, () => {
      this.props.updateIsInPictureInPicture(player.isInPictureInPicture());
      this.props.updateFullscreen(player.isFullscreen());
    });

    eventManager.listen(player, player.Event.Core.ENTER_FULLSCREEN, () => {
      this.props.updateFullscreen(true);
    });

    eventManager.listen(player, player.Event.Core.EXIT_FULLSCREEN, () => {
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
  render(): VNode<any> {
    return <span />;
  }
}

EngineConnector.displayName = COMPONENT_NAME;
export {EngineConnector};
